function createfavouritesSidebarButton() {
    try {
        var button_label = "Open Bookmarks Sidebar";
    
        CustomizableUI.createWidget({
            id: "bookmarks-sidebar-menu-button",
            defaultArea: CustomizableUI.AREA_NAVBAR,
            removable: true,
            label: button_label,
            tooltiptext: button_label,
            onClick: function() {
                openBookmarksSidebar();
            },
            onCreated: function(button) {
                return button;
            },
        });
    }
    catch (e) {
        Components.utils.reportError(e);
    }
    
    function openBookmarksSidebar() {
        if (window.SidebarUI) {
             window.SidebarUI.toggle("viewBookmarksSidebar");
        }
    }
}