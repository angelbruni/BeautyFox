var IEMenu = {
    items: [
        {
            type: 'app',
            id: 'IEMenu_print',
            name: 'Print',
            accelText: 'Ctrl+P',
            command: 'PrintUtils.togglePrintPreview(gBrowser.selectedBrowser.browsingContext);'
        },
        //{
        //    type: 'subdir',
        //    id: 'IEMenu_print',
        //    name: 'Print',
        //    items: []
        //},
        {
            type: 'subdir',
            id: 'IEMenu_file',
            name: 'File',
            items: [
                {
                    type: 'app',
                    id: 'IEMenu_fullScreen',
                    name: 'Full screen',
                    accelText: 'F11',
                    command: 'BrowserFullScreen();',
                },
                {
                    type: 'app',
                    id: 'IEMenu_saveAs',
                    name: 'Save as...',
                    accelText: 'Ctrl+S',
                    command: 'saveBrowser(gBrowser.selectedBrowser);',
                },
                {
                    type: 'app',
                    id: 'IEMenu_find',
                    name: 'Find on this page',
                    accelText: 'Ctrl+F',
                    command: "gLazyFindCommand('onFindCommand')"
                },
                {
                    type: 'app',
                    id: 'IEMenu_caretBrowsing',
                    name: 'Caret browsing',
                    accelText: 'F7',
                    command: 'gBrowser.toggleCaretBrowsing()',
                },
            ]
        },
        {
            type: 'subdir',
            id: 'IEMenu_zoom',
            name: 'Zoom',
            items: [
                {
                    type: 'app',
                    id: 'IEMenu_zoomIn',
                    name: 'Zoom in',
                    accelText: 'Ctrl +',
                    command: 'FullZoom.enlarge()',
                },
                {
                    type: 'app',
                    id: 'IEMenu_zoomOut',
                    name: 'Zoom out',
                    accelText: 'Ctrl -',
                    command: 'FullZoom.reduce()',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'IEMenu_setZoom400',
                    name: '400%',
                    command: 'FullZoom.setZoom(4)',
                },
                {
                    type: 'app',
                    id: 'IEMenu_setZoom200',
                    name: '200%',
                    command: 'FullZoom.setZoom(2)',
                },
                {
                    type: 'app',
                    id: 'IEMenu_setZoom150',
                    name: '150%',
                    command: 'FullZoom.setZoom(1.5)',
                },
                {
                    type: 'app',
                    id: 'IEMenu_setZoom125',
                    name: '125%',
                    command: 'FullZoom.setZoom(1.25)',
                },
                {
                    type: 'app',
                    id: 'IEMenu_setZoom100',
                    name: '100%',
                    accelText: 'Ctrl + 0',
                    command: 'FullZoom.setZoom(1)',
                },
                {
                    type: 'app',
                    id: 'IEMenu_setZoom075',
                    name: '75%',
                    command: 'FullZoom.setZoom(.75)',
                },
                {
                    type: 'app',
                    id: 'IEMenu_setZoom050',
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
            id: 'IEMenu_safety',
            name: 'Safety',
            items: [
                {
                    type: 'app',
                    id: 'IEMenu_deleteBrowsingHistory',
                    name: 'Delete browsing history...',
                    accelText: 'Ctrl + Shift + Del',
                    command: 'Sanitizer.showUI(window);',
                },
                {
                    type: 'app',
                    id: 'IEMenu_inPrivateBrowsing',
                    name: 'InPrivate Browsing',
                    accelText: 'Ctrl + Shift + P',
                    command: 'OpenBrowserWindow({private: true});',
                },
                {
                    type: 'app',
                    id: 'IEMenu_trackingProtection',
                    name: 'Tracking Protection...',
                    command: 'gProtectionsHandler.openPreferences()',
                },
                //{
                //    type: 'app',
                //    id: 'IEMenu_activeXFiltering',
                //    name: 'ActiveX Filtering',
                //},
                //{
                //    type: 'app',
                //    id: 'IEMenu_webpagePrivacyPolicy',
                //    name: 'Webpage privacy policy...',
                //},
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'IEMenu_reportUnsafeWebsite',
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
            id: 'IEMenu_viewDownloads',
            name: 'View downloads',
            accelText: 'Ctrl + J',
            command: 'BrowserDownloadsUI();',
        },
        {
            type: 'app',
            id: 'IEMenu_manageAddOns',
            name: 'Manage add-ons',
            command: 'BrowserOpenAddonsMgr();',
        },
        //{
        //    type: 'app',
        //    id: 'IEMenu_f12DeveloperIEMenu',
        //    name: 'F12 developer tools',
        //    image: 'chrome://global/skin/icons/developer.svg',
        //},
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'IEMenu_beautyFoxOptions',
            name: 'BeautyFox options',
            command: 'openBeautyFoxWizardWindow(false);',
        },
        {
            type: 'separator'
        },
        {
            type: 'app',
            id: 'IEMenu_internetOptions',
            name: 'Internet options',
            command: 'openPreferences();',
        },
        {
            type: 'app',
            id: 'IEMenu_aboutInternetExplorer',
            name: 'About Internet Explorer',
            command: 'openAboutIE();',
        },
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
        const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    
        var ExternalIEMenuBtn = document.createElementNS(XULNS, 'toolbarbutton');
        ExternalIEMenuBtn.id = "IEMenuButton";
        ExternalIEMenuBtn.className = 'toolbarbutton-1';
        ExternalIEMenuBtn.setAttribute("label", "Internet Explorer Menu");
        ExternalIEMenuBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
        ExternalIEMenuBtn.setAttribute("type", "menu");
        ExternalIEMenuBtn.setAttribute("removable", "true");
    
        document.getElementById("nav-bar-customization-target").appendChild(ExternalIEMenuBtn);
    
        var ExternalIEMenuPopup = document.createElementNS(XULNS, 'menupopup');
        ExternalIEMenuPopup.setAttribute('id', 'IEMenuPopUp');
        ExternalIEMenuPopup.setAttribute('position', 'bottomright topright');
        this._externalAppPopup = ExternalIEMenuPopup;
        ExternalIEMenuBtn.appendChild(ExternalIEMenuPopup);
        IEMenu.onpopupshowing();
    },

    onpopupshowing: function() {
        if (this._isready) return;
        if (this._externalAppPopup === null) return;
        var ExternalIEMenuPopup = this._externalAppPopup;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.type === 'subdir') {
                var subDirItem = ExternalIEMenuPopup.appendChild(document.createXULElement('menu'));
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
                ExternalIEMenuPopup.appendChild(subDirItem);
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

                ExternalIEMenuPopup.appendChild(appsItems);
            } else if (item.type === 'separator') {
                ExternalIEMenuPopup.appendChild(document.createXULElement('menuseparator'));
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

IEMenu.init();

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}
