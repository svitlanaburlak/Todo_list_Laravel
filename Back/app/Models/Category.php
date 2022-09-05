<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * For Eloquent this class represent the table "categories"
 */
class Category extends Model
{
    /**
     * Method to link Category and Task
     * @link https://laravel.com/docs/8.x/eloquent-relationships#one-to-many
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
