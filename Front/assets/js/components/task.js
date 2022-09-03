// Composant qui gère une tâche
const task = {

    // ######## Event listeners ########

    /**
     * Méthode qui ajoute les écouteurs sur une tâche donnée
     * 
     * @param {HTMLElement} taskElement L'élément du DOM sur lequel attacher les écouteurs
     */
    bindSingleTaskEvents: function (taskElement) {

        // On cible le titre de la tâche
        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
        // On attache l'écouteur dessus
        taskTitleLabelElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

        //todo atelier-e07
        const taskEditElement = taskElement.querySelector('.task__button--modify');
        taskEditElement.addEventListener('click', task.handleEnableTaskTitleEditMode);
        //todo atelier-e07

        // En cas de perte de focus ('blur') sur les inputs : valide le texte
        // On cible le champ de formulaire
        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
        // On attache l'écouteur dessus
        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);

        // Marquer une tâche comme terminée
        const buttonCompleteTaskElement = taskElement.querySelector('.task__button--validate');
        buttonCompleteTaskElement.addEventListener('click', task.handleCompleteTask);

        // Marquer une tâche comme non terminée
        const buttonIncompleteTaskElement = taskElement.querySelector('.task__button--incomplete');
        buttonIncompleteTaskElement.addEventListener('click', task.handleIncompleteTask);

        //todo atelier-e07
        const taskButtonArchive = taskElement.querySelector('.task__button--archive');
        taskButtonArchive.addEventListener('click', task.handleArchiveTask);

        const taskButtonDelete = taskElement.querySelector('.task__button--delete');
        taskButtonDelete.addEventListener('click', task.handleDeleteTask);
    },

    // ######## DOM manipulation ########

    /**
     * Creates a task DOM element
     * 
     * @param {Object} taskObject Object containing task data
     * @returns {HTMLElement} The created task
     */
    createTaskElement: function (taskObject) {

        // On clone le template
        const templateTaskElement = document.getElementById('task-template').content.cloneNode(true);
        // /!\ On récupère un "document-fragment" qui contient notre élément '.task'
        // On en extrait un nouvel élément du DOM
        const newTaskElement = templateTaskElement.querySelector('.task');
        // console.log(newTaskElement);

        // On modifie les valeurs dans le template (catégorie)
        // Le dataset (data-category="")
        newTaskElement.dataset.category = taskObject.category.name;
        // La catégorie affichée à droite de la tâche
        newTaskElement.querySelector('.task__category p').textContent = taskObject.category.name;

        //todo aterlier-e07
        newTaskElement.querySelector('.task__category').dataset.category_id = taskObject.category.id;
        //todo aterlier-e07

        // Le dataset pour l'id de la tâche en BDD (data-id="")
        newTaskElement.dataset.id = taskObject.id;

        // On modifie les valeurs dans le template (titre)
        // Sur le paragraphe
        newTaskElement.querySelector('.task__title-label').textContent = taskObject.title;
        // La valeur par défaut du champ texte (form input)
        newTaskElement.querySelector('.task__title-field').value = taskObject.title;

        // @todo A voir pour mettre cette gestion ailleurs
        // Si status = 2 => task--complete
        if (taskObject.completion == 100) {
            task.markAsComplete(newTaskElement);
        }
        if (taskObject.status == 2) {
            newTaskElement.classList.remove('task--todo');
            newTaskElement.classList.remove('task--complete');
            newTaskElement.classList.remove('task--incomplete');   
            newTaskElement.classList.add('task--archive'); 
        }

        // Gestion de la complétion
        const progressBarElement = newTaskElement.querySelector('.progress-bar__level');
        progressBarElement.style.width = taskObject.completion + '%';

        return newTaskElement;
    },

    // ######## Handlers (fonctions de callback/de rappel) ########

    /**
     * Fonction qui traite le clic sur la titre (active le mode d'éditoin de la tâche)
     */
    handleEnableTaskTitleEditMode: function (event) {

        // console.log('Titre cliqué');
        // console.log(event.currentTarget);

        // L'élément du DOM cliqué
        const taskTitleLabelElement = event.currentTarget;

        // On souhaite cibler sa tâche parente (classe '.task')
        // Quel moyen/méthode pour accéder à un élément parent via un sélecteur CSS
        // @link https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        const taskElement = taskTitleLabelElement.closest('.task');

        // On modifie la classe CSS pour ajouter '.task--edit'
        // Le nom de la classe sans le '.'
        taskElement.classList.add('task--edit');

        // Bonus UX : on met le focus (le curseur) dans le champ de formulaire
        taskElement.querySelector('.task__title-field').focus();
    },

    /**
     * Méthode qui gère la perte de focus sur l'edit du titre
     */
    handleValidateNewTaskTitle: function (event) {

        console.log('Sortie du champ.');
        // console.log(event.currentTarget);
        const taskTitleFieldElement = event.currentTarget;

        // On souhaite cibler sa tâche parente (classe '.task')
        const taskElement = taskTitleFieldElement.closest('.task');

        // On modifie la classe CSS pour supprimer '.task--edit'
        taskElement.classList.remove('task--edit');

        // Récupérer la valeur de l'input (nouvelle valeur)
        const newTaskTitle = taskTitleFieldElement.value;

        // Remplacer l'ancienne valeur par la nouvelle dans le libellé du titre
        // On accède au titre qui est le voisin précédent de l'input
        const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;
        // On modifie son contenu texte
        taskTitleLabelElement.textContent = newTaskTitle;

        //todo atelier-e07 
        // add data, fetch, patch to modify title
        
    },

    /**
     * Mark a task as complete
     */
    handleCompleteTask: function (event) {

        // L'élément du DOM cliqué
        const buttonCompleteTaskElement = event.currentTarget;

        // console.log(buttonCompleteTaskElement);

        // On souhaite cibler sa tâche parente (classe '.task')
        // Quel moyen/méthode pour accéder à un élément parent via un sélecteur CSS
        // @link https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        const taskElement = buttonCompleteTaskElement.closest('.task');

        // Récupérer l'id de la tâche à modifier
        const taskId = taskElement.dataset.id;

        // Définir un objet qui modifie le statut de cette tâche pour l'envoyer avec la requête
        const data = {
            // statut "done" (complete)
            completion: 100
        };

        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        // et que Laravel se base dessus pour qu'on puisse accéder
        // à $request->input('status'), par ex.

        // Analogie : camion de céréales qui indique le type de contenu qu'il transporte
        // Analogie : destiantion du carton de déménagement (cuisine, chambre etc.)
        // => ça nous simplifie le traitement, sinon on va devoir ouvrir le camion ou le carton
        // pour connaitre le contenu en question
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour modifier le statut
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        // Effectuer l'appel vers le endpoint "/tasks/{id}" avec la méthode PATCH
        fetch(app.rootApi + '/tasks/' + taskId, fetchOptions)
            .then(
                function (response) {
                    // Si HTTP status code à 200 => OK
                    if (response.status == 200) {
                        // et au retour, modifier le DOM
                        task.markAsComplete(taskElement);
                    }
                    else {
                        // @todo Afficher le message JSON qiu vient du back
                        alert('L\'ajout a échoué : code ' + response.status);
                    }
                }
            );
    },

    /**
     * Mark a task as incomplete
     */
    handleIncompleteTask: function (event) {

        const buttonIncompleteTaskElement = event.currentTarget;

        const taskElement = buttonIncompleteTaskElement.closest('.task');

        const taskId = taskElement.dataset.id;

        const data = {
            // statut "incomplete"
            completion: 0
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(data)
        };

        // Effectuer l'appel vers le endpoint "/tasks/{id}" avec la méthode PATCH
        fetch(app.rootApi + '/tasks/' + taskId, fetchOptions)
            .then(
                function (response) {
                    // Si HTTP status code à 200 => OK
                    if (response.status == 200) {
                        // et au retour, modifier le DOM
                        task.markAsIncomplete(taskElement);
                    }
                    else {
                        // @todo Afficher le message JSON qiu vient du back
                        alert('L\'ajout a échoué : code ' + response.status);
                    }
                }
            );
    },

    
    /**
     * Marque une tâche comme "complete"
     * 
     * @param {HTMLEment} taskElement The task element to update
     */
    markAsComplete: function(taskElement) {
        // Mise à jour des classes CSS pour terminer une tâche
        taskElement.classList.remove('task--todo');
        taskElement.classList.add('task--complete');
    },

    /**
     * Marque une tâche comme "incomplete"
     * 
     * @param {HTMLEment} taskElement The task element to update
     */
    markAsIncomplete: function(taskElement) {
        // Mise à jour des classes CSS pour terminer une tâche
        taskElement.classList.add('task--todo');
        taskElement.classList.remove('task--complete');
    },


    //todo atelier-e07
    handleArchiveTask: function (event) {

    const taskElement = event.currentTarget.closest('.task');
    const taskElementId = taskElement.dataset.id;

        // to display an confirmation alert 
        if (window.confirm("Do you really want to move this task to archive?")) {

            // On stocke les données à transférer
            const data = {
                status: 2
            };
            // On prépare les entêtes HTTP (headers) de la requête
            // afin de spécifier que les données sont en JSON
            const httpHeaders = new Headers();
            httpHeaders.append("Content-Type", "application/json");

            // On consomme l'API pour ajouter en DB
            const fetchOptions = {
                method: 'PATCH',
                mode: 'cors',
                cache: 'no-cache',
                // On ajoute les headers dans les options
                headers: httpHeaders,
                // On ajoute les données, encodées en JSON, dans le corps de la requête
                body: JSON.stringify(data)
            };

            // Exécuter la requête HTTP avec FETCH
            fetch(app.rootApi + '/tasks/' + taskElementId, fetchOptions)
            .then(
                function(response) {
                    // console.log(response);
                    // Si HTTP status code à 200 => OK
                    if (response.status == 200) {
                        // alert('archivé');
                        console.log(response);
                        taskElement.classList.remove('task--todo');
                        taskElement.classList.remove('task--complete');
                        taskElement.classList.remove('task--incomplete');
                        taskElement.classList.add('task--archive');   
                    }
                    else {
                        alert('failed');
                    }
                }
            );


        }
    },

    handleDeleteTask: function (event) {
        const taskElement = event.currentTarget.closest('.task');
        const taskElementId = taskElement.dataset.id;

        const data = {
            id: taskElementId
        };
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        // Exécuter la requête HTTP avec FETCH
        fetch(app.rootApi + '/tasks/' + taskElementId, fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code à 204 => OK
                if (response.status == 204) {
                    alert('deleted');

                } else {
                    alert('failed');
                }
            }
        );
    }
}