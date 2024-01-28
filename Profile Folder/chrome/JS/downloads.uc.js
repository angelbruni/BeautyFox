// ==UserScript==
// @name			Internet Explorer 9+ Downloads Window
// @description 	Styles the Downloads window to resemble the one from Internet Explorer 9+.
// @include			chrome://browser/content/places/places.xhtml
// ==/UserScript==

(function () {
	function styleDownloads() {
		if (!document.getElementById('downloadsListBox').getAttribute('hidden')) {
			var labelViewDownloads = getComputedStyle(document.documentElement).getPropertyValue('--label-view-downloads');
			var labelViewNTrackYourDownloads = getComputedStyle(document.documentElement).getPropertyValue('--label-view-n-track-your-downloads');

			const places = document.getElementById('places');
			places.setAttribute('title', labelViewDownloads + 'Windows Internet Explorer');

			var style = document.createElement('link');
			style.setAttribute('rel','stylesheet');
			style.setAttribute('href','chrome://userchrome/content/partials/content/downloads.css');
			
			places.appendChild(style);

			const placesToolbar = document.getElementById('placesToolbar');
			placesToolbar.setAttribute('data-before', labelViewNTrackYourDownloads);
			
			var closeButton = document.createXULElement('toolbarbutton');
			closeButton.id = 'closeButton';
			closeButton.setAttribute('label', 'Close');
			closeButton.setAttribute('oncommand', 'window.close()');
			placesToolbar.appendChild(closeButton);

			var clearDownloadsButton = document.getElementById('clearDownloadsButton');
			clearDownloadsButton.setAttribute('label', 'Clear list');
		}
	}

	window.addEventListener("load", function () {
		setTimeout(() => {
			styleDownloads();
		}, 0);
	})

})();