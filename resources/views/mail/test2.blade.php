@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            <img src="{{ getSettingValue('logo') }}" class="logo" alt="{{ getSettingValueByKey(\App\Models\Setting::LIBRARY_NAME) }}"
                 style="position:relative !important;width: 270px !important;right: -7px; !important;">
        @endcomponent
    @endslot


    {{-- Body --}}
    <div>
    {{ $mailData['name'] ?? ''  }}, Thank You For Contacting Us.
    </div>


    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            <h6>© {{ date('Y') }} {{ getSettingValueByKey(\App\Models\Setting::LIBRARY_NAME) }}.</h6>


        @endcomponent
    @endslot
@endcomponent
