<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Session;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Handler\AbstractHandler;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;

class FileUploadController extends Controller
{

    public function imageUpload()
    {
        return view('imageUpload');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function imageUploadPost(Request $request)
    {
        $fileName = time().'.'.$request->file->extension();



           $request->file->storeAs('ebooks', $fileName, 'parent_disk');



        return back()
            ->with('success','You have successfully upload.')
            ->with('image',$fileName);
    }

    public function upload(Request $request)
    {
        //Turn Off The Throttle API
        //from web route
        // create the file receiver
        $receiver = new FileReceiver("pdf_file", $request, HandlerFactory::classFromRequest($request));

        // check if the upload is success, throw exception or return response you need
        if ($receiver->isUploaded() === false) {
            throw new UploadMissingFileException();
        }

        // receive the file
        $save = $receiver->receive();

        // check if the upload has finished (in chunk mode it will send smaller files)
        if ($save->isFinished()) {
            // save the file and return any response you need, current example uses `move` function. If you are
            // not using move, you need to manually delete the file by unlink($save->getFile()->getPathname())
            return $this->saveFile($save->getFile(), $request);
        }

        // we are in chunk mode, lets send the current progress
        /** @var AbstractHandler $handler */
        $handler = $save->handler();

        return response()->json([
            "done" => $handler->getPercentageDone(),
            'status' => true
        ]);
    }

    /**
     * Saves the file
     *
     * @param UploadedFile $file
     *
     * @return JsonResponse
     */
    protected function saveFile(UploadedFile $file, Request $request)
    {
        $fileName = $this->createFilename($file);

        // Get file mime type
        $mime_original = $file->getMimeType();
        $mime = str_replace('/', '-', $mime_original);

        $folderDATE = $request->dataDATE;

        $folder  = $folderDATE;
        $filePath = "uploads/ebooks/";
        $finalPath = public_path($filePath);

        $fileSize = $file->getSize();
        // move the file name
        // dd([$finalPath, $fileName]);
        $file->move($finalPath, $fileName);

        $url_base = 'storage/upload/ebooks/' . $fileName;
        Session::put('e_book_url', $fileName);

        return response()->json([
            'path' => $filePath,
            'name' => $fileName,
            'mime_type' => $mime,
            "session" => Session::get('e_book_url'),
        ]);
    }

    /**
     * Create unique filename for uploaded file
     * @param UploadedFile $file
     * @return string
     */
    protected function createFilename($file)
    {
        $extension = $file->getClientOriginalExtension();
        $originalName = $file->getClientOriginalName();
        $date = Carbon::now()->format('Y-m-d');
        $originalName = sha1($originalName . time());
        $fileName = $date . '_' . uniqid() . '_' . $originalName . '.' . $extension;
        return $fileName;
    }

    /**
     * Delete uploaded file WEB ROUTE
     * @param Request request
     * @return JsonResponse
     */
    public function delete(Request $request)
    {
        $file = $request->filename;
        //delete timestamp from filename
        $temp_arr = explode('_', $file);
        if (isset($temp_arr[0])) unset($temp_arr[0]);
        $file = implode('_', $temp_arr);

        $dir = $request->date;

        $filePath = "public/upload/e-book/";
        $finalPath = storage_path("app/" . $filePath);

        if (unlink($finalPath . $file)) {
            return response()->json([
                'status' => 'ok'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error'
            ], 403);
        }
    }
}
