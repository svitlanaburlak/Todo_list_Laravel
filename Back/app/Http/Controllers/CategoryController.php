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
        $categoriesList = Category::all();

        return response()->json($categoriesList);
    }

    /**
     * Show item
     *
     * @param int $id Category id
     */
    public function item($id)
    {
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

        if (!array_key_exists($id, $categoriesList)) {

            // @todo NE PAS retourner de HTML
            abort(404);
        }

        return response()->json($categoriesList[$id]);
    }
}
