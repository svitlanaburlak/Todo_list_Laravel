// Notre module "app", celui qui va régir l'application
const app = {

    // La route de base de l'API (Root API ou Base URL)
    // /!\ Sans le *slash final* (trailing slash)
    rootApi: 'http://localhost:8080/api',

    init: function() {

        // console.log('App chargée.');

        // Initialisation de nos composants
        taskList.init();
        newTaskForm.init();
        categoriesList.init();
        filter.init();
    }
};

// On appelle notre méthode app.init() dès que le DOM est chargé
document.addEventListener('DOMContentLoaded', app.init);