<?php

namespace App\Console\Commands;

use Artisan;
use Illuminate\Console\Command;

/**
 * Class ResetDatabase
 */
class ResetDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:reset-db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset database records at every mid night.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Artisan::call('migrate:refresh --seed');
    }
}