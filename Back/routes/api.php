<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Le préfixe /api sera automatiquement ajouté par Laravel
// pour les routes de ce groupe

// #3 Retourner un JSON
// Route::methodeHttp('endpoint', [Contrôleur::action])
Route::get(
    // Ceci est le endpoint pour récupérer les catégories via l'API
    '/categories',
    [CategoryController::class, 'list']
);

// #4 Retourner les données d'un élément en particulier
// Méthode HTTP GET => ::get()
// Méthode HTTP POST => ::post()
Route::get(
    // Endpoint
    '/categories/{id}', // Cet 'id' serea transmis au contrôleur sous le nom $id
    // Contrôleur, méthode
    [CategoryController::class, 'item']
);

// ! Route pour liste des tâches
Route::get(
    '/tasks',
    [TaskController::class, 'list']
);

// ! Route pour création d'une tâche
Route::post(
    '/tasks',
    [TaskController::class, 'create']
);

// ! Route pour mise à jour complète d'une tâche
Route::put(
    '/tasks/{id}',
    [TaskController::class, 'put']
);

// ! Route pour mise à jour partielle d'une tâche
Route::patch(
    '/tasks/{id}',
    [TaskController::class, 'patch']
);

// ! Route pour supprimer d'une tâche
Route::delete(
    '/tasks/{id}',
    [TaskController::class, 'delete']
);
