<?php

namespace App\Exports;

use App\Models\Book;
use App\Models\Book2;
use App\Models\Book3;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class BookByGenre implements FromView, WithTitle, ShouldAutoSize, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */

    public $genreId, $formatId, $bookIds, $books;
    public function __construct($genreId, $formatId)
    {
        $this->genreId = $genreId;
        $this->formatId = $formatId;
    }

    public function view(): View
    {
        if ($this->genreId !== 'null') {
            $this->bookIds = DB::table("book_genres")->where('genre_id', $this->genreId)->pluck('book_id')->toArray();
            $this->books = Book::with(["items.publisher", "authors", "genres", "tags"])->whereIn('id', $this->bookIds)->get()->toArray();
        }
        if ($this->formatId !== 'null') {
            $this->books = Book::with(["items.publisher", "authors", "genres", "tags"])->whereHas('items', function ($query) {
                $query->where('format', $this->formatId);
            })->get()->toArray();
        }
        if ($this->genreId !== 'null' && $this->formatId !== 'null') {
            $this->books = Book::with(["items.publisher", "authors", "genres", "tags"])->whereIn('id', $this->bookIds)->whereHas('items', function ($query) {
                $query->where('format', $this->formatId);
            })->get()->toArray();
        }

        $result = array_map(function ($book) {
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
        }, $this->books);


        return view('exports.booksByGenre', [
            'books' => $result,
        ]);
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Books By Genre';
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
