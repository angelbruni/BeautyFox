const { ctypes } = ChromeUtils.import("resource://gre/modules/ctypes.jsm");

function executeFunctions() {
    getAndSetTitleBarHeight();
    getAndSetUserAccentColor();
    addContainerSupport();
    fixTabs();
    urlbarContainerBackgroundOnMouseAttrs();
    insecureToolbarFieldBackground();
    removeReloadWhenTyping();
    changeFakeDropdownAccordingly();
    addEllipsesSearch();
    createfavouritesSidebarButton();
    moveExtensionsBtn();
    createCommandBar();
    createCBHomeButton();
    createCBPrintButton();
    createCBReadMailButton()
    console.info("Functions executed.");
}

window.addEventListener("load", function() {
    executeFunctions();
})