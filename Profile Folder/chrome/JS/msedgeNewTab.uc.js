function insertMSEdgeNewTabButton() {
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
}