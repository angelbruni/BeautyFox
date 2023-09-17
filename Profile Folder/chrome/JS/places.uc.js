// ==UserScript==
// @include			chrome://browser/content/places/places.xhtml
// ==/UserScript==

(function () {
var labelViewDownloads = getComputedStyle(document.documentElement).getPropertyValue('--label-view-downloads');
var labelViewNTrackYourDownloads = getComputedStyle(document.documentElement).getPropertyValue('--label-view-n-track-your-downloads');

const places = document.getElementById("places");
places.setAttribute("title", labelViewDownloads + "Windows Internet Explorer");

/*function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
});
}  */

const placesToolbar = document.getElementById("placesToolbar");

const navBar = document.getElementById("nav-bar");

// Select the node that will be observed for mutations
const downloadsListBox = document.getElementById("downloadsListBox");

// Options for the observer (which mutations to observe)
const downloadsListBoxObserverConfig = { attributes: true, childList: false, subtree: false };

// Callback function to execute when mutations are observed
const downloadsListBoxObserverCallback = (mutationList, observer) => {
for (const mutation of mutationList) {
    if (mutation.type === "attributes") {
        if (!downloadsListBox.hasAttribute("hidden")) {
            // Only display download header title when downloadsListBox is not hidden.
            placesToolbar.setAttribute('data-before', labelViewNTrackYourDownloads);
        }
    }
}
};

// Create an observer instance linked to the callback function
const downloadsListBoxObserver = new MutationObserver(downloadsListBoxObserverCallback);

// Start observing the target node for configured mutations
downloadsListBoxObserver.observe(downloadsListBox, downloadsListBoxObserverConfig);

/*const clearDownloadsButton = document.getElementById("clearDownloadsButton");
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