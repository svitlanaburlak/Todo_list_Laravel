
const taskList = {

    init: function() {

        taskList.loadTasksFromAPI();

    },

    // ######## Event listeners ########

    /**
     * Méthode qui ajoute les écouteurs sur toutes les tâches
     * 
     * @deprecated Plus utile car plus de tâches par défaut
     */
    bindAllTasksEvents: function() {

        const tasksListElements = document.querySelectorAll('.tasks .task');
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for...of
        for (const taskElement of tasksListElements) {
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

        const tasksList= document.querySelector('.tasks');

        task.bindSingleTaskEvents(taskElement);

        tasksList.prepend(taskElement);
    },

    /**
     * Load tasks from the API
     */
    loadTasksFromAPI: function () {

        fetch(app.rootApi + '/tasks')

            .then(
                function (response) {
                    
                    return response.json();
                }
            )
            .then(
                function (tasks) {

                   taskList.processTasks(tasks);
                }
            );

    },

    // ######## DOM ########

    /**
     * Process tasks list (loop, create and display)
     */
    processTasks: function (tasks) {

        for (const taskObject of tasks) {

            newTaskElement = task.createTaskElement(taskObject);

            taskList.addTask(newTaskElement);
        }

        filter.filterArchiveHidden();

    }
}