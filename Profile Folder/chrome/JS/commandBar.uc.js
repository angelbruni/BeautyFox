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
                
                var homeButton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                homeButton.id = 'cBHomeButton';
                homeButton.setAttribute('onclick', 'BrowserHome(event);');
                toolbaritem.appendChild(homeButton);

                var printButton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                printButton.id = 'cBPrintButton';
                printButton.setAttribute('onclick', 'PrintUtils.togglePrintPreview(gBrowser.selectedBrowser.browsingContext);');
                toolbaritem.appendChild(printButton);

                var pageMenu = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                pageMenu.id = 'cBPageMenu';
                pageMenu.setAttribute('label', 'Page');
                pageMenu.setAttribute('type', 'menu');
                toolbaritem.appendChild(pageMenu);

                var safetyMenu = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                safetyMenu.id = 'cBSafetyMenu';
                safetyMenu.setAttribute('label', 'Safety');
                toolbaritem.appendChild(safetyMenu);

                var toolsMenu = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                toolsMenu.id = 'cBToolsMenu';
                toolsMenu.setAttribute('label', 'Tools');
                toolbaritem.appendChild(toolsMenu);

                var helpButton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                helpButton.id = 'cBHelpButton';
                helpButton.setAttribute('onclick', 'PrintUtils.togglePrintPreview(gBrowser.selectedBrowser.browsingContext);');
                toolbaritem.appendChild(helpButton);
                
                return toolbaritem;
            }
        });
    }
    catch (e) {
        Components.utils.reportError(e);
    }
}