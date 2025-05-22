<?php

namespace App\Http\Controllers;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Http\Request;
class PythonController extends Controller
{
    public function index(Request $request)
    {



        $process = new Process(['/usr/bin/python3', base_path('storage/app/scripts/your_script.py')]);
        $process->run();



        // Executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        echo $process->getOutput();

    }
}
