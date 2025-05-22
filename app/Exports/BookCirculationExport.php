<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class BookCirculationExport implements FromView, WithTitle, ShouldAutoSize, WithEvents
{
    private $issuedBooks = [];

    public function __construct($issuedBooks)
    {
        $this->issuedBooks = $issuedBooks;
    }

    public function view(): View
    {
        $books = $this->issuedBooks;

        return view('exports.books_circulation', [
            'books' => $books,
        ]);
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Books Circulation';
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
