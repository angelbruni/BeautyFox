// ==UserScript==
// @name		BeautyFox - Downloads Window
// @description	Styles the Downloads window to resemble the one from Internet Explorer 9+.
// @include		chrome://browser/content/places/places.xhtml
// ==/UserScript==

function styleDownloads() {
	if (!document.getElementById('downloadsListBox').getAttribute('hidden')) {
		const places = document.getElementById('places');
		places.setAttribute('title', getComputedStyle(document.documentElement).getPropertyValue('--label-view-downloads') + 'Windows Internet Explorer');

		const style = document.createElement('link');
		style.setAttribute('rel','stylesheet');
		style.setAttribute('href','chrome://userchrome/content/partials/content/downloads.css');
		
		places.appendChild(style);

		const placesToolbar = document.getElementById('placesToolbar');
		placesToolbar.setAttribute('data-before', getComputedStyle(document.documentElement).getPropertyValue('--label-view-n-track-your-downloads'));
		
		const closeButton = document.createXULElement('toolbarbutton');
		closeButton.id = 'closeButton';
		closeButton.setAttribute('label', 'Close');
		closeButton.setAttribute('oncommand', 'window.close()');
		placesToolbar.appendChild(closeButton);

		const clearDownloadsButton = document.getElementById('clearDownloadsButton');
		clearDownloadsButton.setAttribute('label', 'Clear list');
	}
}

window.addEventListener("load", function () {
	setTimeout(() => {
		styleDownloads();
	}, 0);
})