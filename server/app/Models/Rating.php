<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    /**
     * @var string
     */
    protected $primaryKey = "id";

    /**
     * @var string
     */
    protected $table = "ratings";

    /**
     * @var bool
     */
    public $incrementing = true;

    /**
     * @var string[]
     */
    protected $fillable = [
        'username',
        'rating_value',
        'quizz_id'
    ];

    /**
     * @var string[]
     */
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
