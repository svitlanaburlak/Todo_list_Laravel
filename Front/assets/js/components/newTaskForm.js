// Composant du formulaire d'ajout de tâche
const newTaskForm = {

    // Initialiser le composant
    init: function () {

        // Select form element which adds new task
        const formElement = document.querySelector('.task--add form');

        // Add event listener to the submit of the form
        formElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    /**
     * Handle form submit
     */
    handleNewTaskFormSubmit: function (event) {

        // On annule la soumission du formulaire
        event.preventDefault();

        // On sélectionne le formulaire
        const formElement = event.currentTarget;

        // Depuis le form, on récupère la valeur saisie dans l'input '.task__title-field'
        const newTaskTitle = formElement.querySelector('.task__title-field').value;
        // Depuis le form, on récupère la catégorie sélectionnée
        // /!\ On devrait utiliser selectedIndex
        // @link https://developer.mozilla.org/fr/docs/Web/API/HTMLSelectElement/selectedIndex

        // Balise Select concernée
        const selectCategory = formElement.querySelector('.task__category select');
        // On réupère sa valeur
        const newTaskCategory = formElement.querySelector('.task__category select').value;
        // On récupère son nom (options est un tableau indexé qui contient les options)
        // .selectedIndex contient l'index sélectionné qui nous permet ensuite d'accéder au texte de l'option
        // @link https://developer.mozilla.org/fr/docs/Web/API/HTMLSelectElement/selectedIndex
        const newTaskCategoryId = selectCategory.options[selectCategory.selectedIndex].dataset.category_id;

        // On crée un objet pour transmettre les données
        const taskObject = {
            "title": newTaskTitle,
            "categoryId": newTaskCategoryId,
            "completion": 0,
            "status": 1,
            "category": {
                "id": newTaskCategoryId,
                "name": newTaskCategory
            },
        }

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(taskObject)
        };

        // Effectuer l'appel vers le endpoint "/tasks/{id}" avec la méthode PATCH
        fetch(app.rootApi + '/tasks', fetchOptions)
            .then(
                function (response) {
                    // Si HTTP status code à 201 => OK
                    if (response.status == 201) {
                        // Création de la tâche
                        newTaskElement = task.createTaskElement(taskObject);

                        // On l'ajoute au DOM (depuis la liste des tâches)
                        taskList.addTask(newTaskElement);
                    }
                    else {
                        // @todo Afficher le message JSON qiu vient du back
                        alert('L\'ajout a échoué : code ' + response.status);
                    }
                }
            );
            

        //todo atelier-e07
        // erase input field
        document.querySelector('.task--add form').reset();
        // put focus back of the form input line
        document.querySelector('.task--add .task__title-field').focus();
        //todo atelier-e07
    }

}