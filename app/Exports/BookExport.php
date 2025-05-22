<?php

namespace App\Exports;

use App\Models\Book;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class BookExport implements FromView, WithTitle, ShouldAutoSize, WithEvents
{
    public function view(): View
    {

        $books = Book::with(["items.publisher", "authors", "genres", "tags"])->get()->toArray();
        $data = array_map(function ($book) {
            $data['format'] = "";
            $data['publisher_name'] = "";
            foreach ($book['items'] as $item) {
                if (isset($book['items'])) {
                    $data['publisher_name'] = isset($item['publisher']) ? $item['publisher']['name'] : "";
                    if (isset($item['format']) && $item['format'] == 1) {
                        $data['format'] = "Hardcover";
                    }
                    if (isset($item['format']) && $item['format'] == 2) {
                        $data['format'] = "PaperBack";
                    }
                    if (isset($item['format']) && $item['format'] == 3) {
                        $data['format'] = "Ebook";
                    }
                }
            }
            $data['name'] = $book['name'];

            $data['isbn'] = $book['isbn'];
            if (isset($book['authors'][0]['first_name']) &&  isset($book['authors'][0]['last_name'])) {
                $data['authors_name'] = $book['authors'][0]['first_name'] . " " . $book['authors'][0]['last_name'];
            } else {
                $data['authors_name'] = 'N/A';
            }

            if (isset($book['genres'][0]['name'])) {
                $data['genres'] = $book['genres'][0]['name'];
            } else {
                $data['genres'] = 'N/A';
            }


            $data['tags'] = isset($book['tags']) && isset($book['tags'][0]) ? $book['tags'][0]['name'] : "N/A";
            return $data;
        }, $books);

        return view('exports.books', [
            'books' => $data,
        ]);
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Books';
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function (AfterSheet $event) {
                $cellRange = 'A1:W1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);
            },
        ];
    }
}
