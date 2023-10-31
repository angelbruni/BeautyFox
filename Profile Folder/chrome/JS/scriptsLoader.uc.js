const { ctypes } = ChromeUtils.import("resource://gre/modules/ctypes.jsm");

function executeFunctions() {
    getAndSetTitleBarHeight();
    getAndSetUserAccentColor();
    createFeedbackButton();
    addContainerSupport();
    fixTabs();
    urlbarContainerBackgroundOnMouseAttrs();
    insecureToolbarFieldBackground();
    removeReloadWhenTyping();
    changeFakeDropdownAccordingly();
    addEllipsesSearch();
    createFavouritesSidebarButton();
    moveExtensionsBtn();
    createCommandBar();
    createCBHomeButton();
    createCBPrintButton();
    createCBReadMailButton()
    //openManageAddons()
    console.info("Functions executed.");
}

window.addEventListener("load", function() {
    executeFunctions();
})