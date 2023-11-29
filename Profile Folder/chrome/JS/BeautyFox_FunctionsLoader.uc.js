// ==UserScript==
// @name			BeautyFox Functions Loader
// @description 	Loads functions after "load" so no issues arise.
// @author			AngelBruni
// ==/UserScript==

// This is so we can use ctypes later.
const { ctypes } = ChromeUtils.import("resource://gre/modules/ctypes.jsm");

function executeFunctions() {
    openBeautyFoxWizardWindow(true);
    getAndSetUserAccentColor();
    setnavButtonsRadius();
    createFeedbackButton();
    addContainerSupport();
    fixTabs();
    urlbarContainerBackgroundOnMouseAttrs();
    insecureToolbarFieldBackground();
    removeReloadWhenTyping();
    changeFakeDropdownAccordingly();
    addEllipsesSearch();
    insertMSEdgeNewTabButton();
    createFavouritesSidebarButton();
    createAddToBookmarksBarButton()
    moveExtensionsBtn();
    createCBHomeButton();
    createCBPrintButton();
    createCBReadMailButton()
    downloadsButton();
    convertCheckboxesToNativeLook();
    createFakeTitlebarSpace();
    setZoomLevelLabel();
    loadLocale();
    console.info("Functions executed.");
}

window.addEventListener("load", function () {
    executeFunctions();  
})