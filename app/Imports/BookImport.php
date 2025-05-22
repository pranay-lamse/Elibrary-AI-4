<?php

namespace App\Imports;

use Exception;
use Carbon\Carbon;
use App\Models\Book;
use App\Traits\ImageTrait;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class BookImport implements ToCollection
{
    /**
     * @param  Collection  $rows
     */
    public function collection(Collection $rows)
    {
        // convert to array and remove header from array
        $row = $rows->toArray();
        $bookArray = Arr::except($row, '0');
        $featuredArray = ['yes', 'true', '1', '0', 'false'];

        foreach ($bookArray as $row) {
            try {
                // check if book exists
                $bookExists = Book::whereName($row[0])->exists();
                if (!$bookExists) {
                    // set image URL
                    if (!empty($row[1])) {
                        $row[1] = ImageTrait::makeImageFromURL($row[1], Book::IMAGE_PATH);
                    }

                    $isFeatured = 0;
                    if (isset($row[6]) && in_array(strtolower($row[6]), ['1', 'true', 'yes'])) {
                        $isFeatured = 1;
                    }

                    if (isset($row[6]) && in_array(strtolower($row[6]), ['0', 'false', 'no'])) {
                        $isFeatured = 0;
                    }

                    // change date format
                    $publishedOn = $this->isEmpty($row[3]) != null
                        ? Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($this->isEmpty($row[3]))) : null;

                    // import books
                    Book::create([
                        'name'         => $this->isEmpty($row[0]),
                        'image'        => $this->isEmpty($row[1]),
                        'description'  => $this->isEmpty($row[2]),
                        'published_on' => $publishedOn,
                        'isbn'         => $this->isEmpty($row[4]),
                        'url'          => $this->isEmpty($row[5]),
                        'is_featured'  => $isFeatured,
                    ]);
                }
            } catch (Exception $e) {
                continue;
            }
        }
    }

    /**
     * @param $value
     *
     * @return null
     */
    public function isEmpty($value)
    {
        if (isset($value) && !empty($value)) {
            return $value;
        }

        return null;
    }
}
