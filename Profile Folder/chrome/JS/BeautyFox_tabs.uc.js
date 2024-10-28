// ==UserScript==
// @name			BeautyFox - Tabs
// @author			AngelBruni
// @include			main
// ==/UserScript==

class bfTabs {
	static closeCurrent() {
		gBrowser.removeTab(gBrowser.selectedTab);
	}
}

UC_API.Runtime.startupFinished().then(()=>{
	// TabToolbar
	document.querySelector("#toolbar-menubar > .titlebar-buttonbox-container").remove();

	const tabsToolbarElm = document.querySelector("#TabsToolbar");
	document.getElementById("titlebar").appendChild(tabsToolbarElm.querySelector(".titlebar-buttonbox-container"));
	gkInsertElm.after(document.getElementById("TabsToolbar"), document.getElementById("nav-bar"));

	tabsToolbarElm.querySelectorAll(".titlebar-spacer").forEach(spacer => {
		spacer.remove()
	});
});