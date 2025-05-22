<?php

namespace App\Http\Requests\API;

use App\Models\BookRequest;
use Illuminate\Support\Facades\Route;
use InfyOm\Generator\Request\APIRequest;

/**
 * Class UpdateApplyBookRequest
 */
class UpdateApplyBookRequest extends APIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = BookRequest::$rules;
        $rules['isbn'] = 'required|unique:book_requests,isbn,'.$this->route('book_request')->id;
        $rules['book_name'] = 'required|unique:book_requests,book_name,'.$this->route('book_request')->id;

        return $rules;
    }
}
