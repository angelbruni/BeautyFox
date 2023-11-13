function moveExtensionsBtn() {
    // Get the elements
    var unifiedExtensionsButton = document.getElementById('unified-extensions-button');
    var personalBookmarks = document.getElementById('personal-bookmarks');
    var personalToolbar = document.getElementById('PersonalToolbar');
    var endToolbar = document.getElementById('endToolbar');
    var IEMenuButton = document.getElementById('IEMenuButton');

    // Check if the button exist on the page
    if (unifiedExtensionsButton) {
        // Check if the elements exist on the page
        if (Services.prefs.getBoolPref('BeautyFox.option.moveToEndToolbar', true)) {
            if (endToolbar) {
                // Remove #unified-extensions-button from its current position
                unifiedExtensionsButton.parentNode.removeChild(unifiedExtensionsButton);
                
                // Insert #unified-extensions-button before #personal-bookmarks in #PersonalToolbar
                endToolbar.insertBefore(unifiedExtensionsButton, IEMenuButton);
            }
        } else {
            if (personalBookmarks && personalToolbar) {
                // Remove #unified-extensions-button from its current position
                unifiedExtensionsButton.parentNode.removeChild(unifiedExtensionsButton);
                
                // Insert #unified-extensions-button before #personal-bookmarks in #PersonalToolbar
                personalToolbar.insertBefore(unifiedExtensionsButton, personalBookmarks);
            }
        }
    }
}