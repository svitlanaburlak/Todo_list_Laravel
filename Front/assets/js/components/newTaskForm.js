
const newTaskForm = {


    init: function () {

        const formElement = document.querySelector('.task--add form');

        formElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    /**
     * Handle form submit
     */
    handleNewTaskFormSubmit: function (event) {

        event.preventDefault();

        const formElement = event.currentTarget;

        const newTaskTitle = formElement.querySelector('.task__title-field').value;

        // @link https://developer.mozilla.org/fr/docs/Web/API/HTMLSelectElement/selectedIndex

        const selectCategory = formElement.querySelector('.task__category select');

        const newTaskCategory = formElement.querySelector('.task__category select').value;

        // @link https://developer.mozilla.org/fr/docs/Web/API/HTMLSelectElement/selectedIndex
        const newTaskCategoryId = selectCategory.options[selectCategory.selectedIndex].dataset.category_id;

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

        fetch(app.rootApi + '/tasks', fetchOptions)
            .then(
                function (response) {

                    if (response.status == 201) {

                        newTaskElement = task.createTaskElement(taskObject);

                        
                        taskList.addTask(newTaskElement);
                    }
                    else {

                        alert('L\'ajout a échoué : code ' + response.status);
                    }
                }
            );
            


        // erase input field
        document.querySelector('.task--add form').reset();
        // put focus back of the form input line
        document.querySelector('.task--add .task__title-field').focus();

    }

}