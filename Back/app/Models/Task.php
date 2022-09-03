<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Représente la table "tasks" et ses enregistrements
 */
class Task extends Model
{
    /**
     * On défini une méthode pour créer la relation entre Task et Category (voir le MCD !)
     * @link https://laravel.com/docs/8.x/eloquent-relationships#one-to-many-inverse
     */
    public function category()
    {
        // Une tâche appartient à une catégorie
        return $this->belongsTo(Category::class);
    }
}
