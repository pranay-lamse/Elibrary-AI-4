<?php

namespace App\Http\Controllers;

use App\Models\frontendContactModel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail2;
use App\Mail\TestEmailadmin;

use App\Mail\MailSender;
use App\Repositories\Contracts\AccountRepositoryInterface;

class frontendContactController extends Controller
{
    private $accountRepo;


    public function __construct(AccountRepositoryInterface $accountRepo)
    {

        $this->accountRepo = $accountRepo;
    }

    public function index(Request $request)
    {
        $direction = $request->query("direction");
        $pageSize = $request->query("pageSize");
        $search = $request->query("search");
        $filter = $request->query("filter");

        if (isset($filter)) {
            $contact = frontendContactModel::where("name", "like", "%" . $filter["search"] . "%")->orWhere("email", "like", "%" . $filter["search"] . "%")->get();
            return response()->json([
                "data" => $contact,
                "message" => "Contact retrieved Successfully.",

            ]);
        } else if ($direction) {
            $contact = frontendContactModel::orderBy("created_at", $direction)->limit(10)->get();
            return response()->json([
                "data" => $contact,
                "message" => "Contact retrieved Successfully."
            ]);
        } else {
            $contact = frontendContactModel::orderBy("created_at", "desc")->limit(10)->get();
            return response()->json([
                "data" => $contact,
                "message" => "Contact retrieved Successfully."
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {


            $user_name = $request->name;
            $user_email = $request->email;
            $user_subject = $request->subject;
            $user_notes = $request->notes;
            $user_contact_type = $request->contact_type;
            $mailData = [
                "name" => $user_name,
                "user_email" => $user_email,
                'user_subject' => $user_subject,
                'user_notes' => $user_notes,
                'user_contact_type' => $user_contact_type,
            ];

            /*  $this->accountRepo->sendContactMail($data); */

            /*  $data = "Thank you for contacting us.";
            $subject = "Thank you for contacting us."; */

            Mail::to($user_email)->send(new MailSender('emails.mail-contact-us', $user_subject, $mailData));
            // Mail::to("pranaylamsecode@gmail.com")->send(new TestEmailadmin($mailData));
            // Mail::to("admin@smartcitylibrary.com")->send(new TestEmailadmin($mailData));
            /*  Mail::to("pranaylamsecode@gmail.com")->send(new MailSender('emails.mail-contact-us', $subject, $data)); */
            /* Mail::to("admin@smartcitylibrary.com")->send(new MailSender('emails.mail-contact-sender', $subject, $data)); */


            $contact = frontendContactModel::create($request->all());
            return response()->json([
                "data" => $contact,
                "message" => "Contact saved Successfully.",
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error->getMessage(),
                "message" => "Something went wrong.",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $contact = frontendContactModel::where('id', $id)->delete();
            return response()->json([
                "data" => $contact,
                "message" => "Contact Deleted Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => $error
            ]);
        }
    }
}
