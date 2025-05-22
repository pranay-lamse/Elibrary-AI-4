@component('mail::message')

Hello {{ $data['first_name']. " ".$data['last_name']}}

This is just to remind you that book {{$data['book_name']}}, you have borrowed from the library, was due on {{ $data['due_date'] }} ({{ $data['total_due_days']}} Due Days).

As per our penalty rule your fine by considering the due days is : {{ $data['total_due_amount']}}

Please re-submit it to the library.


Thanks & Regards
{{ getSettingValueByKey(\App\Models\Setting::LIBRARY_NAME) }}
@endcomponent
