var cBSafetyMenu = {
    id: 'cBSafetyMenu',
    name: 'Safety',
    items: [
        {
            type: 'app',
            id: 'cBSafety_deleteBrowsingHistory',
            name: 'Delete browsing history...',
            image: 'chrome://devtools/skin/images/clear.svg',
            command: 'Sanitizer.showUI(window);',
        },
        {
            type: 'app',
            id: 'cBSafety_inPrivateBrowsing',
            name: 'InPrivate Browsing',
            image: 'chrome://browser/skin/privateBrowsing.svg',
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
        //{
        //    type: 'separator',
        //},
        //{
        //    type: 'app',
        //    id: 'cBSafety_windowsUpdate',
        //    name: 'Windows Update',
        //},
    ],
    
    _externalAppPopup: null,
    _isready: false,
    init: function() {
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
                appsItems.setAttribute('oncommand', item.command);
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
};

cBSafetyMenu.init();

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}