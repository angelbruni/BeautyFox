function createMenu(menuData) {
    const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';

    var externalBtn = document.createElementNS(XULNS, 'toolbarbutton');

    externalBtn.id = menuData.id + 'Button';
    externalBtn.setAttribute('label', menuData.name);

    if (!menuData.locale == "") {
        externalBtn.setAttribute('locale', menuData.locale);
    }

    externalBtn.style.listStyleImage = menuData.image;
    externalBtn.setAttribute('onclick', 'event.preventDefault();event.stopPropagation();');
    externalBtn.setAttribute('type', 'menu');
    externalBtn.setAttribute('removable', 'true');

    // Add specified classes to the menu button
    if (menuData.classes) {
        if (Array.isArray(menuData.classes)) {
            externalBtn.classList.add(...menuData.classes);
        } else {
            externalBtn.classList.add(menuData.classes);
        }
    }

    // Add event listener for Shift key press to toggle special items
    externalBtn.addEventListener('click', (event) => {
        if (event.shiftKey) {
            menuData._externalAppPopup.querySelectorAll('[special="true"]').forEach((item) => {
                item.style.display = 'flex';
            });
        } else {
            menuData._externalAppPopup.querySelectorAll('[special="true"]').forEach((item) => {
                item.style.display = 'none';
            });
        }
    });

    document.getElementById('nav-bar-customization-target').appendChild(externalBtn);

    var externalPopup = document.createElementNS(XULNS, 'menupopup');
    externalPopup.setAttribute('id', menuData.id + 'PopUp');
    externalPopup.setAttribute('position', 'bottomright topright');
    externalBtn.appendChild(externalPopup);

    for (var i = 0; i < menuData.items.length; i++) {
        createMenuItem(externalPopup, menuData.items[i]);
    }

    menuData._externalAppPopup = externalPopup;
    menuData._isready = false;

    menuData.handleRelativePath = (items) => {
        const { Classes } = Components;
        const { Ci } = Components.interfaces;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.path) {
                item.path = item.path.replace(/\//g, '\\').toLocaleLowerCase();
                const ffdir = Classes['@mozilla.org/file/directory_service;1']
                    .getService(Ci.nsIProperties)
                    .get('ProfD', Ci.nsIFile).path;

                if (/^(\\)/.test(item.path)) {
                    item.path = ffdir + item.path;
                }
            }
        }
    };

    menuData.init = function () {
        menuData.handleRelativePath(menuData.getAllApps());
        menuData.onpopupshowing();
    };

    menuData.onpopupshowing = () => {
        if (menuData._isready) return;
        if (menuData._externalAppPopup === null) return;

        // Clear existing items before adding them again because this code is being a bitch and adding the entries in the menu twice????
        while (menuData._externalAppPopup.hasChildNodes()) {
            menuData._externalAppPopup.removeChild(menuData._externalAppPopup.firstChild);
        }

        menuData.items.forEach((item) => createMenuItem(menuData._externalAppPopup, item));
        menuData._isready = true;
    };

    menuData.getAllApps = function () {
        var apps = [];
        for (var i = 0; i < menuData.items.length; i++) {
            if (menuData.items[i].type === 'app') {
                apps.push(menuData.items[i]);
            } else if (menuData.items[i].type === 'subdir') {
                apps = apps.concat(menuData.items[i].items.filter(item => item.type === 'app'));
            }
        }
        return apps;
    };

    return menuData;
}

function createMenuItem(parent, item) {
    if (item.type === 'subdir') {
        var subDirItem = parent.appendChild(document.createXULElement('menu'));
        subDirItem.setAttribute('class', 'menu-iconic');
        subDirItem.setAttribute('id', item.id);
        subDirItem.setAttribute('label', item.name);

        if (!item.locale == "") {
            subDirItem.setAttribute('locale', item.locale);
        }

        subDirItem.setAttribute('image', item.image);

        if (item.special) {
            subDirItem.setAttribute('special', item.special);
            subDirItem.style.display = 'none';

        }

        var subDirPopup = document.createXULElement('menupopup');

        for (var j = 0; j < item.items.length; j++) {
            createMenuItem(subDirPopup, item.items[j]);
        }

        subDirItem.appendChild(subDirPopup);
    } else if (item.type === 'app') {
        var appsItems = document.createXULElement('menuitem');
        appsItems.setAttribute('class', 'menuitem-iconic');
        appsItems.setAttribute('id', item.id);
        appsItems.setAttribute('label', item.name);

        if (item.special) {
            appsItems.setAttribute('special', item.special);
            appsItems.style.display = 'none';
        }

        if (!item.locale == "") {
            appsItems.setAttribute('locale', item.locale);
        }

        appsItems.setAttribute('image', item.image);
        appsItems.setAttribute('oncommand', item.command);

        if (item.accelText) {
            appsItems.setAttribute('acceltext', item.accelText);
        }

        parent.appendChild(appsItems);
    } else if (item.type === 'separator') {
        var separator = document.createXULElement('menuseparator');
        parent.appendChild(separator);

        if (item.special) {
            separator.setAttribute('special', item.special);
            separator.style.display = 'none';
        }
    }
}

var IEMenu = createMenu({
    id: 'IEMenu',
    classes: ['toolbarbutton-1'],
    name: 'Internet Explorer Menu',
    items: [
        {
            type: 'app',
            id: 'IEMenu_print',
            name: 'Print',
            locale: 'Print',
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
            locale: 'File',
            items: [
                {
                    type: 'app',
                    id: 'IEMenu_fullScreen',
                    name: 'Full screen',
                    locale: 'FullScreen',
                    accelText: 'F11',
                    command: 'BrowserFullScreen();',
                },
                {
                    type: 'app',
                    id: 'IEMenu_saveAs',
                    name: 'Save as...',
                    locale: 'SaveAs',
                    accelText: 'Ctrl+S',
                    command: 'saveBrowser(gBrowser.selectedBrowser);',
                },
                {
                    type: 'app',
                    id: 'IEMenu_find',
                    name: 'Find on this page',
                    locale: 'FindOnPage',
                    accelText: 'Ctrl+F',
                    command: "gLazyFindCommand('onFindCommand')"
                },
                {
                    type: 'app',
                    id: 'IEMenu_caretBrowsing',
                    name: 'Caret browsing',
                    locale: 'CaretBrowsing',
                    accelText: 'F7',
                    command: 'gBrowser.toggleCaretBrowsing()',
                },
            ]
        },
        {
            type: 'subdir',
            id: 'IEMenu_zoom',
            name: 'Zoom',
            locale: 'Zoom',
            items: [
                {
                    type: 'app',
                    id: 'IEMenu_zoomIn',
                    name: 'Zoom in',
                    locale: 'ZoomIn',
                    accelText: 'Ctrl +',
                    command: 'FullZoom.enlarge()',
                },
                {
                    type: 'app',
                    id: 'IEMenu_zoomOut',
                    name: 'Zoom out',
                    locale: 'ZoomOut',
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
            locale: 'Safety',
            items: [
                {
                    type: 'app',
                    id: 'IEMenu_deleteBrowsingHistory',
                    name: 'Delete browsing history...',
                    locale: 'DeleteBrowsingHistory',
                    accelText: 'Ctrl + Shift + Del',
                    command: 'Sanitizer.showUI(window);',
                },
                {
                    type: 'app',
                    id: 'IEMenu_inPrivateBrowsing',
                    name: 'InPrivate Browsing',
                    locale: 'InPrivateBrowsing',
                    accelText: 'Ctrl + Shift + P',
                    command: 'OpenBrowserWindow({private: true});',
                },
                {
                    type: 'app',
                    id: 'IEMenu_trackingProtection',
                    name: 'Tracking Protection...',
                    locale: 'TrackingProtection',
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
                    locale: 'ReportUnsafeWebsite',
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
            locale: 'ViewDownloads',
            accelText: 'Ctrl + J',
            command: 'BrowserDownloadsUI();',
        },
        {
            type: 'app',
            id: 'IEMenu_manageAddOns',
            name: 'Manage add-ons',
            locale: 'ManageAddOns',
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
            locale: 'BeautyFoxOptions',
            special: true,
            command: 'openBeautyFoxWizardWindow(false);',
        },
        {
            type: 'separator',
            special: true
        },
        {
            type: 'app',
            id: 'IEMenu_internetOptions',
            name: 'Internet options',
            locale: 'InternetOptions',
            command: 'openInternetOptions();',
        },
        {
            type: 'app',
            id: 'IEMenu_aboutInternetExplorer',
            name: 'About Internet Explorer',
            locale: 'aboutIE',
            command: 'openAboutIE();',
        },
    ],
});
IEMenu.init();

var cBPageMenu = createMenu({
    id: 'cBPageMenu',
    name: 'Page',
    locale: 'Page',
    items: [
        {
            type: 'app',
            id: 'cBPage_newWindow',
            name: 'New Window',
            locale: 'NewWindow',
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
            locale: 'Cut',
            image: 'chrome://browser/skin/edit-cut.svg',
            accelText: 'Ctrl+X',
            command: "goDoCommand('cmd_cut')"
        },
        {
            type: 'app',
            id: 'cBPage_copy',
            name: 'Copy',
            locale: 'Copy',
            image: 'chrome://devtools/skin/images/copy.svg',
            accelText: 'Ctrl+C',
            command: "goDoCommand('cmd_copy')"
        },
        {
            type: 'app',
            id: 'cBPage_paste',
            name: 'Paste',
            locale: 'Paste',
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
            locale: 'EMailWithindowsLive',
            command: 'mailWithWindowsLive()',
        },
        //{
        //    type: 'app',
        //    name: 'Translate with Bing',
        //},
        {
            type: 'app',
            id: 'cBPage_googleTranslate',
            name: 'Translate with Google',
            locale: 'TranslateWithGoogle',
            command: 'translatePage()',
        },
        {
            type: 'separator',
        },
        {
            type: 'subdir',
            id: 'cBPage_allAccelerators',
            name: 'All Accelerators',
            locale: 'AllAccelerators',
            items: [
                {
                    type: 'app',
                    id: 'cBPage_findMoreAccelerators',
                    name: 'Find more Accelerators',
                    locale: 'FindMoreAccelerators',
                    command: 'findMoreAccelerators();',
                },
                {
                    type: 'app',
                    id: 'cBPage_manageAccelerators',
                    name: 'Manage Accelerators...',
                    locale: 'ManageAccelerators',
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
            locale: 'SaveAs',
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
            locale: 'SendLinkByEMail',
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
            locale: 'Zoom',
            image: 'chrome://global/skin/icons/search-glass.svg',
            items: [
                {
                    type: 'app',
                    id: 'cBPage_zoomIn',
                    name: 'Zoom in',
                    locale: 'ZoomIn',
                    accelText: 'Ctrl +',
                    command: 'FullZoom.enlarge()',
                },
                {
                    type: 'app',
                    id: 'cBPage_zoomOut',
                    name: 'Zoom out',
                    locale: 'ZoomOut',
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
            locale: 'Style',
            items: [
                {
                    type: 'app',
                    id: 'cBPage_noStyle',
                    name: 'No style',
                    locale: 'NoStyle',
                    command: 'gPageStyleMenu.disableStyle();',
                },
                {
                    type: 'app',
                    id: 'cBPage_defaultStyle',
                    name: 'Default style',
                    locale: 'DefaultStyle',
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
            locale: 'CaretBrowsing',
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
            locale: 'Properties',
            command: 'BrowserPageInfo();',
        },
        {
            type: 'app',
            id: 'cBPage_viewSource',
            name: 'View source',
            locale: 'ViewSource',
            command: 'BrowserViewSource(window.gBrowser.selectedBrowser)',
        },
    ],
});
cBPageMenu.init();

var cBSafetyMenu = createMenu({
    id: 'cBSafetyMenu',
    name: 'Safety',
    locale: 'Safety',
    items: [
        {
            type: 'app',
            id: 'cBSafety_deleteBrowsingHistory',
            name: 'Delete browsing history...',
            locale: 'DeleteBrowsingHistory',
            image: 'chrome://devtools/skin/images/clear.svg',
            accelText: 'Ctrl+Shift+Del',
            command: 'Sanitizer.showUI(window);',
        },
        {
            type: 'app',
            id: 'cBSafety_inPrivateBrowsing',
            name: 'InPrivate Browsing',
            locale: 'InPrivateBrowsing',
            image: 'chrome://browser/skin/privateBrowsing.svg',
            accelText: 'Ctrl+Shift+P',
            command: 'OpenBrowserWindow({private: true});',
        },
        {
            type: 'app',
            id: 'cBSafety_trackingProtection',
            name: 'Tracking Protection...',
            locale: 'TrackingProtection',
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
            locale: 'SmartScreenFilter',
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
                    locale: 'ReportUnsafeWebsite',
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
});
cBSafetyMenu.init();

var cBToolsMenu = createMenu({
    id: 'cBToolsMenu',
    name: 'Tools',
    locale: 'Tools',
    items: [
        {
            type: 'app',
            id: 'cBTools_diagnoseConnectionProblems',
            name: 'Diagnose connection problems...',
            locale: 'DiagnoseConnectionProblems',
            command: 'launchNetworkDiagnostics()',
        },
        {
            type: 'app',
            id: 'cBTools_reopenLastBrowsingSession',
            name: 'Reopen last browsing session',
            locale: 'ReopenLastBrowsingSession',
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
            locale: 'ViewDownloads',
            accelText: 'Ctrl+J',
            command: 'BrowserDownloadsUI();',
        },
        {
            type: 'app',
            id: 'cBTools_manageAddOns',
            name: 'Manage add-ons',
            locale: 'ManageAddOns',
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
            locale: 'WorkOffline',
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
            locale: 'FullScreen',
            image: 'chrome://browser/skin/fullscreen.svg',
            accelText: 'F11',
            command: 'BrowserFullScreen();',
        },
        {
            type: 'subdir',
            id: 'cBTools_toolbars',
            name: 'Toolbars',
            locale: 'Toolbars',
            items: [
                {
                    type: 'app',
                    id: 'cBTools_menuBar',
                    name: 'Menu bar',
                    locale: 'MenuBar',
                    command: 'toggleMenuBar();' 
                },
                {
                    type: 'app',
                    id: 'cBTools_favoritesBar',
                    name: 'Favourites bar',
                    locale: 'FavouritesBar',
                    command: "BookmarkingUI.toggleBookmarksToolbar('shortcut');",
                },
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'cBTools_manageAddOns2',
                    name: 'Manage add-ons',
                    locale: 'ManageAddOns',
                    command: 'BrowserOpenAddonsMgr();',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'app',
                    id: 'cBTools_customize',
                    name: 'Customize',
                    locale: 'Customize',
                    command: 'gCustomizeMode.enter();',
                },
            ]
        },
        {
            type: 'subdir',
            id: 'cBTools_explorerBars',
            name: 'Explorer bars',
            locale: 'ExplorerBars',
            items: [
                {
                    type: 'app',
                    id: 'cBTools_favorites',
                    name: 'Favourites',
                    locale: 'Favourites',
                    command: "SidebarUI.toggle('viewBookmarksSidebar');",
                },
                {
                    type: 'app',
                    id: 'cBTools_history',
                    name: 'History',
                    locale: 'History',
                    command: "SidebarUI.toggle('viewHistorySidebar')",
                },
                /*{
                    type: 'app',
                    id: 'cBTools_syncedTabs',
                    name: 'Synced tabs',
                    command: "SidebarUI.toggle('viewTabsSidebar');",
                },*/
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
            locale: 'InternetOptions',
            image: 'chrome://devtools/skin/images/settings.svg',
            command: 'openInternetOptions();',
        },
    ],
});
cBToolsMenu.init();

var cBHelpMenu = createMenu({
    id: 'cBHelpMenu',
    image: 'url(chrome://global/skin/icons/help.svg)',
    name: 'Help',
    locale: 'Help',
    items: [
        {
            type: 'app',
            id: 'cBHelp_internetExplorerHelp',
            name: 'Internet Explorer Help',
            locale: 'InternetExplorerHelp',
            accelText: 'F1',
            command: "openHelpLink('firefox-help');",
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBHelp_whatsNewInBeautyFox',
            name: "What's new in BeautyFox",
            locale: "NewBeautyFox",
            special: true,
            command: "_ucUtils.loadURI(window,{url: 'chrome://userchrome/content/temppages/changelogs/b4.3.2.html', where: 'tab'});"
        },
        {
            type: 'separator',
            special: true
        },
        {
            type: 'app',
            id: 'cBHelp_whatsNewInIE',
            name: "What's new in Internet Explorer",
            locale: "NewIE",
            command: "openWhatsNewIE();"
        },
        {
            type: 'app',
            id: 'cBHelp_onlineSupport',
            name: 'Online support',
            locale: 'OnlineSupport',
            command: "_ucUtils.loadURI(window,{url: 'chrome://userchrome/content/temppages/discord-invite.html', where: 'tab'});"
        },
        {
            type: 'separator',
        },
        {
            type: 'app',
            id: 'cBHelp_aboutInternetExplorer',
            name: 'About Internet Explorer',
            locale: 'aboutIE',
            command: 'openAboutIE();',
        },
        {
            type: 'app',
            id: 'cBHelp_internetOptions',
            name: 'Internet options',
            locale: 'InternetOptions',
            command: 'openInternetOptions();',
        },
    ],
});
cBHelpMenu.init();