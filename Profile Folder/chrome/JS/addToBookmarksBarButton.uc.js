function createAddToBookmarksBarButton() {
    try {
        var buttonText = "Add to Favorites Bar";
    
        CustomizableUI.createWidget({
            id: "addToBookmarksBarButton",
            defaultArea: CustomizableUI.AREA_BOOKMARKS,
            removable: true,
            label: buttonText,
            tooltiptext: buttonText,
            onClick: function() {
                addToBookmarksBar();
            },
            onCreated: function(button) {
                return button;
            },
        });
    }
    catch (e) {
        Components.utils.reportError(e);
    }
}

function addToBookmarksBar() {
    var bookmarksSvc = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService);
    bookmarksSvc.insertBookmark(3, gBrowser.currentURI, bookmarksSvc.DEFAULT_INDEX, window.document.title);
}