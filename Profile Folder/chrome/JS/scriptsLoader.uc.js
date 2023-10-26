function openBeautyFoxWizardWindow() {
    var features = "chrome,centerscreen,resizeable=no,dependent";

    window.openDialog('chrome://userchrome/content/windows/firstStartup/firstStartup.xhtml', "First startup", features); 
}

function executeFunctions() {
    console.info("Found 12 functions. Attempting to execute.");

    addContainerSupport();
    console.log("addContainerSupport() function executed.");
    moveTabs();
    console.log("moveTabs() function executed.");
    urlbarContainerBackgroundOnMouseAttrs();
    console.log("urlbarContainerBackgroundOnMouseAttrs() function executed.");
    insecureToolbarFieldBackground();
    console.log("insecureToolbarFieldBackground() function executed.");
    removeReloadWhenTyping();
    console.log("removeReloadWhenTyping() function executed.");
    changeFakeDropdownAccordingly();
    console.log("changeFakeDropdownAccordingly() function executed.");
    addEllipsesSearch();
    console.log("addEllipsesSearch() function executed.");
    createfavouritesSidebarButton();
    console.log("createfavouritesSidebarButton() function executed.");
    createCommandBar();
    console.log("createCommandBar() function executed.");
    createCBHomeButton();
    console.log("createCBHomeButton() function executed.");
    createCBPrintButton();
    console.log("createCBPrintButton() function executed.");
    createCBReadMailButton()
    console.log("createCBReadMailButton() function executed.");
    console.info("Functions were executed.");
}

window.addEventListener("load", function() {
    executeFunctions();
})