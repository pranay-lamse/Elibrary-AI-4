<?php

namespace Tests\Traits;

use App\Repositories\AuthorRepository;
use App\Repositories\BookItemRepository;
use App\Repositories\BookLanguageRepository;
use App\Repositories\BookRepository;
use App\Repositories\BookRequestRepository;
use App\Repositories\BookSeriesRepository;
use App\Repositories\CountryRepository;
use App\Repositories\GenreRepository;
use App\Repositories\IssuedBookRepository;
use App\Repositories\MemberRepository;
use App\Repositories\MembershipPlanRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\PublisherRepository;
use App\Repositories\RoleRepository;
use App\Repositories\SettingRepository;
use App\Repositories\TagRepository;
use App\Repositories\UserRepository;
use Mockery\MockInterface;

/**
 * Trait MockRepositories.
 */
trait MockingRepositories
{
    public static $author = 'authorRepository';

    public static $book = 'bookRepository';

    public static $bookItem = 'bookItemRepository';

    public static $bookLanguage = 'bookLanguageRepository';

    public static $bookSeries = 'bookSeriesRepository';

    public static $country = 'countryRepository';

    public static $genre = 'genreRepository';

    public static $issuedBook = 'issuedBookRepository';

    public static $member = 'memberRepository';

    public static $membershipPlan = 'membershipPlanRepository';

    public static $permission = 'permissionRepository';

    public static $publisher = 'publisherRepository';

    public static $role = 'roleRepository';

    public static $setting = 'settingRepository';

    public static $tag = 'tagRepository';

    public static $user = 'userRepository';

    public static $bookRequest = 'bookRequestRepository';

    /** @var MockInterface */
    protected $authorRepository;

    /** @var MockInterface */
    protected $bookRepository;

    /** @var MockInterface */
    protected $bookItemRepository;

    /** @var MockInterface */
    protected $bookLanguageRepository;

    /** @var MockInterface */
    protected $bookSeriesRepository;

    /** @var MockInterface */
    protected $countryRepository;

    /** @var MockInterface */
    protected $genreRepository;

    /** @var MockInterface */
    protected $issuedBookRepository;

    /** @var MockInterface */
    protected $memberRepository;

    /** @var MockInterface */
    protected $membershipPlanRepository;

    /** @var MockInterface */
    protected $permissionRepository;

    /** @var MockInterface */
    protected $publisherRepository;

    /** @var MockInterface */
    protected $roleRepository;

    /** @var MockInterface */
    protected $settingRepository;

    /** @var MockInterface */
    protected $tagRepository;

    /** @var MockInterface */
    protected $userRepository;

    /** @var MockInterface */
    protected $bookRequestRepository;

    /**
     * Mock given repo
     *
     * @param $repoNames
     */
    public function mockRepo($repoNames)
    {
        if (! is_array($repoNames)) {
            $repoNames = [$repoNames];
        }

        foreach ($repoNames as $repoName) {
            $repoInstance = null;
            switch ($repoName) {
                case self::$author:
                    $repoInstance = AuthorRepository::class;
                    break;
                case self::$book:
                    $repoInstance = BookRepository::class;
                    break;
                case self::$bookItem:
                    $repoInstance = BookItemRepository::class;
                    break;
                case self::$bookLanguage:
                    $repoInstance = BookLanguageRepository::class;
                    break;
                case self::$bookSeries:
                    $repoInstance = BookSeriesRepository::class;
                    break;
                case self::$country:
                    $repoInstance = CountryRepository::class;
                    break;
                case self::$genre:
                    $repoInstance = GenreRepository::class;
                    break;
                case self::$issuedBook:
                    $repoInstance = IssuedBookRepository::class;
                    break;
                case self::$member:
                    $repoInstance = MemberRepository::class;
                    break;
                case self::$membershipPlan:
                    $repoInstance = MembershipPlanRepository::class;
                    break;
                case self::$permission:
                    $repoInstance = PermissionRepository::class;
                    break;
                case self::$publisher:
                    $repoInstance = PublisherRepository::class;
                    break;
                case self::$role:
                    $repoInstance = RoleRepository::class;
                    break;
                case self::$setting:
                    $repoInstance = SettingRepository::class;
                    break;
                case self::$tag:
                    $repoInstance = TagRepository::class;
                    break;
                case self::$user:
                    $repoInstance = UserRepository::class;
                    break;
                case self::$bookRequest:
                    $repoInstance = BookRequestRepository::class;
                    break;
            }

            $this->$repoName = \Mockery::mock($repoInstance);
            app()->instance($repoInstance, $this->$repoName);
        }
    }
}
