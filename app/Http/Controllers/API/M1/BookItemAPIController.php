<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookItem;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Storage;

/**
 * Class BookItemAPIController
 */
class BookItemAPIController extends AppBaseController
{
    /** @var BookItemRepositoryInterface */
    private $bookItemRepo;

    public function __construct(BookItemRepositoryInterface $bookItemRepo)
    {
        $this->bookItemRepo = $bookItemRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function searchBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookItemRepo->searchBooksByName(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (BookItem $bookItem) {
            return $bookItem->apiM1Obj();
        });

        return $this->sendResponse($records, 'BookItem retrieved successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     *
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|JsonResponse|\Illuminate\Http\Response
     */
    public function downloadEBook(BookItem $bookItem)
    {
        if ($bookItem->format == BookItem::FORMAT_E_BOOK) {
            $mime = Storage::disk(config('app.ebook_disk'))->mimeType(BookItem::DOCUMENT_PATH.'/'.$bookItem->file_name);
            $file = Storage::disk(config('app.ebook_disk'))->get(BookItem::DOCUMENT_PATH.'/'.$bookItem->file_name);

            $headers = [
                'Content-Type'        => $mime,
                'Content-Description' => 'File Transfer',
                'Content-Disposition' => "attachment; filename={$bookItem->file_name}",
                'filename'            => $bookItem->file_name,
            ];

            return response($file, 200, $headers);
        }

        return $this->sendError('File Not Found.');
    }
}
