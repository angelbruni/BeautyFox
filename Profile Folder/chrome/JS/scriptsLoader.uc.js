function executeFunctions() {
    console.log("Found 5 scripts. Attempting to execute.")

    moveTabs();
    console.log("moveTabs() function from tabsOnNavRow executed.")
    urlbarContainerBackgroundOnMouseAttrs()
    console.log("urlbarContainerBackgroundOnMouseAttrs() function from urlbarHoverBackground executed.")
    removeReloadWhenTyping();
    console.log("removeReloadWhenTyping() function from removeReloadBtnTyping executed.")
    addClonedStarBox();
    console.log("addClonedStarBox() function from starBoxPersonalToolbar executed.")
    addEllipsesSearch();
    console.log("addEllipsesSearch() function from addEllipsesSearchPlaceholder executed.")

    console.log("Functions were executed.")
}

window.addEventListener("load", function() {
    executeFunctions();
})

