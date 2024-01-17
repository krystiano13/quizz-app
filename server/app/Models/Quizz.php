<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizz extends Model
{
    use HasFactory;

    /**
     * Table name
     * @var string
     */
    protected $table = "quizzes";

    /**
     * Primary Key
     * @var string
     */
    protected $primaryKey = "id";

    /**
     * Is incrementing
     * @var bool
     */
    public $incrementing = true;

    /**
     * Fillable Elements
     * @var string[]
     */
    protected $fillable = [
        'author',
        'title',
        'rating_sum',
        'rates_count',
        'hidden',
        'description'
    ];

    /**
     * Hidden Elements
     * @var string[]
     */
    protected $hidden = [
        'updated_at'
    ];
}
