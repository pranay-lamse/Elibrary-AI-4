<?php

namespace App\Repositories;

use Exception;
use Carbon\Carbon;
use App\Models\Tag2;
use App\Models\Book2;
use App\Models\Genre2;
use App\Models\Author2;
use App\Models\Product2;
use App\Models\BookItem2;
use App\Models\Publisher2;
use App\Traits\ImageTrait;
use App\Imports\BookImport;
use Illuminate\Support\Arr;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\Support\File;
use Illuminate\Database\Eloquent\Builder;
use App\Exceptions\MissingPropertyException;
use App\Exceptions\ApiOperationFailedException;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Container\Container as Application;
use App\Repositories\Contracts\BookRepositoryInterface2;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRepository
 */
class BookRepository2 extends BaseRepository2 implements BookRepositoryInterface2
{
    use ImageTrait;

    /** @var TagRepository */
    private $tagRepo;

    /** @var GenreRepository */
    private $genreRepo;

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'published_on',
        'isbn',
        'is_featured',
    ];



    public function __construct(Application $app, TagRepository $tagRepository, GenreRepository $genreRepository)
    {
        parent::__construct($app);
        $this->tagRepo = $tagRepository;
        $this->genreRepo = $genreRepository;
    }

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Book2::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Book[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {

        $query = Book2::select('*');
        $query = $query->with(['genres', 'authors','items', 'items.publisher', 'items.language']);



         if(!empty($search['genre'])){

            $genre_result = Genre2::select('id', 'name')
            ->where('name',$search['genre'])
            ->first();

            if(isset($genre_result->id))
            {

                $query->whereHas('genres', function ($query) use ($genre_result){
                    $query->where('genres.id', $genre_result->id);
                });
            }else{

                $query->whereHas('genres', function ($query) use ($search){
                    $query->where('genres.id', $search['genre']);
                });
            }


         }

         if(!empty($search['author'])){



            $author_result = Author2::select('id', 'first_name', 'last_name')
            ->where(DB::raw("CONCAT(first_name, ' ', last_name)"), $search['author'])
            ->first();

            if(isset($author_result->id))
            {

                $query->whereHas('authors', function ($query) use ($author_result){

                    $query->where('authors.id', $author_result->id);
                });
            }else{
                $query->whereHas('authors', function ($query) use ($search){

                    $query->where('authors.id', $search['author']);
                });
            }


         }



         if(!empty($search['publisher'])){

            $publisher_result = Publisher2::select('id', 'name')
            ->where('name', $search['publisher'])
            ->first();

            if(isset($publisher_result->id))
            {

                $query->whereHas('items', function ($query) use ($publisher_result){

                    $query->where('publisher_id', $publisher_result->id);
                });
            }else{
                $query->whereHas('items', function ($query) use ($search){

                    $query->where('publisher_id', $search['publisher']);
                });
            }


         }

         if(!empty($search['library_id'])){
            $query =  $query->where('library_id',  $search['library_id']);
       }

       if(!empty($search['for_featured_books']) && $search['for_featured_books'] == true ){
        $query =  $query->where('is_featured',  1);
   }


         if(!empty($search['format'])){

             $query->whereHas('items', function ($query) use ($search){
                 $query->where('format', $search['format']);
             });


         }

         if(!empty($search['language'])){

             $query->whereHas('items', function ($query) use ($search){
                 $query->where('language_id', $search['language']);
             });


         }



         if(!empty($search['search'])){
            $query =  $query->where('name', 'like', '%' . $search['search'] . '%')
                         ->orWhere('isbn', 'like', '%' .$search['search']. '%');
        }

         if (!is_null($skip)) {
             $query->skip($skip);
         }

         if (!is_null($limit)) {
             $query->limit($limit);
         }

         if (!empty($search['withCount'])) {
            return $query->count();
        }

        if(!empty($search['order_by']))
        {
            if(isset($search['direction']))
            {
                $direction = $search['direction'];
            }else{
                $direction = 'desc';
            }
            $query->orderBy($search['order_by'], $direction);
        }
         $bookRecords = $query->get();

        if (!empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'author_name') {
                $orderString = 'authors_name';
            }
            /* if ($orderBy == 'name') {
                $orderString = 'name';
            } */

            $bookRecords = $bookRecords->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $bookRecords->values();
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(!empty($search['search']), function (Builder $query) use ($search) {
            $keywords = explode_trim_remove_empty_values_from_array($search['search'], ' ');

            $query->orWhereHas('authors', function (Builder $query) use ($keywords) {
                Author2::filterByName($query, $keywords);
            });

            $query->orwhereHas('items.publisher', function (Builder $query) use ($keywords) {
                Publisher2::filterByName($query, $keywords);
            });
        });

        return $query;
    }

    /**
     * @param  array  $input
     *
     * @throws Exception
     *
     * @throws ApiOperationFailedException
     *
     * @return mixed
     */
    public function store($input)
    {
        $this->validateInput($input);
        try {
            DB::beginTransaction();
            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Book2::IMAGE_PATH);
            }

            if (!empty($input['image_url'])) {
                $input['image'] = ImageTrait::makeImageFromURL($input['image_url'], Book2::IMAGE_PATH);
                unset($input['image_url']);
            }

            /** @var Book $book */
            $book = Book2::create($input);

            $this->attachTagsAndGenres($book, $input);
            if (!empty($input['authors'])) {
                $this->attachAuthors($book, $input);
            }

            if (isset($input['items'])) {
                $this->createOrUpdateBookItems($book, $input['items']);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book2::IMAGE_PATH . DIRECTORY_SEPARATOR . $input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book2::with(['tags', 'genres', 'items', 'authors'])->findOrFail($book->id);
    }

    /**
     * @param  array  $input
     *
     * @throws Exception
     *
     * @return bool
     */
    public function validateInput($input)
    {
        if (isset($input['items'])) {
            $this->validateItems($input['items']);
        }

        return true;
    }

    /**
     * @param  array  $items
     *
     * @throws Exception
     *
     * @return bool
     */
    public function validateItems($items)
    {
        foreach ($items as $item) {
            if (empty($item['language_id'])) {
                throw new MissingPropertyException('Language is required.');
            }

            if (isset($item['format'])) {
                if (!in_array(
                    $item['format'],
                    [BookItem2::FORMAT_HARDCOVER, BookItem2::FORMAT_PAPERBACK, BookItem2::FORMAT_E_BOOK]
                )) {
                    throw new UnprocessableEntityHttpException('Invalid Book Format.');
                }
            }



            if (isset($item['book_code'])) {
                if (strlen($item['book_code']) > 10 || strlen($item['book_code']) < 10) {
                    throw new UnprocessableEntityHttpException('Book code must be 10 character long.');
                }

                $bookItem = BookItem2::whereBookCode($item['book_code']);

                if (isset($item['id'])) {
                    $bookItem->where('id', '!=', $item['id']);
                }
                if ($bookItem->exists()) {
                    throw new UnprocessableEntityHttpException('Given book code is already exist.');
                }
            }
        }

        return true;
    }

    /**
     * @param  Book  $book
     * @param  array  $input
     *
     * @return Book
     */
    public function attachTagsAndGenres($book, $input)
    {
        $tags = (!empty($input['tags'])) ? $input['tags'] : [];
        $tags = array_map(function ($value) {
            return is_numeric($value) ? $value : Tag2::create(['name' => $value])->id;
        }, $tags);
        $book->tags()->sync($tags);

        $genres = (!empty($input['genres'])) ? $input['genres'] : [];
        $genres = array_map(function ($value) {
            return is_numeric($value) ? $value : Genre2::create(['name' => $value])->id;
        }, $genres);
        $book->genres()->sync($genres);

        return $book;
    }

    /**
     * @param  Book  $book
     * @param  array a$input
     *
     * @return bool
     */
    public function attachAuthors($book, $input)
    {
        $authors = array_map(function ($value) {
            if (is_numeric($value)) {
                return $value;
            }

            $result = explode(' ', $value);
            $author = Author2::create(['first_name' => $result[0], 'last_name' => isset($result[1]) ? $result[1] : '']);

            return $author->id;
        }, $input['authors']);
        $book->authors()->sync($authors);

        return true;
    }

    /**
     * @param  Book  $book
     * @param  array  $bookItems
     *
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return bool
     */
    public function createOrUpdateBookItems($book, $bookItems)
    {
        $existingItems = $book->items->pluck('id');
        $removedItems = array_diff($existingItems->toArray(), Arr::pluck($bookItems, 'id'));

        try {
            FacadesDB::beginTransaction();
            BookItem2::whereIn('id', $removedItems)->delete();
            /** @var BookItem $bookItem */
            foreach ($bookItems as $bookItem) {

                if (!empty($bookItem['publisher_id']) && !is_numeric($bookItem['publisher_id'])) {
                    $publisher = Publisher2::create(['name' => $bookItem['publisher_id']]);
                    $bookItem['publisher_id'] = $publisher->id;
                }

                if (!empty($bookItem['id'])) {
                    $item = BookItem2::findOrFail($bookItem['id']);
                } else {
                    $item = new BookItem();
                    $item->book_code = isset($bookItem['book_code']) ? $bookItem['book_code'] : $this->generateUniqueBookCode();
                    $item->status = BookItem2::STATUS_AVAILABLE;
                }

                if (isset($bookItem['file'])) {
                    $item->file_name = ImageTrait::makeAttachment(
                        $bookItem['file'],
                        "ebooks",
                        config('app.media_disc')
                    );
                }

                if (isset($bookItem['pdf_preview_file'])) {
                    $item->pdf_preview_file = ImageTrait::makeAttachment(
                        $bookItem['pdf_preview_file'],
                        "PDFPreview",
                        config('app.media_disc')
                    );
                }

                $item->edition = isset($bookItem['edition']) ? $bookItem['edition'] : '';
                $item->format = isset($bookItem['format']) ? $bookItem['format'] : null;
                $item->location = isset($bookItem['location']) ? $bookItem['location'] : '';
                $item->price = isset($bookItem['price']) ? $bookItem['price'] : null;
                $item->publisher_id = isset($bookItem['publisher_id']) ? $bookItem['publisher_id'] : null;
                $item->language_id = isset($bookItem['language_id']) ? $bookItem['language_id'] : null;
                $item->product_id = isset($bookItem['product_id']) ? $bookItem['product_id'] : null;
                $item->rack_number = isset($bookItem['rack_number']) ? $bookItem['rack_number'] : null;
                 $item->accession_number = isset($bookItem['accession_number']) ? $bookItem['accession_number'] : null;

                if ($this->checkBookItemIsEBOOK($bookItem)) {
                    $item->status = BookItem2::STATUS_AVAILABLE;
                } else {
                    $item->status = isset($bookItem['status']) ? $bookItem['status'] : BookItem2::STATUS_AVAILABLE;
                }

                $book->items()->save($item);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw new ApiOperationFailedException('Unable to update Book Items: ' . $e->getMessage());
        }

        return true;
    }

    /**
     * @param  Book  $book
     * @param  array  $bookItem
     *
     * @return mixed
     */
    public function addItem($book, $bookItem)
    {
        try {
            if (!empty($bookItem['publisher_id']) && !is_numeric($bookItem['publisher_id'])) {
                $publisher = Publisher2::create(['name' => $bookItem['publisher_id']]);
                $bookItem['publisher_id'] = $publisher->id;
            }

            if (!empty($bookItem['id'])) {
                $item = BookItem2::findOrFail($bookItem['id']);
            } else {
                if (isset($bookItem['book_code'])) {
                    $bookItemExists = BookItem2::whereBookCode($bookItem['book_code'])->exists();
                    if ($bookItemExists) {
                        throw new UnprocessableEntityHttpException('book code already exists');
                    }
                }
                $item = new BookItem();
                $item->book_code = isset($bookItem['book_code']) ? $bookItem['book_code'] : $this->generateUniqueBookCode();
                $item->status = BookItem2::STATUS_AVAILABLE;
            }

            if ($this->checkBookItemIsEBOOK($bookItem) && !empty($bookItem['file'])) {
                $item->file_name = ImageTrait::makeAttachment(
                    $bookItem['file'],
                    "ebooks",
                    config('app.media_disc')
                );
            }


            // if (isset($bookItem['file'])) {
            //     $item->file_name = ImageTrait::makeAttachment(
            //         $bookItem['file'],
            //         "ebooks",
            //         config('app.media_disc')
            //     );
            // }

            $item->book_code = isset($bookItem['book_code']) ? $bookItem['book_code'] : $this->generateUniqueBookCode();
            $item->edition = isset($bookItem['edition']) ? $bookItem['edition'] : '';
            $item->format = isset($bookItem['format']) ? $bookItem['format'] : null;
            $item->location = isset($bookItem['location']) ? $bookItem['location'] : '';
            $item->price = isset($bookItem['price']) ? $bookItem['price'] : null;
            $item->publisher_id = isset($bookItem['publisher_id']) ? $bookItem['publisher_id'] : null;
            $item->language_id = isset($bookItem['language_id']) ? $bookItem['language_id'] : null;
            $item->rack_number = isset($bookItem['rack_number']) ? $bookItem['rack_number'] : null;
            if ($this->checkBookItemIsEBOOK($bookItem)) {
                $item->status = BookItem2::STATUS_AVAILABLE;
            } else {
                $item->status = isset($bookItem['status']) ? $bookItem['status'] : BookItem2::STATUS_AVAILABLE;
            }

            $book->items()->save($item);

            return $this->findOrFail($book->id, ['items.publisher', 'items.language']);
        } catch (Exception $exception) {
            throw new UnprocessableEntityHttpException($exception->getMessage());
        }
    }

    /**
     * @return string
     */
    public function generateUniqueBookCode()
    {
        $rand = rand(1, 99999999);

        $itemId = sprintf('%08d', $rand);
        while (true) {
            if (!BookItem2::whereBookCode($itemId)->exists()) {
                break;
            }
            $itemId = rand(1, 99999999);
        }

        return $itemId;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws Exception
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse|mixed
     */
    public function update($input, $id)
    {
        /** @var Book $book */
        $book = $this->findOrFail($id);
        unset($input['items']);
        $this->validateInput($input);
        $oldImageName = '';

        try {
            DB::beginTransaction();

            if (isset($input['photo']) && !empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Book2::IMAGE_PATH);
                $oldImageName = $book->image;
            }

            if (!empty($oldImageName) || !empty($input['remove_image'])) {
                $book->deleteImage();
            }
            $book->update($input);
            $this->attachTagsAndGenres($book, $input);
            if (!empty($input['authors'])) {
                $this->attachAuthors($book, $input);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            if (isset($input['image']) && !empty($input['image'])) {
                $this->deleteImage(Book2::IMAGE_PATH . DIRECTORY_SEPARATOR . $input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }

        return Book2::with(['tags', 'genres', 'items.publisher', 'items.language', 'authors'])->findOrFail($book->id);
    }

    /**
     * @param  Book  $book
     * @param  array  $items
     * @throws Exception
     *
     * @return Book
     */
    public function addBookItems($book, $items)
    {
        $this->validateItems($items);

        $this->createOrUpdateBookItems($book, $items);

        /** @var Book $book */
        $book = $this->findOrFail($book->id, ['items.publisher', 'items.language']);

        return $book;
    }

    /**
     * @param  string  $isbn
     *
     * @throws ApiOperationFailedException
     *
     * @return array
     */
    public function getBookDetailsFromISBN($isbn)
    {
        $url = config('services.openlib.api');
        $url = str_replace('{ISBN_NO}', $isbn, $url);
        $bookDetails = (new Book())->getFillable();
        $bookDetails = array_fill_keys($bookDetails, null);
        $bookDetails = array_merge(
            $bookDetails,
            ['tags' => [], 'publishers' => [], 'authors' => [], 'genres' => [], 'languages' => []]
        );

        try {

            $client = new \GuzzleHttp\Client();
            $res = $client->get($url);
            $content = (string) $res->getBody();

            /*  $data = file_get_contents($url); */
            $data = json_decode($content, true);

            if (empty($data)) {
                return $bookDetails;
            }
            $data = $data['ISBN:' . $isbn];

            $bookDetails['name'] = $data['title'];
            $bookDetails['published_on'] = (isset($data['publish_date'])) ?             Carbon::parse($data['publish_date'])->toDateTimeString() : null;
            $bookDetails['description'] = (isset($data['notes'])) ? $data['notes'] : null;
            $bookDetails['isbn'] = $isbn;
            $bookDetails['is_featured'] = false;

            if (isset($data['cover']['large'])) {
                $bookDetails['image_url'] = $data['cover']['large'];
            }

            if (isset($data['ebooks'][0]['preview_url'])) {
                $bookDetails['url'] = $data['ebooks'][0]['preview_url'];
            }

            if (isset($data['authors'])) {
                foreach ($data['authors'] as $author) {
                    list($firstName, $lastName) = explode(' ', $author['name']);

                    $authorDBRecord = Author2::whereFirstName($firstName)->whereLastName($lastName)->first();
                    if (!empty($authorDBRecord)) {
                        $bookDetails['authors'][] = $authorDBRecord->id;
                    } else {
                        $bookDetails['authors'][] = $author['name'];
                    }
                }
            }

            if (isset($data['publishers'])) {
                foreach ($data['publishers'] as $publisher) {
                    $publisherDBRecord = Publisher2::whereName($publisher['name'])->first();
                    if (!empty($publisherDBRecord)) {
                        $bookDetails['publishers'][] = $publisherDBRecord->id;
                    } else {
                        $bookDetails['publishers'][] = $publisher['name'];
                    }
                }
            }

            return $bookDetails;
        } catch (Exception $e) {

            throw new ApiOperationFailedException('Unable to get book details : ' . $e->getMessage());
        }
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function booksCount($today, $startDate = null, $endDate = null)
    {
        $query = Book2::query();
        if (!empty($startDate) && !empty($endDate)) {
            $query->select('*', DB::raw('DATE(created_at) as date'));
            $query->whereRaw('DATE(created_at) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(created_at) = ? ', [Carbon::now()->toDateString()]);
        }

        $records = $query->get();
        $books = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $books];
    }

    /**
     * @return array
     */
    public function booksCountFromGenres()
    {
        /** @var Genre[] $genres */
        $genresRecords = Genre::withCount('books')->whereHas('books')->get();

        $genres = $booksCount = $colors = $colorsWithDifferentOpacity = [];
        foreach ($genresRecords as $genre) {
            $genres[] = $genre->name;
            $booksCount[] = $genre->books_count;
            $color = getRandomColor(0.9);
            $colors[] = $color;

            $color = substr($color, 0, -6);
            $color .= ', 0.7)';

            $colorsWithDifferentOpacity[] = $color;
        }

        return [$genres, $booksCount, $colors, $colorsWithDifferentOpacity];
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Book[]|Collection
     */
    public function searchBooks($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = Book2::query();
        if (!empty($search['by_authors'])) {
            $keywords = explode_trim_remove_empty_values_from_array($search['search'], ' ');
            $query->whereHas('authors', function (Builder $query) use ($keywords) {
                Author2::filterByName($query, $keywords);
            });
        }

        if (!empty($search['by_books'])) {
            $query = filterByColumns($query, $search['search'], ['name']);
        }

        // if (!empty($search['is_featured'])) {
        //     $query->where('is_featured', true);
        // }

        $count = $query->count();

        // if (!is_null($skip)) {
        //     $query->skip($skip);
        // }

        // if (!is_null($limit)) {
        //     $query->limit($limit);
        // }

        $bookRecords = $query->get();

        return [$bookRecords, $count];
    }



    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     *
     * @return bool
     */
    public function importBooks($input)
    {
        try {
            /** @var UploadedFile $file */
            $file = $input['file'];

            $extension = $file->getClientOriginalExtension();
            if (!in_array($extension, ['xlsx', 'xls'])) {
                throw new ApiOperationFailedException('File must be xlsx or xls. Received: ' . htmlspecialchars(strip_tags($extension)));
            }

            $path = Book2::IMPORT . '/' . time() . '.' . $extension;
            $filePath = public_path('uploads/') . $path;
            move_uploaded_file($file->getRealPath(), $filePath); // for temp use only
            $readerType = ($extension == 'xlsx' ? \Maatwebsite\Excel\Excel::XLSX : \Maatwebsite\Excel\Excel::XLS);

            \Maatwebsite\Excel\Facades\Excel::import(new BookImport, $path, 'local', $readerType);

            // Delete file from system
            File::delete($filePath);

            return true;
        } catch (Exception $e) {
            // Delete file from system
            File::delete($filePath);
            throw new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param  array  $input
     *
     * @return bool
     */
    public function checkBookItemIsEBOOK($input)
    {
        if (isset($input['format']) && $input['format'] == BookItem2::FORMAT_E_BOOK) {
            return true;
        }

        return false;
    }
}
