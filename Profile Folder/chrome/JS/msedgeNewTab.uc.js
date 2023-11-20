function insertMSEdgeNewTabButton() {
    var tabbrowserArrowscrollboxPeriphery = document.getElementById('tabbrowser-arrowscrollbox-periphery');
    var MSEdgeNewTabButton = document.createXULElement('toolbarbutton');
    MSEdgeNewTabButton.classList.add('toolbarbutton-1');
    MSEdgeNewTabButton.id = 'MSEdgeNewTabButton';
    MSEdgeNewTabButton.setAttribute('oncommand', 'runFile("msedge.exe", "")')

    tabbrowserArrowscrollboxPeriphery.insertBefore(MSEdgeNewTabButton, tabbrowserArrowscrollboxPeriphery.lastChild);
}