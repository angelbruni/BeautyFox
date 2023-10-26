var currentPage = 0; // Default to the first page

function updateNavBackButton() {
    var navBackButton = document.getElementById('backButton');

    if (navBackButton) {
        // Disable the button if currentPage is 0, enable otherwise
        navBackButton.disabled = (currentPage === 0);

        // Assign a function to the onclick property
        navBackButton.onclick = function() {
            // Check if currentPage is greater than 0
            if (currentPage > 0) {
                // Call showPage with the previous page number
                showPage(currentPage - 1);
            }
        };
    } else {
        console.log('The wizard back navigation button was not found.');
    }
}

function showPage(pageNumber) {
    var pageId = 'page' + pageNumber;
    var selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        // Hide all pages
        var pages = document.querySelectorAll('.page');
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.display = 'none';
        }

        // Show the selected page
        selectedPage.style.display = 'flex';
        currentPage = pageNumber; // Update the currentPage variable
    } else {
        console.error('Page not found: ' + pageId);
    }
    
    updateNavBackButton()
}

showPage(currentPage);
updateNavBackButton();