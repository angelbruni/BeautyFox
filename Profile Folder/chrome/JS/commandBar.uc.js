function createCommandBar() {
    try {
        CustomizableUI.createWidget({
            id: 'commandBarContainer',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_BOOKMARKS,
            removable: true,
            onBuild: function(aDocument) {
                var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbaritem');
        
                var props = {
                    id: 'commandBarContainer', //id in dom // SHOULD match id of that in cui.jsm (Line #2)
                    title: 'Command Bar',
                    align: 'center',
                    pack: 'center',
                    mousethrough: 'always',
                    removable: 'true',
                    sdkstylewidget: 'true',
                    overflows: false
                };
                for (var p in props) {
                    toolbaritem.setAttribute(p, props[p]);
                }
                
                return toolbaritem;
            }
        });
    }
    catch (e) {
        Components.utils.reportError(e);
    }
}

function createCBHomeButton() {
    try {
        var cbHomeButtonLabel = "Home";

        CustomizableUI.createWidget({
            id: 'cBHomeButton',
            defaultArea: CustomizableUI.AREA_BOOKMARKS,
            removable: true,
            label: cbHomeButtonLabel,
            tooltiptext: cbHomeButtonLabel,
            onCommand: function() {
                BrowserHome(event);
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

function createCBPrintButton() {
    try {
        var cbPrintButtonLabel = "Print";

        CustomizableUI.createWidget({
            id: 'cBPrintButton',
            defaultArea: CustomizableUI.AREA_BOOKMARKS,
            removable: true,
            label: cbPrintButtonLabel,
            tooltiptext: cbPrintButtonLabel,
            onCommand: function() {
                PrintUtils.togglePrintPreview(gBrowser.selectedBrowser.browsingContext);
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

function createCBReadMailButton() {
    try {
        var cbReadMailButtonLabel = "Read mail";

        CustomizableUI.createWidget({
            id: 'cBReadMailButton',
            defaultArea: CustomizableUI.AREA_BOOKMARKS,
            removable: true,
            label: cbReadMailButtonLabel,
            tooltiptext: cbReadMailButtonLabel,
            onCommand: function() {
                _ucUtils.loadURI(window,{
                    url: 'mailto:',
                    where: "tab"
                });;
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

var cBHelpMenu = {
    id: 'cBHelpMenu',
    image: 'url(chrome://global/skin/icons/help.svg)',
    name: 'Help',
    items: [
        {
            type: 'app',
            id: 'cBHelp_internetExplorerHelp',
            name: 'Internet Explorer Help',
            accelText: 'F1',
            command: "openHelpLink('firefox-help');",
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBHelp_whatsNewInBeautyFox',
            name: "What's new in BeautyFox Beta 3.2",
            command: "_ucUtils.loadURI(window,{url: 'chrome://userchrome/content/temppages/whats-new.html',where: 'tab'});"
        },
        {
            type: 'app',
            id: 'cBHelp_onlineSupport',
            name: 'Online support',
            command: "_ucUtils.loadURI(window,{url: 'chrome://userchrome/content/temppages/discord-invite.html',where: 'tab'});"
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBHelp_aboutInternetExplorer',
            name: 'About Internet Explorer',
            command: 'openFakeIEAbout();',
        },
        {
            type: 'app',
            id: 'cBHelp_aboutInternetExplorerIE11Win10',
            name: 'About Internet Explorer',
            command: 'callShellAboutWIE();',
        },
        {
            type: 'app',
            id: 'appMenu_internetOptions',
            name: 'Internet options',
            command: 'openPreferences();',
        },
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
        this.handleRelativePath(this.getAllApps());
        const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    
        var ExternalHelpBtn = document.createElementNS(XULNS, 'toolbarbutton');
        ExternalHelpBtn.id = cBHelpMenu.id + 'Button';
        ExternalHelpBtn.setAttribute("label", cBHelpMenu.name);
        ExternalHelpBtn.style.listStyleImage = cBHelpMenu.image;
        ExternalHelpBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
        ExternalHelpBtn.setAttribute("type", "menu");
        ExternalHelpBtn.setAttribute("removable", "true");
    
        document.getElementById("nav-bar-customization-target").appendChild(ExternalHelpBtn);
    
        var ExternalHelpPopup = document.createElementNS(XULNS, 'menupopup');
        ExternalHelpPopup.setAttribute('id', cBHelpMenu.id + 'PopUp');
        ExternalHelpPopup.setAttribute('position', 'bottomright topright');
        this._externalAppPopup = ExternalHelpPopup;
        ExternalHelpBtn.appendChild(ExternalHelpPopup);
        cBHelpMenu.onpopupshowing();
    },

    onpopupshowing: function() {
        if (this._isready) return;
        if (this._externalAppPopup === null) return;
        var ExternalHelpPopup = this._externalAppPopup;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.type === 'subdir') {
                var subDirItem = ExternalHelpPopup.appendChild(document.createXULElement('menu'));
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
                ExternalHelpPopup.appendChild(subDirItem);
            } else if (item.type === 'app') {
                var appsItems = document.createXULElement('menuitem');
                appsItems.setAttribute('class', 'menuitem-iconic');
                appsItems.setAttribute('id', item.id);
                appsItems.setAttribute('label', item.name);
                appsItems.setAttribute('image', item.image);
                if (item.path !== undefined && item.path !== null) {
                    var escapedPath = item.path.replace(/\\/g, '\\\\'); // Escape backslashes in item.path
                    
                    // Check if item.args is defined, if not, set it to an empty array
                    var argsToEscape = item.args || [];
                
                    // Escape backslashes in each arg and create escapedArgs
                    var escapedArgs = JSON.stringify(argsToEscape.map(arg => arg.replace(/\\/g, '\\\\')));
                    
                    appsItems.setAttribute('oncommand', 'cBHelpMenu.exec("' + escapedPath + '", ' + escapedArgs + ');');
                } else {
                    console.error('item.path is undefined or null:', item);
                    appsItems.setAttribute('oncommand', item.command);
                }

                if (item.accelText) {
                    appsItems.setAttribute('acceltext', item.accelText)
                }
                
                ExternalHelpPopup.appendChild(appsItems);
            } else if (item.type === 'separator') {
                ExternalHelpPopup.appendChild(document.createXULElement('menuseparator'));
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

    handleRelativePath: function(items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].path) {
                items[i].path = items[i].path.replace(/\//g, '\\').toLocaleLowerCase();
                var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path;
                if (/^(\\)/.test(items[i].path)) {
                    items[i].path = ffdir + items[i].path;
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
            alert('File not found: ' + path);
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
cBHelpMenu.init();

var cBPageMenu = {
    id: 'cBPageMenu',
    name: 'Page',
    items: [
        {
            type: 'app',
            id: 'cBPage_newWindow',
            name: 'New Window',
            image: 'chrome://browser/skin/window.svg',
            accelText: 'Ctrl+N',
            command: 'OpenBrowserWindow();',
        },
        //{
        //    type: 'app',
        //    name: 'Add site to Start Menu',
        //},
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBPage_cut',
            name: 'Cut',
            image: 'chrome://browser/skin/edit-cut.svg',
            accelText: 'Ctrl+X',
            command: "goDoCommand('cmd_cut')"
        },
        {
            type: 'app',
            id: 'cBPage_copy',
            name: 'Copy',
            image: 'chrome://devtools/skin/images/copy.svg',
            accelText: 'Ctrl+C',
            command: "goDoCommand('cmd_copy')"
        },
        {
            type: 'app',
            id: 'cBPage_paste',
            name: 'Paste',
            image: 'chrome://browser/skin/edit-paste.svg',
            accelText: 'Ctrl+V',
            command: "goDoCommand('cmd_paste')"
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBPage_eMailWindowsLive',
            name: 'E-mail with Windows Live',
            command: 'mailWithWindowsLive()'
        },
        //{
        //    type: 'app',
        //    name: 'Translate with Bing',
        //},
        {
            type: 'app',
            id: 'cBPage_googleTranslate',
            name: 'Translate with Google',
            command: 'translatePage()',
        },
        {
            type: 'separator',
        },
        {
            type: 'subdir',
            id: 'cBPage_allAccelerators',
            name: 'All Accelerators',
            items: [
                {
                    type: 'app',
                    id: 'cBPage_findMoreAccelerators',
                    name: 'Find more Accelerators',
                    command: 'findMoreAccelerators();',
                },
                {
                    type: 'app',
                    id: 'cBPage_manageAccelerators',
                    name: 'Manage Accelerators...',
                    command: 'BrowserOpenAddonsMgr();',
                }
            ],
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBPage_saveAs',
            name: 'Save as...',
            image: 'chrome://browser/skin/save.svg',
            accelText: 'Ctrl+S',
            command: 'saveBrowser(gBrowser.selectedBrowser);',
        },
        //{
        //    type: 'app',
        //    name: 'Send page by e-mail...',
        //},
        {
            type: 'app',
            id: 'cBPage_sendLinkbyEMail',
            name: 'Send link by e-mail...',
            image: 'chrome://browser/skin/mail.svg',
            command: 'MailIntegration.sendLinkForBrowser(gBrowser.selectedBrowser);',
        },
        //{
        //    type: 'app',
        //    name: 'Edit',
        //},
        //{
        //    type: 'separator',
        //},
        //{
        //    type: 'app',
        //    name: 'Compatibility View',
        //},
        //{
        //    type: 'app',
        //    name: 'Compatibility View settings',
        //},
        {
            type: 'separator',
        },
        {
            type: 'subdir',
            id: 'cBPage_zoom',
            name: 'Zoom',
            image: 'chrome://global/skin/icons/search-glass.svg',
            items: [
                {
                    type: 'app',
                    id: 'cBPage_zoomIn',
                    name: 'Zoom in',
                    accelText: 'Ctrl +',
                    command: 'FullZoom.enlarge()',
                },
                {
                    type: 'app',
                    id: 'cBPage_zoomOut',
                    name: 'Zoom out',
                    accelText: 'Ctrl -',
                    command: 'FullZoom.reduce()',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'cBPage_setZoom400',
                    name: '400%',
                    command: 'FullZoom.setZoom(4)',
                },
                {
                    type: 'app',
                    id: 'cBPage_setZoom200',
                    name: '200%',
                    command: 'FullZoom.setZoom(2)',
                },
                {
                    type: 'app',
                    id: 'cBPage_setZoom150',
                    name: '150%',
                    command: 'FullZoom.setZoom(1.5)',
                },
                {
                    type: 'app',
                    id: 'cBPage_setZoom125',
                    name: '125%',
                    command: 'FullZoom.setZoom(1.25)',
                },
                {
                    type: 'app',
                    id: 'cBPage_setZoom100',
                    name: '100%',
                    accelText: 'Ctrl+0',
                    command: 'FullZoom.setZoom(1)',
                },
                {
                    type: 'app',
                    id: 'cBPage_setZoom075',
                    name: '75%',
                    command: 'FullZoom.setZoom(.75)',
                },
                {
                    type: 'app',
                    id: 'cBPage_setZoom050',
                    name: '50%',
                    command: 'FullZoom.reduce(.5)',
                },
                //{
                //    type: 'separator',
                //},
                //{
                //    type: 'app',
                //    name: 'Custom...',
                //},
            ],
        },
        //{
        //    type: 'subdir',
        //    name: 'Text size',
        //    items: [],
        //},
        {
            type: 'subdir',
            id: 'cBPage_style',
            name: 'Style',
            items: [
                {
                    type: 'app',
                    id: 'cBPage_noStyle',
                    name: 'No style',
                    command: 'gPageStyleMenu.disableStyle();',
                },
                {
                    type: 'app',
                    id: 'cBPage_defaultStyle',
                    name: 'Default style',
                    command: 'gPageStyleMenu.switchStyleSheet(null);',
                },
            ],
        },
        //{
        //    type: 'subdir',
        //    name: 'Encoding',
        //    items: [],
        //},
        {
            type: 'app',
            id: 'cBPage_caretBrowsing',
            name: 'Caret browsing',
            accelText: 'F7',
            command: 'gBrowser.toggleCaretBrowsing()',
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBPage_properties',
            name: 'Properties',
            command: 'BrowserPageInfo();',
        },
        {
            type: 'app',
            id: 'cBPage_viewSource',
            name: 'View source',
            command: 'BrowserViewSource(window.gBrowser.selectedBrowser)',
        },
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
        this.handleRelativePath(this.getAllApps());
        const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    
        var ExternalPageBtn = document.createElementNS(XULNS, 'toolbarbutton');
        ExternalPageBtn.id = cBPageMenu.id + 'Button';
        ExternalPageBtn.setAttribute("label", cBPageMenu.name);
        ExternalPageBtn.style.listStyleImage = cBPageMenu.image;
        ExternalPageBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
        ExternalPageBtn.setAttribute("type", "menu");
        ExternalPageBtn.setAttribute("removable", "true");
    
        document.getElementById("nav-bar-customization-target").appendChild(ExternalPageBtn);
    
        var ExternalPagePopup = document.createElementNS(XULNS, 'menupopup');
        ExternalPagePopup.setAttribute('id', cBPageMenu.id + 'PopUp');
        ExternalPagePopup.setAttribute('position', 'bottomright topright');
        this._externalAppPopup = ExternalPagePopup;
        ExternalPageBtn.appendChild(ExternalPagePopup);
        cBPageMenu.onpopupshowing();
    },

    onpopupshowing: function() {
        if (this._isready) return;
        if (this._externalAppPopup === null) return;
        var ExternalPagePopup = this._externalAppPopup;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.type === 'subdir') {
                var subDirItem = ExternalPagePopup.appendChild(document.createXULElement('menu'));
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
                ExternalPagePopup.appendChild(subDirItem);
            } else if (item.type === 'app') {
                var appsItems = document.createXULElement('menuitem');
                appsItems.setAttribute('class', 'menuitem-iconic');
                appsItems.setAttribute('id', item.id);
                appsItems.setAttribute('label', item.name);
                appsItems.setAttribute('image', item.image);
                if (item.path !== undefined && item.path !== null) {
                    var escapedPath = item.path.replace(/\\/g, '\\\\'); // Escape backslashes in item.path
                    
                    // Check if item.args is defined, if not, set it to an empty array
                    var argsToEscape = item.args || [];
                
                    // Escape backslashes in each arg and create escapedArgs
                    var escapedArgs = JSON.stringify(argsToEscape.map(arg => arg.replace(/\\/g, '\\\\')));
                    
                    appsItems.setAttribute('oncommand', 'cBPageMenu.exec("' + escapedPath + '", ' + escapedArgs + ');');
                } else {
                    console.error('item.path is undefined or null:', item);
                    appsItems.setAttribute('oncommand', item.command);
                }
                
                if (item.accelText) {
                    appsItems.setAttribute('acceltext', item.accelText)
                }

                ExternalPagePopup.appendChild(appsItems);
            } else if (item.type === 'separator') {
                ExternalPagePopup.appendChild(document.createXULElement('menuseparator'));
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

    handleRelativePath: function(items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].path) {
                items[i].path = items[i].path.replace(/\//g, '\\').toLocaleLowerCase();
                var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path;
                if (/^(\\)/.test(items[i].path)) {
                    items[i].path = ffdir + items[i].path;
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
            alert('File not found: ' + path);
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
cBPageMenu.init();

function mailWithWindowsLive() {
    _ucUtils.loadURI(window,{
        url: 'https://outlook.live.com/mail',
        where: 'tab'
    });
}

function translatePage() {
    // Get the current page URL
    var currentPageUrl = gBrowser.selectedBrowser.currentURI.spec;

    // Construct the Google Translator URL with the current page URL as the text to translate
    var translatorUrl = "https://translate.google.com/translate?sl=auto&tl=en&u=" + encodeURIComponent(currentPageUrl);

    _ucUtils.loadURI(window,{
        url: translatorUrl,
        where: "tab"
    });
}

function findMoreAccelerators() {
    _ucUtils.loadURI(window,{
        url: 'https://addons.mozilla.org',
        where: 'tab'
    });
}

var cBSafetyMenu = {
    id: 'cBSafetyMenu',
    name: 'Safety',
    items: [
        {
            type: 'app',
            id: 'cBSafety_deleteBrowsingHistory',
            name: 'Delete browsing history...',
            image: 'chrome://devtools/skin/images/clear.svg',
            accelText: 'Ctrl+Shift+Del',
            command: 'Sanitizer.showUI(window);',
        },
        {
            type: 'app',
            id: 'cBSafety_inPrivateBrowsing',
            name: 'InPrivate Browsing',
            image: 'chrome://browser/skin/privateBrowsing.svg',
            accelText: 'Ctrl+Shift+P',
            command: 'OpenBrowserWindow({private: true});',
        },
        {
            type: 'app',
            id: 'cBSafety_trackingProtection',
            name: 'Tracking Protection...',
            command: 'gProtectionsHandler.openPreferences()',
        },
        //{
        //    type: 'app',
        //    id: 'cBSafety_activeXFiltering',
        //    name: 'ActiveX Filtering',
        //},
        //{
        //    type: 'app',
        //    id: 'cBSafety_webpagePrivacyPolicy',
        //    name: 'Webpage privacy policy...',
        //},
        {
            type: 'separator',
        },
        //{
        //    type: 'app',
        //    id: 'cBSafety_securityReport',
        //    name: 'Security report',
        //},
        //{
        //    type: 'app',
        //    id: 'cBSafety_internationalWebsiteAddress',
        //    name: 'International website address',
        //},
        {
            type: 'subdir',
            id: 'cBSafety_smartScreenFilter',
            name: 'SmartScreen Filter',
            items: [
                //{
                //    type: 'app',
                //    id: 'cBSafety_checkWebsite',
                //    name: 'Check this website',
                //},
                //{
                //    type: 'app',
                //    id: 'cBSafety_turnOnSmartScreenFilter',
                //    name: 'Turn on SmartScreen Filter...',
                //},
                {
                    type: 'app',
                    id: 'cBSafety_reportUnsafeWebsite',
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
            id: 'cBSafety_windowsUpdate',
            name: 'Windows Update',
            command: 'openWindowsUpdate()'
        },
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
        this.handleRelativePath(this.getAllApps());
        const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    
        var ExternalSafetyBtn = document.createElementNS(XULNS, 'toolbarbutton');
        ExternalSafetyBtn.id = cBSafetyMenu.id + 'Button';
        ExternalSafetyBtn.setAttribute("label", cBSafetyMenu.name);
        ExternalSafetyBtn.style.listStyleImage = cBSafetyMenu.image;
        ExternalSafetyBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
        ExternalSafetyBtn.setAttribute("type", "menu");
        ExternalSafetyBtn.setAttribute("removable", "true");
    
        document.getElementById("nav-bar-customization-target").appendChild(ExternalSafetyBtn);
    
        var ExternalSafetyPopup = document.createElementNS(XULNS, 'menupopup');
        ExternalSafetyPopup.setAttribute('id', cBSafetyMenu.id + 'PopUp');
        ExternalSafetyPopup.setAttribute('position', 'bottomright topright');
        this._externalAppPopup = ExternalSafetyPopup;
        ExternalSafetyBtn.appendChild(ExternalSafetyPopup);
        cBSafetyMenu.onpopupshowing();
    },

    onpopupshowing: function() {
        if (this._isready) return;
        if (this._externalAppPopup === null) return;
        var ExternalSafetyPopup = this._externalAppPopup;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item.type === 'subdir') {
                var subDirItem = ExternalSafetyPopup.appendChild(document.createXULElement('menu'));
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
                ExternalSafetyPopup.appendChild(subDirItem);
            } else if (item.type === 'app') {
                var appsItems = document.createXULElement('menuitem');
                appsItems.setAttribute('class', 'menuitem-iconic');
                appsItems.setAttribute('id', item.id);
                appsItems.setAttribute('label', item.name);
                appsItems.setAttribute('image', item.image);
                if (item.path !== undefined && item.path !== null) {
                    var escapedPath = item.path.replace(/\\/g, '\\\\'); // Escape backslashes in item.path
                    
                    // Check if item.args is defined, if not, set it to an empty array
                    var argsToEscape = item.args || [];
                
                    // Escape backslashes in each arg and create escapedArgs
                    var escapedArgs = JSON.stringify(argsToEscape.map(arg => arg.replace(/\\/g, '\\\\')));
                    
                    appsItems.setAttribute('oncommand', 'cBSafetyMenu.exec("' + escapedPath + '", ' + escapedArgs + ');');
                } else {
                    console.error('item.path is undefined or null:', item);
                    appsItems.setAttribute('oncommand', item.command);
                }

                if (item.accelText) {
                    appsItems.setAttribute('acceltext', item.accelText)
                }

                ExternalSafetyPopup.appendChild(appsItems);
            } else if (item.type === 'separator') {
                ExternalSafetyPopup.appendChild(document.createXULElement('menuseparator'));
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

    handleRelativePath: function(items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].path) {
                items[i].path = items[i].path.replace(/\//g, '\\').toLocaleLowerCase();
                var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path;
                if (/^(\\)/.test(items[i].path)) {
                    items[i].path = ffdir + items[i].path;
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
            alert('File not found: ' + path);
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
cBSafetyMenu.init();

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}

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
                {
                    type: 'app',
                    id: 'cBTools_menuBar',
                    name: 'Menu bar',
                    command: 'toggleMenuBar();' 
                },
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

function toggleMenuBar() {
    const menuBar = document.getElementById("toolbar-menubar");
    
    if (menuBar) {
        if (menuBar.getAttribute("autohide") === "true") {
            menuBar.setAttribute("autohide", "false");
        } else {
            menuBar.setAttribute("autohide", "true");
        }
    }
};