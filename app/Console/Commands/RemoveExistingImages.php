<?php

namespace App\Console\Commands;

use App\Models\Book;
use App\Models\Member;
use App\Models\Setting;
use App\User;
use File;
use Illuminate\Console\Command;

/**
 * Class RemoveExistingImages
 */
class RemoveExistingImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:remove-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove images';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $defaultImages = [];
        for ($i = 1; $i <= 19; $i++) {
            $defaultImages[] = $i.'.jpg'; // contain 1.jpg. 2.jpg, .....
        }

        $booksDirectory = public_path()."/uploads/".Book::IMAGE_PATH;
        $images = glob($booksDirectory."/*");
        $images = array_map(function ($record) use ($defaultImages) {
            if (! in_array(basename($record), $defaultImages)) {
                return $record;
            }
        }, $images);
        $this->deleteImages(array_filter($images));
        $this->info('Books images deleted.');

        $membersDirectory = public_path().'/uploads/'.Member::IMAGE_PATH;
        $images = glob($membersDirectory.'/*');
        $this->deleteImages($images);
        $this->info('Members images deleted.');

        $usersDirectory = public_path().'/uploads/'.User::IMAGE_PATH;
        $images = glob($usersDirectory.'/*');
        $this->deleteImages($images);
        $this->info('Users images deleted.');

        $imagesDirectory = public_path()."/uploads/".Setting::LOGO_PATH;
        $images = glob($imagesDirectory."/*");
        $defaultImages = [Setting::DEFAULT_FAVICON_NAME, Setting::DEFAULT_LOGO_NAME];
        $images = array_map(function ($record) use ($defaultImages) {
            if (! in_array(basename($record), $defaultImages)) {
                return $record;
            }
        }, $images);
        $this->deleteImages(array_filter($images));
        $this->info('Uploaded Logos and favicon images deleted.');
    }

    public function deleteImages($imagesArr)
    {
        foreach ($imagesArr as $image) {
            if (File::exists($image)) {
                File::delete($image);
            }
        }
    }
}
