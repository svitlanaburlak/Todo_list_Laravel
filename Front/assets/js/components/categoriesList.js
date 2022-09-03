/**
 * Composant qui gère les catégories
 */
 const categoriesList = {

    // ######## INIT ########

    init: function () {

        categoriesList.loadCategoriesFromAPI();

    },

    // ######## API ########

    /**
     * Load categories from the API
     */
    loadCategoriesFromAPI: function () {

        // console.log('loading categories from API');

        // Emet la requête
        fetch(app.rootApi + '/categories')
            // Quand la réponse est reçue
            .then(
                function (response) {
                    // On retourne le JSON reçu...
                    return response.json();
                }
            )
            .then(
                function (categories) {
                    // ...accessible directement sous forme d'objet
                    // Traitement des données ici !
                    // console.log(categories);
                    categoriesList.processCategories(categories);
                }
            );
    },

    // ######## DOM ########

    /**
     * Process categories list (loop, create and display)
     */
    processCategories: function(categories) {

        // On crée le select des filtres
        const selectFilters = categoriesList.createSelectElement(categories);
        // On crée le select du formulaire
        const selectNewTaskForm = categoriesList.createSelectElement(categories);
        
        // On ajoute les select au DOM

        // Premier select, enfant de '.filters__task--category'
        document.querySelector('.filters__task--category').appendChild(selectFilters);

        // Second select, enfant de '.task__category-select'
        // /!\ on a ajouté la classe 'task__category-select' dans le code HTML
        document.querySelector('.task__category-select').appendChild(selectNewTaskForm);
    },

    /**
     * Creates a select element for the given categories
     */
    createSelectElement: function(categories) {

        // Créer un élement "select", avec une classe CSS optionnelle
        const selectElement = document.createElement('select');
        // Ajouter l'option par défaut "Toutes les catégories"
        const defaultOption = document.createElement('option');
        // On lui ajoute son libellé (node content)
        defaultOption.textContent = 'Toutes les catégories';
        // On ajoute cette option au select
        selectElement.appendChild(defaultOption);
        // console.log(selectElement);

        // Loop over categories
        // Crée une option option pour chaque catégorie
        // qu'on ajoute au select parent
        for (const category of categories) {

            // Ajouter l'option de la catégorie courante
            const optionElement = document.createElement('option');
            // La valeur de l'option est l'id de la catégorie
            optionElement.dataset.category_id = category.id;
            // On lui ajoute son libellé (node content) : nom de la catégorie
            optionElement.textContent = category.name;
            // On ajoute cette option au select
            selectElement.appendChild(optionElement);

        }

        // On retourne l'élément crée
        return selectElement;
    }

}