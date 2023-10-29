function moveExtensionsBtn() {
    // Get the elements
    var unifiedExtensionsButton = document.getElementById('unified-extensions-button');
    var personalBookmarks = document.getElementById('personal-bookmarks');
    var personalToolbar = document.getElementById('PersonalToolbar');

    // Check if the elements exist on the page
    if (unifiedExtensionsButton && personalBookmarks && personalToolbar) {
        // Remove #unified-extensions-button from its current position
        unifiedExtensionsButton.parentNode.removeChild(unifiedExtensionsButton);
        
        // Insert #unified-extensions-button before #personal-bookmarks in #PersonalToolbar
        personalToolbar.insertBefore(unifiedExtensionsButton, personalBookmarks);
    }
}