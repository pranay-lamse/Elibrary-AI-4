<?php

namespace App\Providers;

use App\Repositories\TagRepository;
use App\Repositories\AuthRepository;
use App\Repositories\BookRepository;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use App\Repositories\UserRepository2;
use App\Repositories\UserRepository3;
use App\Repositories\BookRepository2;
use App\Repositories\BookRepository3;
use App\Repositories\GenreRepository;
use App\Repositories\GenreRepository2;
use App\Repositories\GenreRepository3;
use App\Repositories\AuthorRepository;
use App\Repositories\AuthorRepository2;
use App\Repositories\AuthorRepository3;
use App\Repositories\MemberRepository;
use App\Repositories\MemberRepository2;
use App\Repositories\MemberRepository3;
use App\Repositories\AccountRepository;
use App\Repositories\AccountRepository2;
use App\Repositories\AccountRepository3;
use App\Repositories\CountryRepository;
use App\Repositories\PenaltyRepository;
use App\Repositories\SettingRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\BookItemRepository;
use App\Repositories\BookItemRepository2;
use App\Repositories\BookItemRepository3;
use App\Repositories\PublisherRepository;
use App\Repositories\BookSeriesRepository;
use App\Repositories\IssuedBookRepository;
use App\Repositories\IssuedBookRepository2;
use App\Repositories\IssuedBookRepository3;
use App\Repositories\PermissionRepository;
use App\Repositories\SeriesBookRepository;
use App\Repositories\AboutUsCardRepository;
use App\Repositories\BookRequestRepository;
use App\Repositories\TestimonialRepository;
use App\Repositories\BookLanguageRepository;
use App\Repositories\MemberSettingRepository;
use App\Repositories\MembershipPlanRepository;
use App\Repositories\SettingLibraryRepository;
use App\Repositories\HomepageSettingRepository;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Contracts\AuthRepositoryInterface;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface2;
use App\Repositories\Contracts\UserRepositoryInterface3;
use App\Repositories\Contracts\BookRepositoryInterface2;
use App\Repositories\Contracts\BookRepositoryInterface3;
use App\Repositories\Contracts\GenreRepositoryInterface;
use App\Repositories\Contracts\GenreRepositoryInterface2;
use App\Repositories\Contracts\GenreRepositoryInterface3;
use App\Repositories\Contracts\AuthorRepositoryInterface;
use App\Repositories\Contracts\AuthorRepositoryInterface2;
use App\Repositories\Contracts\AuthorRepositoryInterface3;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface2;
use App\Repositories\Contracts\MemberRepositoryInterface3;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\Repositories\Contracts\AccountRepositoryInterface2;
use App\Repositories\Contracts\AccountRepositoryInterface3;
use App\Repositories\Contracts\CountryRepositoryInterface;
use App\Repositories\Contracts\PenaltyRepositoryInterface;
use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use App\Repositories\Contracts\BookItemRepositoryInterface2;
use App\Repositories\Contracts\BookItemRepositoryInterface3;
use App\Repositories\Contracts\PublisherRepositoryInterface;
use App\Repositories\Contracts\BookSeriesRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface2;
use App\Repositories\Contracts\IssuedBookRepositoryInterface3;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use App\Repositories\Contracts\SeriesBookRepositoryInterface;
use App\Repositories\Contracts\AboutUsCardRepositoryInterface;
use App\Repositories\Contracts\BookRequestRepositoryInterface;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use App\Repositories\Contracts\BookLanguageRepositoryInterface;
use App\Repositories\Contracts\MemberSettingRepositoryInterface;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface;
use App\Repositories\Contracts\SettingLibraryRepositoryInterface;
use App\Repositories\Contracts\HomepageSettingRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Register bindings for all repositories
        $this->app->bind(GenreRepositoryInterface::class, GenreRepository::class);
        $this->app->bind(GenreRepositoryInterface2::class, GenreRepository2::class);
        $this->app->bind(GenreRepositoryInterface3::class, GenreRepository3::class);
        $this->app->bind(AuthorRepositoryInterface::class, AuthorRepository::class);
        $this->app->bind(AuthorRepositoryInterface2::class, AuthorRepository2::class);
        $this->app->bind(AuthorRepositoryInterface3::class, AuthorRepository3::class);
        $this->app->bind(PublisherRepositoryInterface::class, PublisherRepository::class);
        $this->app->bind(TagRepositoryInterface::class, TagRepository::class);
        $this->app->bind(BookLanguageRepositoryInterface::class, BookLanguageRepository::class);
        $this->app->bind(BookRepositoryInterface::class, BookRepository::class);
        $this->app->bind(BookRepositoryInterface2::class, BookRepository2::class);
        $this->app->bind(BookRepositoryInterface3::class, BookRepository3::class);
        $this->app->bind(BookItemRepositoryInterface::class, BookItemRepository::class);
        $this->app->bind(BookItemRepositoryInterface2::class, BookItemRepository2::class);
        $this->app->bind(BookItemRepositoryInterface3::class, BookItemRepository3::class);
        $this->app->bind(BookSeriesRepositoryInterface::class, BookSeriesRepository::class);
        $this->app->bind(SeriesBookRepositoryInterface::class, SeriesBookRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserRepositoryInterface2::class, UserRepository2::class);
        $this->app->bind(UserRepositoryInterface3::class, UserRepository3::class);
        $this->app->bind(IssuedBookRepositoryInterface::class, IssuedBookRepository::class);
        $this->app->bind(IssuedBookRepositoryInterface2::class, IssuedBookRepository2::class);
        $this->app->bind(IssuedBookRepositoryInterface3::class, IssuedBookRepository3::class);
        $this->app->bind(AccountRepositoryInterface::class, AccountRepository::class);
        $this->app->bind(AccountRepositoryInterface2::class, AccountRepository2::class);
        $this->app->bind(AccountRepositoryInterface3::class, AccountRepository3::class);
        $this->app->bind(MemberRepositoryInterface::class, MemberRepository::class);
        $this->app->bind(MemberRepositoryInterface2::class, MemberRepository2::class);
        $this->app->bind(MemberRepositoryInterface3::class, MemberRepository3::class);
        $this->app->bind(SettingRepositoryInterface::class, SettingRepository::class);
        $this->app->bind(MembershipPlanRepositoryInterface::class, MembershipPlanRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(PermissionRepositoryInterface::class, PermissionRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(CountryRepositoryInterface::class, CountryRepository::class);
        $this->app->bind(BookRequestRepositoryInterface::class, BookRequestRepository::class);
        $this->app->bind(HomepageSettingRepositoryInterface::class, HomepageSettingRepository::class);
        $this->app->bind(TestimonialRepositoryInterface::class, TestimonialRepository::class);
        $this->app->bind(MemberSettingRepositoryInterface::class, MemberSettingRepository::class);
        $this->app->bind(PenaltyRepositoryInterface::class, PenaltyRepository::class);
        $this->app->bind(AboutUsCardRepositoryInterface::class, AboutUsCardRepository::class);

        $this->app->bind(SettingLibraryRepositoryInterface::class, SettingLibraryRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
