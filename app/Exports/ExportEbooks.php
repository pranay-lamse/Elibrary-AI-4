<?php

namespace App\Exports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\FromCollection;
use App\Traits\FormatedData;

class ExportEbooks implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $books = Book::with(["items.publisher", "authors", "genres", "tags"])->where('is_featured', '=', 1)->get()->toArray();

        $data = $this->getFormatedData($books);

        return view('exports.popular-books', [
            'books' => $data,
        ]);
    }

    public static function getFormatedData($data)
    {
        return array_map(function ($book) {
            $data['format'] = "";
            $data['publisher_name'] = "";
            foreach ($book['items'] as $item) {
                $data['publisher_name'] = $item['publisher']['name'];
                if (isset($item['format']) && $item['format'] == 3) {
                    $data['format'] = "Ebook";
                } else if (isset($item['format']) && $item['format'] == 2 || $item['format'] == 1) {
                    $data['format'] = "Book";
                } else if (isset($item['format']) && $item['format'] == 3 || $item['format'] == 2 || $item['format'] == 1) {
                    $data['format'] = "Ebook/Book";
                }
            }
            $data['name'] = $book['name'];
            $data['isbn'] = $book['isbn'];
            $data['authors_name'] = $book['authors'][0]['first_name'] . " " . $book['authors'][0]['last_name'];
            $data['genres'] = $book['genres'][0]['name'];
            $data['tags'] = isset($book['tags']) && isset($book['tags'][0]) ? $book['tags'][0]['name'] : "N/A";
            return $data;
        }, $data);
    }
}
