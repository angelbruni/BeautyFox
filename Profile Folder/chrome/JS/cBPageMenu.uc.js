var cBPageMenu = {
    id: 'cBPageMenu',
    name: 'Page',
    items: [
        {
            type: 'app',
            id: 'cBPage_newWindow',
            name: 'New Window',
            image: 'chrome://browser/skin/window.svg',
            command: 'OpenBrowserWindow();',
        },
        //{
        //    type: 'app',
        //    name: 'Add site to Start Menu',
        //},
        //{
        //    type: 'separator',
        //},
        //{
        //    type: 'app',
        //    name: 'Cut',
        //},
        //{
        //    type: 'app',
        //    name: 'Copy',
        //},
        //{
        //    type: 'app',
        //    name: 'Paste',
        //},
        //{
        //    type: 'separator',
        //},
        //{
        //    type: 'app',
        //    name: 'E-mail with Windows Live',
        //},
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
        //{
        //    type: 'subdir',
        //    name: 'All Accelerators',
        //    items: [],
        //},
        {
            type: 'app',
            id: 'cBPage_allAccelerators',
            name: 'All Accelerators',
            command: 'BrowserOpenAddonsMgr();',
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBPage_saveAs',
            name: 'Save as...',
            image: 'chrome://browser/skin/save.svg',
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
                    command: 'FullZoom.enlarge()',
                },
                {
                    type: 'app',
                    id: 'cBPage_zoomOut',
                    name: 'Zoom out',
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
                //    command: 'FullZoom.reduce()',
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
                appsItems.setAttribute('oncommand', item.command);
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
};

cBPageMenu.init();

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