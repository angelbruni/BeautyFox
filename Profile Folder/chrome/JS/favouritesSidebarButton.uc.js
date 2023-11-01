function createFavouritesSidebarButton() {
    try {
        var button_label = "Open Bookmarks Sidebar";
    
        CustomizableUI.createWidget({
            id: "bookmarksSidebarButton",
            defaultArea: CustomizableUI.AREA_NAVBAR,
            removable: true,
            label: button_label,
            tooltiptext: button_label,
            onClick: function() {
                SidebarUI.toggle('viewBookmarksSidebar');
            },
            onCreated: function(button) {
                return button;
            },
        });
    }
    catch (e) {
        Components.utils.reportError(e);
    }
}