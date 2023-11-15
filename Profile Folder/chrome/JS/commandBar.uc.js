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

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}

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