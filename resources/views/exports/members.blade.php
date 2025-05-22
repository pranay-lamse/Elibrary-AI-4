<table>
    <thead>
        <tr>
            <th>Sr No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Aadhaar</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Is Active</th>
            <th>Reciept No</th>
            <th>Challan No</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Zip Code</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $no = 1;
        ?>

        @foreach ($members as $member)
            <tr>
                <td>{{ $no }}</td>
                <td>{{ $member->first_name }}</td>
                <td>{{ $member->last_name }}</td>
                <td>{{ isset($member->aadhaar) ? $member->aadhaar : "N/A" }}</td>
                <td>{{ $member->email }}</td>
                <td>{{ $member->phone }}</td>
                <td>{{ $member->is_active == 1 ? 'Yes' : 'No' }}</td>
                <td>{{ isset($member->member_id) ? $member->member_id : "N/A"}}</td>
                <td>{{ isset($member->reciept_no) ? $member->reciept_no : "N/A" }}</td>
                <td>{{ isset($member->address->address_1) ? $member->address->address_1 : "N/A" }}</td>
                <td>{{ isset($member->address->city) ? $member->address->city : "N/A" }}</td>
                <td>{{ isset($member->address->state) ? $member->address->state : "N/A" }}</td>
                <td>{{ isset($member->address->country) ? $member->address->country : "N/A"}}</td>
                <td>{{ isset($member->address->zip) ? $member->address->zip : "N/A" }}</td>
            </tr>
            <?php
            $no = 1 + $no;
            ?>
        @endforeach
    </tbody>
</table>
