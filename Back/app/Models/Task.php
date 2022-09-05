<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * For Eloquent this class represent the table "tasks"
 */
class Task extends Model
{
    /**
     * Method to link Category and Task and Category
     * @link https://laravel.com/docs/8.x/eloquent-relationships#one-to-many-inverse
     */
    public function category()
    {
        // Une tâche appartient à une catégorie
        return $this->belongsTo(Category::class);
    }
}
