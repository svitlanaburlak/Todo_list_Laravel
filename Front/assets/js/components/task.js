
const task = {

    // ######## Event listeners ########

    /**
     * Method to add event listeners for a choosen task
     * 
     * 
     * @param {HTMLElement} taskElement DOM element for which event listener is added
     */
    bindSingleTaskEvents: function (taskElement) {

        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');

        taskTitleLabelElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

        const taskEditElement = taskElement.querySelector('.task__button--modify');
        taskEditElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');

        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);

        const buttonCompleteTaskElement = taskElement.querySelector('.task__button--validate');
        buttonCompleteTaskElement.addEventListener('click', task.handleCompleteTask);

        const buttonIncompleteTaskElement = taskElement.querySelector('.task__button--incomplete');
        buttonIncompleteTaskElement.addEventListener('click', task.handleIncompleteTask);

        const taskButtonArchive = taskElement.querySelector('.task__button--archive');
        taskButtonArchive.addEventListener('click', task.handleArchiveTask);

        const taskButtonDelete = taskElement.querySelector('.task__button--delete');
        taskButtonDelete.addEventListener('click', task.handleDeleteTask);
    },

    // ######## DOM ########

    /**
     * Creates a task DOM element
     * 
     * @param {Object} taskObject Object containing task data
     * @returns {HTMLElement} The created task
     */
    createTaskElement: function (taskObject) {


        const templateTaskElement = document.getElementById('task-template').content.cloneNode(true);

        const newTaskElement = templateTaskElement.querySelector('.task');

        newTaskElement.dataset.category = taskObject.category.name;

        newTaskElement.querySelector('.task__category p').textContent = taskObject.category.name;

        newTaskElement.querySelector('.task__category').dataset.category_id = taskObject.category.id;

        newTaskElement.dataset.id = taskObject.id;

        newTaskElement.querySelector('.task__title-label').textContent = taskObject.title;

        newTaskElement.querySelector('.task__title-field').value = taskObject.title;

        if (taskObject.completion == 100) {
            task.markAsComplete(newTaskElement);
        }
        if (taskObject.status == 2) {
            newTaskElement.classList.remove('task--todo');
            newTaskElement.classList.remove('task--complete');
            newTaskElement.classList.remove('task--incomplete');   
            newTaskElement.classList.add('task--archive'); 
        }

        const progressBarElement = newTaskElement.querySelector('.progress-bar__level');
        progressBarElement.style.width = taskObject.completion + '%';

        return newTaskElement;
    },

    // ######## Handlers (callback) ########

    /**
     * Method to handle click on the title (mode edit)
     */
    handleEnableTaskTitleEditMode: function (event) {

        const taskTitleLabelElement = event.currentTarget;

        const taskElement = taskTitleLabelElement.closest('.task');

        taskElement.classList.add('task--edit');

        taskElement.querySelector('.task__title-field').focus();
    },

    /**
     * Method to handle out of focus from the title
     */
    handleValidateNewTaskTitle: function (event) {

        console.log('Sortie du champ.');

        const taskTitleFieldElement = event.currentTarget;

        const taskElement = taskTitleFieldElement.closest('.task');

        taskElement.classList.remove('task--edit');

        const newTaskTitle = taskTitleFieldElement.value;

        const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;

        taskTitleLabelElement.textContent = newTaskTitle;

        //todo add data, fetch, patch to modify title
        
    },

    /**
     * Mark a task as complete
     */
    handleCompleteTask: function (event) {

        const buttonCompleteTaskElement = event.currentTarget;

        // @link https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        const taskElement = buttonCompleteTaskElement.closest('.task');

        const taskId = taskElement.dataset.id;

        const data = {
            completion: 100
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

        fetch(app.rootApi + '/tasks/' + taskId, fetchOptions)
            .then(
                function (response) {

                    if (response.status == 200) {

                        task.markAsComplete(taskElement);
                    }
                    else {

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


        fetch(app.rootApi + '/tasks/' + taskId, fetchOptions)
            .then(
                function (response) {

                    if (response.status == 200) {

                        task.markAsIncomplete(taskElement);
                    }
                    else {

                        alert('L\'ajout a échoué : code ' + response.status);
                    }
                }
            );
    },

    
    /**
     * Mark a task as complete
     * 
     * @param {HTMLEment} taskElement The task element to update
     */
    markAsComplete: function(taskElement) {

        taskElement.classList.remove('task--todo');
        taskElement.classList.add('task--complete');
    },

    /**
     * Mark a task as incomplete
     * 
     * @param {HTMLEment} taskElement The task element to update
     */
    markAsIncomplete: function(taskElement) {

        taskElement.classList.add('task--todo');
        taskElement.classList.remove('task--complete');
    },


    handleArchiveTask: function (event) {

    const taskElement = event.currentTarget.closest('.task');
    const taskElementId = taskElement.dataset.id;

        // to display an confirmation alert 
        if (window.confirm("Do you really want to move this task to archive?")) {

            const data = {
                status: 2
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


            fetch(app.rootApi + '/tasks/' + taskElementId, fetchOptions)
            .then(
                function(response) {

                    if (response.status == 200) {

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
  
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");


        const fetchOptions = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',

            headers: httpHeaders,

            body: JSON.stringify(data)
        };


        fetch(app.rootApi + '/tasks/' + taskElementId, fetchOptions)
        .then(
            function(response) {

                if (response.status == 204) {
                    alert('deleted');

                } else {
                    alert('failed');
                }
            }
        );
    }
}