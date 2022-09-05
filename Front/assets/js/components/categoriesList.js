
 const categoriesList = {

    init: function () {

        categoriesList.loadCategoriesFromAPI();

    },

    // ######## API ########

    /**
     * Load categories from the API
     */
    loadCategoriesFromAPI: function () {

        fetch(app.rootApi + '/categories')

            .then(
                function (response) {

                    return response.json();
                }
            )
            .then(
                function (categories) {
 
                    categoriesList.processCategories(categories);
                }
            );
    },

    // ######## DOM ########

    /**
     * Process categories list (loop, create and display)
     */
    processCategories: function(categories) {


        const selectFilters = categoriesList.createSelectElement(categories);

        const selectNewTaskForm = categoriesList.createSelectElement(categories);
        
        document.querySelector('.filters__task--category').appendChild(selectFilters);

        document.querySelector('.task__category-select').appendChild(selectNewTaskForm);
    },

    /**
     * Creates a select element for the given categories
     */
    createSelectElement: function(categories) {


        const selectElement = document.createElement('select');

        const defaultOption = document.createElement('option');

        defaultOption.textContent = 'Toutes les catégories';

        selectElement.appendChild(defaultOption);


        // Loop over categories
        for (const category of categories) {

            const optionElement = document.createElement('option');

            optionElement.dataset.category_id = category.id;

            optionElement.textContent = category.name;

            selectElement.appendChild(optionElement);

        }

        return selectElement;
    }

}