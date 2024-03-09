// ==UserScript==
// @name        BeautyFox - Favourites Sidebar Button
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createFavouritesSidebarButton() {
    try {
        const button_label = "Open Bookmarks Sidebar";
        CustomizableUI.createWidget({
            id: "bookmarksSidebarButton",
            defaultArea: CustomizableUI.AREA_NAVBAR,
            removable: true,
            label: button_label,
            tooltiptext: button_label,
            onCommand: function () {
                Services.prefs.setBoolPref("sidebar.position_start", false);
                SidebarUI.toggle("viewBookmarksSidebar");
            },
            onCreated: function (button) { return button; },
        });
    }
    catch (e) { Components.utils.reportError(e); }
}