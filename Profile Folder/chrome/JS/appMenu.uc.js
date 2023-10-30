var appMenu = {
    items: [
        {
            type: 'app',
            id: 'appMenu_print',
            name: 'Print',
            accelText: 'Ctrl+P',
            command: 'PrintUtils.togglePrintPreview(gBrowser.selectedBrowser.browsingContext);'
        },
        //{
        //    type: 'subdir',
        //    id: 'appMenu_print',
        //    name: 'Print',
        //    items: []
        //},
        {
            type: 'subdir',
            id: 'appMenu_file',
            name: 'File',
            items: [
                {
                    type: 'app',
                    id: 'appMenu_fullScreen',
                    name: 'Full screen',
                    accelText: 'F11',
                    command: 'BrowserFullScreen();',
                },
                {
                    type: 'app',
                    id: 'appMenu_saveAs',
                    name: 'Save as...',
                    accelText: 'Ctrl+S',
                    command: 'saveBrowser(gBrowser.selectedBrowser);',
                },
                {
                    type: 'app',
                    id: 'appMenu_find',
                    name: 'Find on this page',
                    accelText: 'Ctrl+F',
                    command: "gLazyFindCommand('onFindCommand')"
                },
                {
                    type: 'app',
                    id: 'appMenu_caretBrowsing',
                    name: 'Caret browsing',
                    accelText: 'F7',
                    command: 'gBrowser.toggleCaretBrowsing()',
                },
            ]
        },
        {
            type: 'subdir',
            id: 'appMenu_zoom',
            name: 'Zoom',
            items: [
                {
                    type: 'app',
                    id: 'appMenu_zoomIn',
                    name: 'Zoom in',
                    accelText: 'Ctrl +',
                    command: 'FullZoom.enlarge()',
                },
                {
                    type: 'app',
                    id: 'appMenu_zoomOut',
                    name: 'Zoom out',
                    accelText: 'Ctrl -',
                    command: 'FullZoom.reduce()',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'appMenu_setZoom400',
                    name: '400%',
                    command: 'FullZoom.setZoom(4)',
                },
                {
                    type: 'app',
                    id: 'appMenu_setZoom200',
                    name: '200%',
                    command: 'FullZoom.setZoom(2)',
                },
                {
                    type: 'app',
                    id: 'appMenu_setZoom150',
                    name: '150%',
                    command: 'FullZoom.setZoom(1.5)',
                },
                {
                    type: 'app',
                    id: 'appMenu_setZoom125',
                    name: '125%',
                    command: 'FullZoom.setZoom(1.25)',
                },
                {
                    type: 'app',
                    id: 'appMenu_setZoom100',
                    name: '100%',
                    accelText: 'Ctrl + 0',
                    command: 'FullZoom.setZoom(1)',
                },
                {
                    type: 'app',
                    id: 'appMenu_setZoom075',
                    name: '75%',
                    command: 'FullZoom.setZoom(.75)',
                },
                {
                    type: 'app',
                    id: 'appMenu_setZoom050',
                    name: '50%',
                    command: 'FullZoom.reduce(.5)',
                },
                //{
                //    type: 'separator',
                //},
                //{
                //    type: 'app',
                //    name: 'Custom...',
                //    command: 'FullZoom.reduce()',
                //},
            ],
        },
        {
            type: 'subdir',
            id: 'appMenu_safety',
            name: 'Safety',
            items: [
                {
                    type: 'app',
                    id: 'appMenu_deleteBrowsingHistory',
                    name: 'Delete browsing history...',
                    accelText: 'Ctrl + Shift + Del',
                    command: 'Sanitizer.showUI(window);',
                },
                {
                    type: 'app',
                    id: 'appMenu_inPrivateBrowsing',
                    name: 'InPrivate Browsing',
                    accelText: 'Ctrl + Shift + P',
                    command: 'OpenBrowserWindow({private: true});',
                },
                {
                    type: 'app',
                    id: 'appMenu_trackingProtection',
                    name: 'Tracking Protection...',
                    command: 'gProtectionsHandler.openPreferences()',
                },
                //{
                //    type: 'app',
                //    id: 'appMenu_activeXFiltering',
                //    name: 'ActiveX Filtering',
                //},
                //{
                //    type: 'app',
                //    id: 'appMenu_webpagePrivacyPolicy',
                //    name: 'Webpage privacy policy...',
                //},
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'appMenu_reportUnsafeWebsite',
                    name: 'Report unsafe website',
                    command: 'reportUnsafeWebsite();',
                },
            ]
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'appMenu_viewDownloads',
            name: 'View downloads',
            accelText: 'Ctrl + J',
            command: 'BrowserDownloadsUI();',
        },
        {
            type: 'app',
            id: 'appMenu_manageAddOns',
            name: 'Manage add-ons',
            command: 'BrowserOpenAddonsMgr();',
        },
        //{
        //    type: 'app',
        //    id: 'appMenu_f12DeveloperappMenu',
        //    name: 'F12 developer tools',
        //    image: 'chrome://global/skin/icons/developer.svg',
        //},
        {
            type: 'separator'
        },
        {
            type: 'app',
            id: 'appMenu_internetOptions',
            name: 'Internet options',
            command: 'openPreferences();',
        },
        {
            type: 'app',
            id: 'appMenu_aboutInternetExplorer',
            name: 'About Internet Explorer',
            command: 'openFakeIEAbout();',
        },
        {
            type: 'app',
            id: 'appMenu_aboutInternetExplorerIE11Win10',
            name: 'About Internet Explorer',
            command: 'callShellAboutWIE();',
        },
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
        const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    
        var ExternalappMenuBtn = document.createElementNS(XULNS, 'toolbarbutton');
        ExternalappMenuBtn.id = "appMenuButton";
        ExternalappMenuBtn.className = 'toolbarbutton-1';
        ExternalappMenuBtn.setAttribute("label", "appMenu");
        ExternalappMenuBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
        ExternalappMenuBtn.setAttribute("type", "menu");
        ExternalappMenuBtn.setAttribute("removable", "true");
    
        document.getElementById("nav-bar-customization-target").appendChild(ExternalappMenuBtn);
    
        var ExternalappMenuPopup = document.createElementNS(XULNS, 'menupopup');
        ExternalappMenuPopup.setAttribute('id', 'appMenuPopUp');
        ExternalappMenuPopup.setAttribute('position', 'bottomright topright');
        this._externalAppPopup = ExternalappMenuPopup;
        ExternalappMenuBtn.appendChild(ExternalappMenuPopup);
        appMenu.onpopupshowing();
    },

    onpopupshowing: function() {
        if (this._isready) return;
        if (this._externalAppPopup === null) return;
        var ExternalappMenuPopup = this._externalAppPopup;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.type === 'subdir') {
                var subDirItem = ExternalappMenuPopup.appendChild(document.createXULElement('menu'));
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
                ExternalappMenuPopup.appendChild(subDirItem);
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

                ExternalappMenuPopup.appendChild(appsItems);
            } else if (item.type === 'separator') {
                ExternalappMenuPopup.appendChild(document.createXULElement('menuseparator'));
            }
        }
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

appMenu.init();

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}