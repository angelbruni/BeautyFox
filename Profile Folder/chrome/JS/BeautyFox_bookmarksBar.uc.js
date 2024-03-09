// ==UserScript==
// @name	    BeautyFox - Bookmarks Bar
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createAddToBookmarksBarButton() {
    try {
        const buttonText = "Add to Favourites Bar";
        CustomizableUI.createWidget({
            id: "addToBookmarksBarButton",
            defaultArea: CustomizableUI.AREA_BOOKMARKS,
            removable: true,
            label: buttonText,
            tooltiptext: buttonText,
            onCommand: function () { addToBookmarksBar(); },
            onCreated: function (button) { return button; },
        });
    }
    catch (e) { Components.utils.reportError(e); }
}

function addToBookmarksBar() {
    const bookmarksSvc = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService);
    bookmarksSvc.insertBookmark(3, gBrowser.currentURI, bookmarksSvc.DEFAULT_INDEX, gBrowser.selectedTab._fullLabel);
}

function updateBookmarkAppearance() {
	const personalToolbar = document.getElementById('PersonalToolbar');
	const attr = 'bookmarkitemwidth';
    switch (pref('BeautyFox.option.storedBookmarItemTitleWidthChoice').tryGet.int()) {
		case 0:
			personalToolbar.removeAttribute(attr)
			break;
		case 1:
			personalToolbar.setAttribute(attr, 'small')
			break;
		case 2:
			personalToolbar.setAttribute(attr, 'icons')
			break;
	}
}