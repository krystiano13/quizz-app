<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/api/auth/register',
        '/api/auth/login',
        '/api/quizz/search',
        '/api/quizz/latest',
        '/api/quizz/highestRated',
        '/api/profile/edit',
        '/api/ratings/edit/*',
        '/api/ratigs/add'
    ];
}
