// ==UserScript==
// @name        BeautyFox - Edge Button
// @description Adds a new window edge button next to the new tab button.
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createMSEdgeNewTabButton() {
	const previousTabsMSEdgeNewTabButton = document.getElementById('TabsMSEdgeNewTabButton')
	const previousMSEdgeNewTabButton = document.getElementById('MSEdgeNewTabButton')

	if (previousTabsMSEdgeNewTabButton && previousMSEdgeNewTabButton) {
		previousTabsMSEdgeNewTabButton.remove()
		previousMSEdgeNewTabButton.remove()
	}

    var tabbrowserArrowscrollboxPeriphery = document.getElementById('tabbrowser-arrowscrollbox-periphery');
    var TabsMSEdgeNewTabButton = document.createXULElement('toolbarbutton');
    TabsMSEdgeNewTabButton.classList.add('toolbarbutton-1');
    TabsMSEdgeNewTabButton.id = 'TabsMSEdgeNewTabButton';
    TabsMSEdgeNewTabButton.setAttribute('oncommand', 'runFile("microsoft-edge:", "")')
    tabbrowserArrowscrollboxPeriphery.insertBefore(TabsMSEdgeNewTabButton, tabbrowserArrowscrollboxPeriphery.lastChild);

    var tabsToolbarCustomizationTarget = document.getElementById('TabsToolbar-customization-target');
    var MSEdgeNewTabButton = document.createXULElement('toolbarbutton');
    MSEdgeNewTabButton.classList.add('toolbarbutton-1');
    MSEdgeNewTabButton.id = 'MSEdgeNewTabButton';
    MSEdgeNewTabButton.setAttribute('oncommand', 'runFile("microsoft-edge:", "")')
    tabsToolbarCustomizationTarget.insertBefore(MSEdgeNewTabButton, tabsToolbarCustomizationTarget.lastChild);

	const tabsToolbar = document.getElementById('TabsToolbar');
	const attr = 'edgebutton';
    switch (pref('BeautyFox.option.storedEdgeButtonChoice').tryGet.int()) {
		case 0:
			tabsToolbar.setAttribute(attr, 'hide')
			break;
		case 1:
			tabsToolbar.removeAttribute(attr)
			break;
		case 2:
			tabsToolbar.setAttribute(attr, 'new')
			break;
	}
}

function insertMSEdgeNewTabButton() {
	if (!pref('BeautyFox.option.bHideEdgeButton').tryGet.bool())
		createMSEdgeNewTabButton()
}