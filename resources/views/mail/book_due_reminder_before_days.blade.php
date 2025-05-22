@component('mail::message')
    # Hello {{ $firstName . ' ' . $lastName }}

    We hope you’re well. This is just to remind you that book {{ $book }}, you have borrowed from the library, will
    be due on {{ $dueDate }}.

    Please let us know if you have any questions.


    Thanks & Regards
    {{ getSettingValueByKey(\App\Models\Setting::LIBRARY_NAME) }}
@endcomponent
