<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Cette classe représente pour Eloquent
 * la table "categories"
 * (on est dans le dossier Models et Eloquent va chercher nos modèles ici)
 */
class Category extends Model
{
    /**
     * On défini une méthode pour créer la relation entre Category et Task (voir le MCD !)
     * @link https://laravel.com/docs/8.x/eloquent-relationships#one-to-many
     */
    public function tasks()
    {
        // Une catégorie a plusieurs tâches
        return $this->hasMany(Task::class);
    }
}
