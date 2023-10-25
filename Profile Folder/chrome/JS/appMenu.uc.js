var appMenu = {
    autohideEmptySubDirs: true,
    moveSubDirstoBottom: false,
    items: [
        {
            type: 'subdir',
            id: 'appMenu_print',
            name: 'Print',
            items: [
                //{
                //    type: 'app',
                //    id: 'appMenu_turnOffPopUpBlocker',
                //    name: 'Turn off Pop-Up Blocker',
                //},
            ]
        },
        {
            type: 'subdir',
            id: 'appMenu_file',
            name: 'File',
            items: [
                //{
                //    type: 'app',
                //    id: 'appMenu_turnOffPopUpBlocker',
                //    name: 'Turn off Pop-Up Blocker',
                //},
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
                    command: 'FullZoom.enlarge()',
                },
                {
                    type: 'app',
                    id: 'appMenu_zoomOut',
                    name: 'Zoom out',
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
                    command: 'Sanitizer.showUI(window);',
                },
                {
                    type: 'app',
                    id: 'appMenu_inPrivateBrowsing',
                    name: 'InPrivate Browsing',
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
            command: 'openAboutDialog();',
        },
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
        this.handleRelativePath(this.getAllApps());
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
                ExternalappMenuPopup.appendChild(appsItems);
            } else if (item.type === 'separator') {
                ExternalappMenuPopup.appendChild(document.createXULElement('menuseparator'));
            }
        }
    
        if (this.autohideEmptySubDirs) {
            for (var i = 0; i < ExternalappMenuPopup.childNodes.length; i++) {
                var childNode = ExternalappMenuPopup.childNodes[i];
                if (childNode.localName === 'menu' && !childNode.hasChildNodes()) {
                    childNode.setAttribute('hidden', 'true');
                }
            }
        }
    
        if (this.moveSubDirstoBottom) {
            let i = ExternalappMenuPopup.childNodes.length;
            while (i-- !== 0) {
                if (ExternalappMenuPopup.firstChild.localName === 'menu') {
                    ExternalappMenuPopup.appendChild(ExternalappMenuPopup.firstChild);
                } else {
                    break;
                }
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

    handleRelativePath: function(apps) {
        for (var i = 0; i < apps.length; i++) {
            if (apps[i].path) {
                apps[i].path = apps[i].path.replace(/\//g, '\\').toLocaleLowerCase();
                var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path;
                if (/^(\\)/.test(apps[i].path)) {
                    apps[i].path = ffdir + apps[i].path;
                }
            }
        }
    },

    exec: function(path, args) {
        args = args || [];
        var args_t = args.slice(0);
        for (var i = 0; i < args_t.length; i++) {
            args_t[i] = args_t[i].replace(/%u/g, gBrowser.currentURI.spec);
        }

        var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile);
        file.initWithPath(path);
        if (!file.exists()) {
            alert('Datei nicht gefunden: ' + path);
            return;
        }

        if (!file.isExecutable()) {
            file.launch();
        } else {
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            process.init(file);
            process.run(false, args_t, args_t.length);
        }
    },
};

appMenu.init();

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}