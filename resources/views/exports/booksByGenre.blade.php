<table>
    <thead>
        <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <!-- <th>Image</th> -->
            <!--  <th>Description</th> -->
            <!-- <th>Published On</th> -->
            <th>ISBN</th>
            <th>FORMAT</th>
            <th>AUTHOR</th>
            <th>GENRES</th>
            <th>TAGS</th>
            <th>PUBLISHER</th>
            <!--   <th>URL</th>
        <th>Is Featured</th> -->
        </tr>
    </thead>
    <tbody>
        <?php
        $no = 1;
        ?>

        @foreach ($books as $book)
            <tr>
                <td>{{ $no }}</td>
                <td>{{ $book['name'] }}</td>
                <td>{{ $book['isbn'] }}</td>
                <td>{{ $book['format'] }}</td>
                <td>{{ $book['authors_name'] }}</td>
                <td>{{ $book['genres'] }}</td>
                <td>{{ $book['tags'] }}</td>
                <td>{{ $book['publisher_name'] }}</td>
            </tr>
            <?php
            $no = 1 + $no;
            ?>
        @endforeach
    </tbody>
</table>
