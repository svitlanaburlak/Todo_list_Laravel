const filter = {

    showArchivedTasks: false,

    init: function () {

        // add event listeners to all the filter buttons
        const filterChoiceButtons = document.querySelectorAll('.filters__choice');
        
        for (const filterElement of filterChoiceButtons) {

            filterElement.addEventListener('click', filter.handleFilter);
        }
    },

    handleFilter: function (event) {

        let filterChoosen = event.currentTarget.dataset.filter;
        console.log(event.currentTarget.dataset.filter);

        if(filterChoosen == "todo"){
            const taskToHide = document.querySelectorAll('.task--complete, .task--archive');

            for (const taskElement of taskToHide) {
                taskElement.style.display = "none";
            }
        }
        
        if (filterChoosen == "complete") {
            const taskToHide = document.querySelectorAll('.task--todo, .task--archive, .task--edit');
            // to hide this tasks
            for (const taskElement of taskToHide) {
                taskElement.style.display = "none";
            }
        } 
    
        if (filterChoosen == "all") {
            const taskToShow = document.querySelectorAll('.task');
            // to hide this tasks
            for (const taskElement of taskToShow) {
                taskElement.style.display = "";
            }
        } 
        
        if (filterChoosen == "archive") {

            showArchivedTasks = true;

            const taskToHide = document.querySelectorAll('.task--todo, .task--complete, .task--incomplete, .task--edit');
            // to hide this tasks
            for (const taskElement of taskToHide) {
                taskElement.style.display = "none";
            }

            const tasksListElements = document.querySelectorAll('.tasks .task');
            for (const taskElement of tasksListElements) {

                if(taskElement.classList.contains('task--archive')) {
                    taskElement.style.display = "block";
                }
            }

        }
    },

    filterArchiveHidden: function () {

        const tasksListElements = document.querySelectorAll('.tasks .task');
 
            // @link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for...of
            for (const taskElement of tasksListElements) {
               
                if(taskElement.classList.contains('task--archive')) {
                    taskElement.style.display = "none";
                }
            }
        
        
        
    }
} 