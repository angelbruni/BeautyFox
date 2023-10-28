var cBToolsMenu = {
    id: 'cBToolsMenu',
    name: 'Tools',
    items: [
        //{
        //    type: 'app',
        //    id: 'cBTools_diagnoseConnectionProblems',
        //    name: 'Diagnose connection problems...',
        //},
        {
            type: 'app',
            id: 'cBTools_reopenLastBrowsingSession',
            name: 'Reopen last browsing session',
            command: 'SessionStore.restoreLastSession();',
        },
        {
            type: 'separator',
        },
        //{
        //    type: 'subdir',
        //    id: 'cBTools_popUpBlocker',
        //    name: 'Pop-up Blocker',
        //    image: 'chrome://browser/skin/notification-icons/popup.svg',
        //    items: [
        //        {
        //            type: 'app',
        //            id: 'cBTools_turnOffPopUpBlocker',
        //            name: 'Turn off Pop-Up Blocker',
        //        },
        //        {
        //            type: 'app',
        //            id: 'cBTools_popUpBlockerSettings',
        //            name: 'Pop-Up Blocker settings',
        //        },
        //    ]
        //},
        {
            type: 'app',
            id: 'cBTools_viewDownloads',
            name: 'View downloads',
            accelText: 'Ctrl+J',
            command: 'BrowserDownloadsUI();',
        },
        {
            type: 'app',
            id: 'cBTools_manageAddOns',
            name: 'Manage add-ons',
            image: 'chrome://devtools/skin/images/debugging-addons.svg',
            command: 'BrowserOpenAddonsMgr();',
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBTools_workOffline',
            name: 'Work offline',
            command: 'BrowserOffline.toggleOfflineStatus();',
        },
        //{
        //    type: 'app',
        //    id: 'cBTools_compatibilityView',
        //    name: 'Compatibility View',
        //},
        //{
        //    type: 'app',
        //    id: 'cBTools_compatibilityViewSettings',
        //    name: 'Compatibility View settings',
        //},
        {
            type: 'app',
            id: 'cBTools_fullScreen',
            name: 'Full screen',
            image: 'chrome://browser/skin/fullscreen.svg',
            accelText: 'F11',
            command: 'BrowserFullScreen();',
        },
        {
            type: 'subdir',
            id: 'cBTools_toolbars',
            name: 'Toolbars',
            items: [
                //{
                //    type: 'app',
                //    id: 'cBTools_menuBar',
                //    name: 'Menu bar',
                //},
                {
                    type: 'app',
                    id: 'cBTools_favoritesBar',
                    name: 'Favorites bar',
                    command: "BookmarkingUI.toggleBookmarksToolbar('shortcut');",
                },
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'cBTools_manageAddOns2',
                    name: 'Manage add-ons',
                    command: 'BrowserOpenAddonsMgr();',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'cBTools_customize',
                    name: 'Customize',
                    command: 'gCustomizeMode.enter();',
                },
            ]
        },
        {
            type: 'subdir',
            id: 'cBTools_explorerBars',
            name: 'Explorer bars',
            items: [
                {
                    type: 'app',
                    id: 'cBTools_favorites',
                    name: 'Favorites',
                    command: "SidebarUI.toggle('viewBookmarksSidebar');",
                },
                {
                    type: 'app',
                    id: 'cBTools_history',
                    name: 'History',
                    command: "SidebarUI.toggle('viewHistorySidebar')",
                },
                {
                    type: 'app',
                    id: 'cBTools_syncedTabs',
                    name: 'Synced tabs',
                    command: "SidebarUI.toggle('viewTabsSidebar');",
                },
            ]
        },
        //{
        //    type: 'separator'
        //},
        //{
        //    type: 'app',
        //    id: 'cBTools_f12DeveloperTools',
        //    name: 'F12 developer tools',
        //    image: 'chrome://global/skin/icons/developer.svg',
        //},
        //{
        //    type: 'separator'
        //},
        //{
        //    type: 'app',
        //    id: 'cBTools_suggestedSites',
        //    name: 'Suggested Sites',
        //},
        {
            type: 'separator'
        },
        {
            type: 'app',
            id: 'cBTools_internetOptions',
            name: 'Internet options',
            image: 'chrome://devtools/skin/images/settings.svg',
            command: 'openPreferences();',
        },
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
        const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    
        var ExternalToolsBtn = document.createElementNS(XULNS, 'toolbarbutton');
        ExternalToolsBtn.id = cBToolsMenu.id + 'Button';
        ExternalToolsBtn.setAttribute("label",  cBToolsMenu.name);
        ExternalToolsBtn.style.listStyleImage = cBToolsMenu.image;
        ExternalToolsBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
        ExternalToolsBtn.setAttribute("type", "menu");
        ExternalToolsBtn.setAttribute("removable", "true");
    
        document.getElementById("nav-bar-customization-target").appendChild(ExternalToolsBtn);
    
        var ExternalToolsPopup = document.createElementNS(XULNS, 'menupopup');
        ExternalToolsPopup.setAttribute('id', cBToolsMenu.id + 'PopUp');
        ExternalToolsPopup.setAttribute('position', 'bottomright topright');
        this._externalAppPopup = ExternalToolsPopup;
        ExternalToolsBtn.appendChild(ExternalToolsPopup);
        cBToolsMenu.onpopupshowing();
    },

    onpopupshowing: function() {
        if (this._isready) return;
        if (this._externalAppPopup === null) return;
        var ExternalToolsPopup = this._externalAppPopup;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.type === 'subdir') {
                var subDirItem = ExternalToolsPopup.appendChild(document.createXULElement('menu'));
                subDirItem.setAttribute('class', 'menu-iconic');
                subDirItem.setAttribute('id', item.id);
                subDirItem.setAttribute('label', item.name);
                subDirItem.setAttribute('image', item.image);

                var subDirPopup = document.createXULElement('menupopup');
                for (var j = 0; j < item.items.length; j++) {
                    var subItem = item.items[j];
                    if (subItem.type === 'app') {
                        var appItem = document.createXULElement('menuitem');
                        appItem.setAttribute('class', 'menuitem-iconic');
                        appItem.setAttribute('label', subItem.name);
                        appItem.setAttribute('id', subItem.id);
                        appItem.setAttribute('image', subItem.image);
                        appItem.setAttribute('oncommand', subItem.command);

                        if (subItem.accelText) {
                            appItem.setAttribute('acceltext', subItem.accelText);
                        }

                        subDirPopup.appendChild(appItem);
                    } else if (subItem.type === 'separator') {
                        subDirPopup.appendChild(document.createXULElement('menuseparator'));
                    }
                }

                subDirItem.appendChild(subDirPopup);
                ExternalToolsPopup.appendChild(subDirItem);
            } else if (item.type === 'app') {
                var appsItems = document.createXULElement('menuitem');
                appsItems.setAttribute('class', 'menuitem-iconic');
                appsItems.setAttribute('id', item.id);
                appsItems.setAttribute('label', item.name);
                appsItems.setAttribute('image', item.image);
                appsItems.setAttribute('oncommand', item.command);

                if (item.accelText) {
                    appsItems.setAttribute('acceltext', item.accelText)
                }

                ExternalToolsPopup.appendChild(appsItems);
            } else if (item.type === 'separator') {
                ExternalToolsPopup.appendChild(document.createXULElement('menuseparator'));
            }
        }

        this._isready = true;
    },

    getAllApps: function() {
        var apps = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].type === 'app') {
                apps.push(this.items[i]);
            } else if (this.items[i].type === 'subdir') {
                apps = apps.concat(this.items[i].items.filter(item => item.type === 'app'));
            }
        }
        return apps;
    },
};

cBToolsMenu.init();

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}