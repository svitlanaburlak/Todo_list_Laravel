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
        // Les données à retourner
        // On va charger les données liées en même temps (jointure)
        // via ->load('nom_de_la_relation_dans_le_modèle')
        // @link https://laravel.com/docs/8.x/eloquent-relationships#lazy-eager-loading
        // charge les tâches et les catégories associées
        $tasksList = Task::all()->load('category');

        // Sous forme de JSON
        return response()->json($tasksList);
    }

    /**
     * Create task
     *
     * Request $request => type-hinting (déclaration de type)
     * Laravel va nos transmettre un objet $request qui représente la requête HTTP
     */
    public function create(Request $request)
    {
        // récupérer toutes les données envoyées en POST
        // => elles se trouvent dans $request->input('title')

        // Les données à récupérer sont :
        // {
        //     "title": "Mettre en place l'API TodoList",
        //     "categoryId": 3,
        //     "completion": 0,
        //     "status": 1
        // }
        // dd($request); // dump() et stop le programme

        // On pourrait tout traiter "à la mano" comme en pur PHP mais avec les objets de Laravel
        // if (!$request->filled('title')) {
        //     $errors[] = 'Le champ title est manquant';
        // }

        // Bonus : validation manuelle avec Laravel
        // Yusuf <3 via @link https://grafikart.fr/tutoriels/validations-612
        // @link https://laravel.com/docs/8.x/validation#manually-creating-validators
        $validation = Validator::make($request->all(), [
            // Les rules (règles) de validation
            // @link https://laravel.com/docs/8.x/validation#rule-required
            'title' => 'required|max:128',
            'categoryId' => 'required|integer|gt:0',
            'completion' => 'required|integer|gte:0|lte:100',
            'status' => 'required|digits_between:1,2',
        ]);

        // En cas d'erreur
        if ($validation->fails()) {
            // On retourne la liste des erreurs au format JSON
            // 422 : Unprocessable content : les données transmises ne permettent pas un traitement de la demande
            return response()->json($validation->errors(), 422);
        }

        // créer un nouvel objet pour la classe Task
        $task = new Task();

        // modifier les propriétés de cet objet avec ce que l'on a reçu de la requête
        $task->title = $request->input('title');
        // Pas de $task->setTitle($request->input('title'));
        $task->category_id = $request->input('categoryId');
        $task->completion = $request->input('completion');
        $task->status = $request->input('status');

        // sauvegarder l'objet Task
        $success = $task->save();

        // si l'ajout a fonctionné
        if ($success) {

            // alors retourner un code de réponse HTTP 201 "Created"
            return response()->json($task, 201);

            // si on voulait respecter REST on devrait ajouter :
            // => 'Location' header with link to /customers/{id} containing new ID.
            // return response()->redirectToRoute('get_task_item', $task->id, 201);
        }
        // sinon
        else {
            // alors retourner un code de réponse HTTP 500 "Internal Server Error"
            return response()->json(null, 500);
        }
    }

    /**
     * Mise à jour complète (PUT)
     *
     * @param int $id Task id to update
     * @param Request $request The HTTP request
     */
    public function put($id, Request $request)
    {
        // On récupère la tâche
        $task = Task::find($id);

        // 404 ? (tâche non trouvée)
        if ($task === null) {
            // 404 au format JSON  (on utilise pas abort() qui retourne du HTML)
            return response()->json(['error' => 'Tâche non trouvée.'], 404);
        }

        // PUT : erreur si une des données est absente
        if (!$request->filled(['title', 'categoryId', 'completion', 'status'])) {
            // 422 : Unprocessable content : les données transmises ne permettent pas un traitement de la demande
            return response()->json(['error' => 'Toutes les propriétés sont nécessaires.'], 422);
        }

        // On met à jour (côté PHP)
        $task->title = $request->input('title');
        $task->category_id = $request->input('categoryId');
        $task->completion = $request->input('completion');
        $task->status = $request->input('status');

        // On sauvegarde en BDD
        $success = $task->save();

        return response()->json(['message' => 'Mise à jour effectuée'], 200);
    }

    /**
     * Mise à jour partielle (PATCH)
     *
     * @param int $id Task id to update
     * @param Request $request The HTTP request
     */
    public function patch($id, Request $request)
    {
        // On récupère la tâche
        $task = Task::find($id);

        // 404 ? (tâche non trouvée)
        if ($task === null) {
            // 404 au format JSON  (on utilise pas abort() qui retourne du HTML)
            return response()->json(['error' => 'Tâche non trouvée.'], 404);
        }

        // PATCH : erreur si aucune donnée n'est présente
        // @link https://laravel.com/docs/8.x/requests#determining-if-input-is-present
        if (!$request->hasAny(['title', 'categoryId', 'completion', 'status'])) {
            // 422 : Unprocessable content : les données transmises ne permettent pas un traitement de la demande
            return response()->json(['error' => 'Au moins une des propriétés est nécessaire.'], 422);
        }

        // On met à jour (côté PHP)

        // On vérifie que la donnée est présente dans la requête
        // => on ne met à jour que la donnée qui est présente dans la requête

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

        // On sauvegarde en BDD
        $success = $task->save();

        return response()->json(['message' => 'Mise à jour effectuée'], 200);
    }

    // Si on souhaite fusionner put() et patch()
    // on utilisera if ($request->isMethod('patch')) {}

    /**
     * Suppresion (DELETE)
     *
     * @param int $id Task id to delete
     * @param Request $request The HTTP request
     */
    public function delete($id, Request $request)
    {
        // On récupère la tâche
        $task = Task::find($id);

        // 404 ? (tâche non trouvée)
        if ($task === null) {
            // 404 au format JSON  (on utilise pas abort() qui retourne du HTML)
            return response()->json(['error' => 'Tâche non trouvée.'], 404);
        }


        // we delete from db
        $task->delete();

        return response()->json(['message' => 'Task deleted'], 204);
    }

}
