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

// '/api' automatically added to the route in this group

// Route::methodeHttp('endpoint', [Controller::action])
Route::get(

    '/categories',
    [CategoryController::class, 'list']
);

// Method HTTP GET => ::get()
// Method HTTP POST => ::post()
Route::get(

    '/categories/{id}',
    [CategoryController::class, 'item']
);

Route::get(
    '/tasks',
    [TaskController::class, 'list']
);

Route::post(
    '/tasks',
    [TaskController::class, 'create']
);

Route::put(
    '/tasks/{id}',
    [TaskController::class, 'put']
);

Route::patch(
    '/tasks/{id}',
    [TaskController::class, 'patch']
);

Route::delete(
    '/tasks/{id}',
    [TaskController::class, 'delete']
);
