// Composant qui gère la liste des tâches
const taskList = {

    /**
     * Initialiser le composant
     */
    init: function() {

        // Mise en place des écouteurs sur les tâches
        //taskList.bindAllTasksEvents(); // <= plus utile car on a plus de tâches par défaut

        // Autres actions si besoin...
        taskList.loadTasksFromAPI();

    },

    // ######## Event listeners ########

    /**
     * Méthode qui ajoute les écouteurs sur toutes les tâches
     * 
     * @deprecated Plus utile car plus de tâches par défaut
     */
    bindAllTasksEvents: function() {

        // On récupère toutes les tâches de la liste

        // On récupère dans un tableau tous les éléments du DOM correspondant aux tâches
        // Par convention de nommage, nos variables utilisent :
        // - le suffixe 'Element(s)' s'il s'agit d'un élément du DOM
        // - le suffixe 'List' s'il s'agit d'un tableau/d'une liste

        const tasksListElements = document.querySelectorAll('.tasks .task');
        // console.log(tasksListElements);

        // On boucle sur les tâches
        // @link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for...of
        for (const taskElement of tasksListElements) {
            // On applique les events listeners sur chaque tâche
            task.bindSingleTaskEvents(taskElement);
        }

    },

    // ######## DOM ########

    /**
     * Add a given task to the list
     * 
     * @param {HTMLElement} taskElement The task element to add to the DOM
     */
    addTask: function(taskElement) {

        // On cible la liste des tâches
        const tasksList= document.querySelector('.tasks');

        // On ajoute les écouteurs sur la nouvelle tâche
        // /!\ Sinon on ne pourrra pas interagir avec elle !
        task.bindSingleTaskEvents(taskElement);

        // On ajoute la tâche en haut de liste (donc prepend en JS)
        tasksList.prepend(taskElement);
    },

    /**
     * Load tasks from the API
     */
    loadTasksFromAPI: function () {

        // console.log('loading tasks from API');

        // Emet la requête
        fetch(app.rootApi + '/tasks')
            // Quand la réponse est reçue
            .then(
                function (response) {
                    // On retourne le JSON reçu...
                    return response.json();
                }
            )
            .then(
                function (tasks) {
                    // ...accessible directement sous forme d'objet
                    // Traitement des données ici !
                    // console.log(tasks);
                   taskList.processTasks(tasks);
                }
            );

    },

    // ######## DOM ########

    /**
     * Process tasks list (loop, create and display)
     */
    processTasks: function (tasks) {

        // On boucle sur les tâches
        // /!\ attention si on appele task notre objet courant
        // on ne pourra pas appeler notre composant "task" depuis cette boucle
        for (const taskObject of tasks) {
            // console.log(taskObject);

            // Création de la tâche
            newTaskElement = task.createTaskElement(taskObject);

            // On l'ajoute au DOM (depuis la liste des tâches)
            taskList.addTask(newTaskElement);
        }

        //todo atelier-e07
        //call method to check all the tasks if there are some archived
        filter.filterArchiveHidden();

    }
}