<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    /**
     * Table name
     * @var string
     */
    protected $table = "profiles";

    /**
     * Primary Key
     * @var string
     */
    protected $primaryKey = "id";

    /**
     * @var bool
     */
    public $incrementing = true;

    /**
     * Fillable Elements
     * @var string[]
     */
    protected $fillable = [
        'name',
        'about',
        'quizzes_made',
        'quizzes_solved',
        'quizzes_rated',
        'average_rating'
    ];
}
