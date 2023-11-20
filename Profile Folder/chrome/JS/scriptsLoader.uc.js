// This is so we can use ctypes later.
const { ctypes } = ChromeUtils.import("resource://gre/modules/ctypes.jsm");

function executeFunctions() {
    openBeautyFoxWizardWindow(true);
    getAndSetTitleBarHeight();
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
    moveExtensionsBtn();
    createCommandBar();
    createCBHomeButton();
    createCBPrintButton();
    createCBReadMailButton()
    downloadsButton();
    convertCheckboxesToNativeLook();
    loadLocale();
    console.info("Functions executed.");
}

window.addEventListener("load", function () {
    executeFunctions();  
})