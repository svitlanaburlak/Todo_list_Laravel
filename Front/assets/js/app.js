
const app = {

    // La route de base de l'API (Root API ou Base URL)
    rootApi: 'http://localhost:8080/api',

    init: function() {
        taskList.init();
        newTaskForm.init();
        categoriesList.init();
        filter.init();
    }
};

document.addEventListener('DOMContentLoaded', app.init);