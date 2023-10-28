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
            path: '\\chrome\\temppages\\whats-new.html',
        },
        {
            type: 'app',
            id: 'cBHelp_onlineSupport',
            name: 'Online support',
            path: '\\chrome\\temppages\\discord-invite.html',
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBHelp_aboutInternetExplorer',
            name: 'About Internet Explorer',
            command: 'openAboutDialog();',
        },
        {
            type: 'app',
            id: 'appMenu_internetOptions',
            name: 'Internet options',
            command: 'openPreferences();',
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'appMenu_beautyFoxOptions',
            name: 'BeautyFox options',
            command: 'openBeautyFoxWizardWindow();',
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