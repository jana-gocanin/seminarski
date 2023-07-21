<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\DBBroker;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(DBBroker::class, function ($app) {
        return new DBBroker(/* constructor parameters if any */);
    });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
