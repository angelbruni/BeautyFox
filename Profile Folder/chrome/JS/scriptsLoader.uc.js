function executeFunctions() {
    console.info("Found 8 scripts. Attempting to execute.");

    addContainerSupport();
    console.log("addContainerSupport() function from containerSupport executed.");
    moveTabs();
    console.log("moveTabs() function from tabsOnNavRow executed.");
    urlbarContainerBackgroundOnMouseAttrs();
    console.log("urlbarContainerBackgroundOnMouseAttrs() function from urlbarHoverBackground executed.");
    insecureToolbarFieldBackground();
    console.log("insecureToolbarFieldBackground() function from insecureToolbarFieldBackground executed.");
    removeReloadWhenTyping();
    console.log("removeReloadWhenTyping() function from removeReloadBtnTyping executed.");
    addClonedStarBox();
    console.log("addClonedStarBox() function from starBoxPersonalToolbar executed.");
    changeFakeDropdownAccordingly();
    console.log("changeFakeDropdownAccordingly() function from searchBoxDetector executed.");
    addEllipsesSearch();
    console.log("addEllipsesSearch() function from addEllipsesSearchPlaceholder executed.");

    console.info("Functions were executed.");
}

window.addEventListener("load", function() {
    executeFunctions();
})

