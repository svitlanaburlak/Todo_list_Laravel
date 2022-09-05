<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * List
     */
    public function list()
    {
        // via ->load('nom_de_la_relation_dans_le_modèle')
        // @link https://laravel.com/docs/8.x/eloquent-relationships#lazy-eager-loading
        $tasksList = Task::all()->load('category');

        return response()->json($tasksList);
    }

    /**
     * Create task
     *
     * Request $request => type-hinting (déclaration de type)
     * Laravel gives an objet $request which represents the HTTP request
     */
    public function create(Request $request)
    {
        // @link https://laravel.com/docs/8.x/validation#manually-creating-validators
        $validation = Validator::make($request->all(), [

            // @link https://laravel.com/docs/8.x/validation#rule-required
            'title' => 'required|max:128',
            'categoryId' => 'required|integer|gt:0',
            'completion' => 'required|integer|gte:0|lte:100',
            'status' => 'required|digits_between:1,2',
        ]);

        if ($validation->fails()) {
            // 422 : Unprocessable content :
            return response()->json($validation->errors(), 422);
        }

        $task = new Task();

        $task->title = $request->input('title');

        $task->category_id = $request->input('categoryId');
        $task->completion = $request->input('completion');
        $task->status = $request->input('status');

        $success = $task->save();

        if ($success) {

            return response()->json($task, 201);
        }

        else {

            return response()->json(null, 500);
        }
    }

    /**
     * Modification complete (PUT)
     *
     * @param int $id Task id to update
     * @param Request $request The HTTP request
     */
    public function put($id, Request $request)
    {
        $task = Task::find($id);

        if ($task === null) {

            return response()->json(['error' => 'Tâche non trouvée.'], 404);
        }

        // PUT : error if at least one field is missing
        if (!$request->filled(['title', 'categoryId', 'completion', 'status'])) {
            // 422 : Unprocessable content
            return response()->json(['error' => 'Toutes les propriétés sont nécessaires.'], 422);
        }

        $task->title = $request->input('title');
        $task->category_id = $request->input('categoryId');
        $task->completion = $request->input('completion');
        $task->status = $request->input('status');

        $success = $task->save();

        return response()->json(['message' => 'Mise à jour effectuée'], 200);
    }

    /**
     * Modification partial (PATCH)
     *
     * @param int $id Task id to update
     * @param Request $request The HTTP request
     */
    public function patch($id, Request $request)
    {
        $task = Task::find($id);

        // 404
        if ($task === null) {
            // 404 au format JSON
            return response()->json(['error' => 'Tâche non trouvée.'], 404);
        }

        // PATCH : error if none of the filds is found
        // @link https://laravel.com/docs/8.x/requests#determining-if-input-is-present
        if (!$request->hasAny(['title', 'categoryId', 'completion', 'status'])) {

            return response()->json(['error' => 'Au moins une des propriétés est nécessaire.'], 422);
        }

        if ($request->filled('title')) {
            $task->title = $request->input('title');
        }
        if ($request->filled('categoryId')) {
            $task->category_id = $request->input('categoryId');
        }
        if ($request->filled('completion')) {
            $task->completion = $request->input('completion');
        }
        if ($request->filled('status')) {
            $task->status = $request->input('status');
        }

        $success = $task->save();

        return response()->json(['message' => 'Mise à jour effectuée'], 200);
    }

    // Si on souhaite fusionner put() et patch()
    // on utilisera if ($request->isMethod('patch')) {}

    /**
     * Deletion (DELETE)
     *
     * @param int $id Task id to delete
     * @param Request $request The HTTP request
     */
    public function delete($id, Request $request)
    {
        $task = Task::find($id);

        if ($task === null) {

            return response()->json(['error' => 'Tâche non trouvée.'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted'], 204);
    }

}
