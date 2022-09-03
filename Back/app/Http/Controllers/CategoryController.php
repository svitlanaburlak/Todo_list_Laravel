<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * List
     */
    public function list()
    {
        // Les données à retourner
        $categoriesList = Category::all();

        // Sous forme de JSON
        return response()->json($categoriesList);
    }

    /**
     * Show item
     *
     * @param int $id Category id
     */
    public function item($id)
    {
        // Les données à retourner
        $categoriesList = [
            1 => [
                'id' => 1,
                'name' => 'Chemin vers O\'clock',
                'status' => 1
            ],
            2 => [
                'id' => 2,
                'name' => 'Courses',
                'status' => 1
            ],
            3 => [
                'id' => 3,
                'name' => 'O\'clock',
                'status' => 1
            ],
            4 => [
                'id' => 4,
                'name' => 'Titre Professionnel',
                'status' => 1
            ]
        ];

        // L'id demandé existe-t-il ?
        if (!array_key_exists($id, $categoriesList)) {
            // Laravel va intercepter l'exception lancée ici
            // et retourner une réponse
            // Le code qui suit ce bloc d'instruction ne sera jmaais exécuté
            // @todo NE PAS retourner de HTML
            abort(404);
        }

        // Sous forme de JSON, depuis l'id demandé
        return response()->json($categoriesList[$id]);
    }
}
