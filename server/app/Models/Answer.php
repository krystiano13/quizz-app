<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    /**
     * Table Name
     * @var string
     */

    protected $table = "answers";
    /**
     * Primary Key
     * @var string
     */
    protected $primaryKey = "id";

    /**
     * Is Incrementing
     * @var bool
     */
    public $incrementing = true;

}
