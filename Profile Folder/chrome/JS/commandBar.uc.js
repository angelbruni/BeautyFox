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