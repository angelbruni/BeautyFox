// ==UserScript==
// @include			chrome://browser/content/places/places.xhtml
// ==/UserScript==

(function () {
var labelViewDownloads = getComputedStyle(document.documentElement).getPropertyValue('--label-view-downloads');

const places = document.getElementById("places");
places.setAttribute("title", labelViewDownloads + "Windows Internet Explorer");

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
});
}  

/*const placesToolbar = document.getElementById("placesToolbar");

const clearDownloadsButton = document.getElementById("clearDownloadsButton");
clearDownloadsButton.remove();

const clonedClearDownloadsButton = document.createElement("button");
const clonedClearDownloadsButtonAttrs = {
	"id": "clearDownloadsButton",
    "data-l10n-id": "downloads-clear-downloads-button",
    "class": "tabbable",
    "command": "downloadsCmd_clearDownloads",
    "label": "Clear list",
    "tooltiptext": "Clears completed, cancelled and failed downloads"
};
clonedClearDownloadsButton.innerHTML = 'Clear list';
setAttributes(clonedClearDownloadsButton, clonedClearDownloadsButtonAttrs);
    
placesToolbar.appendChild(clonedClearDownloadsButton);*/
})();