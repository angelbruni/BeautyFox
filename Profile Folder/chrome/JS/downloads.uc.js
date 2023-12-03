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
			var style = document.createElement('style');
			style.innerHTML = `
			:root {
				--background: white;
				--border: rgb(214, 229, 245);
				--background2: rgb(240, 240, 240);
				--border2: rgb(233, 233, 233);
				--border3: rgb(220, 220, 220);
				--button-color: black;
				--button-border: white;
				--button-outline: rgb(176, 178, 182);
				--button-background: linear-gradient(0deg, rgb(231, 231, 231) 0%, rgb(244, 244, 244) 100%);
				--button-background-hover: linear-gradient(0deg, rgb(185, 214, 252) 0%, rgb(239, 243, 249) 100%);
				--button-background-active: linear-gradient(0deg, rgb(145, 192, 253) 0%, rgb(229, 236, 246) 100%);
				--josh: rgb(0, 51, 153);
			  }
			  @supports -moz-bool-pref("BeautyFox.appearance.IE10") {
				:root {
				  --button-border: rgb(172, 172, 172) !important;
				  --button-background: linear-gradient(0deg, rgb(229, 229, 229) 0%, rgb(240, 240, 240) 100%) !important;
				  --button-border-hover: rgb(126, 180, 234) !important;
				  --button-background-hover: linear-gradient(0deg, rgb(220, 236, 252) 0%, rgb(236, 244, 252) 100%) !important;
				  --button-border-active: 1px solid rgb(86, 157, 229) !important;
				  --button-background-active: linear-gradient(0deg, rgb(196, 224, 252) 0%, rgb(218, 236, 252) 100%) !important;
				}
			  }
			  @media (prefers-color-scheme: dark) {
				:root {
				  --background: rgba(30, 30, 30, .65);
				  --border: rgb(67, 72, 77);
				  --background2: rgb(32, 32, 32);
				  --border2: rgb(58, 57, 57);
				  --border3: rgb(36, 36, 36);
				  --button-color: white;
				  --button-border: black;
				  --button-outline: rgb(51, 52, 53);
				  --button-background: linear-gradient(0deg, rgb(22, 22, 22) 0%, rgb(44, 44, 44) 100%);
				  --button-background-hover: linear-gradient(0deg, rgb(52, 61, 71) 0%, rgb(52, 53, 54) 100%);
				  --button-background-active: linear-gradient(0deg, rgb(41, 54, 71) 0%, rgb(67, 69, 71) 100%);
				  --josh: rgb(124, 163, 243);
				}
				@supports -moz-bool-pref("BeautyFox.appearance.IE10") {
				  :root {
					--button-border: rgb(29, 29, 29) !important;
					--button-background: linear-gradient(0deg, rgb(32, 32, 32) 0%, rgb(65, 65, 65)0%) !important;
					--button-border-hover: rgb(42, 60, 78) !important;
					--button-background-hover: linear-gradient(0deg, rgb(47, 51, 54) 0%, rgb(79, 82, 85) 100%) !important;
					--button-border-active: 1px solid rgb(34, 61, 88) !important;
					--button-background-active: linear-gradient(0deg, rgb(58, 66, 73) 0%, rgb(57, 62, 66)0%) !important;
				  }
				}
			  }
			  
			  #places {
				color-scheme: light !important;
			  }
			  #places #placesToolbox #placesToolbar {
				padding: 16px 10px !important;
				padding-bottom: 17px !important;
				justify-content: end;
				background-color: var(--background) !important;
				border-bottom: 1px solid var(--border) !important;
				position: relative !important;
			  }
			  #places #placesToolbox #placesToolbar::before {
				content: attr(data-before);
				position: absolute;
				left: 15px;
				color: var(--josh);
				font-size: 12pt;
			  }
			  #places #placesToolbox #placesToolbar > *:not(#clearDownloadsButton, #closeButton, search-textbox) {
				display: none !important;
			  }
			  #places #placesToolbox #placesToolbar #clearDownloadsButton,
			  #places #placesToolbox #placesToolbar #closeButton {
				position: fixed;
				bottom: 7px;
				width: 86px !important;
				-webkit-appearance: button !important;
				   -moz-appearance: button !important;
						appearance: button !important;
				-moz-default-appearance: button !important;
				color-scheme: light !important;
			  }
			  #places #placesToolbox #placesToolbar #clearDownloadsButton[disabled],
			  #places #placesToolbox #placesToolbar #closeButton[disabled] {
				opacity: 1 !important;
			  }
			  #places #placesToolbox #placesToolbar #clearDownloadsButton {
				right: 107px !important;
			  }
			  #places #placesToolbox #placesToolbar #closeButton {
				right: 11px !important;
			  }
			  #places #placesToolbox #placesToolbar search-textbox {
				-webkit-appearance: textfield !important;
				   -moz-appearance: textfield !important;
						appearance: textfield !important;
				max-width: 252px !important;
				min-height: 22px !important;
				height: 22px !important;
				position: relative !important;
			  }
			  #places #placesToolbox #placesToolbar search-textbox[focused] {
				box-shadow: none !important;
				background-color: inherit !important;
				border-color: transparent;
				outline: none !important;
			  }
			  #places #placesView #placesList {
				min-width: 0 !important;
				width: 0 !important;
				max-width: 0 !important;
			  }
			  #places #contentView {
				background-color: var(--background2) !important;
			  }
			  #places #contentView #placesViewsBox {
				border-bottom: 1px solid var(--border2) !important;
				margin-bottom: 39px !important;
			  }
			  #places #contentView #placesViewsBox richlistbox {
				border: 0 !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox {
				padding: 25px 9px !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem {
				min-height: 77px !important;
				align-items: center !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem:not([selected=true]) {
				border-bottom: 1px var(--border3) solid !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadMainArea {
				padding: 14px 29px !important;
				width: calc(100% - 200px);
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadMainArea .downloadTypeIcon {
				display: none !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadMainArea .downloadContainer .downloadTarget {
				font-size: 12pt !important;
				width: 50% !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton {
				height: 25px !important;
				min-width: 85px !important;
				padding: 0 !important;
				margin-right: 33px !important;
				color: var(--button-color) !important;
				border: 1px solid var(--button-border) !important;
				outline: 1px solid var(--button-outline) !important;
				background: var(--button-background) !important;
				justify-content: center !important;
				border-radius: 5px !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:hover {
				background: var(--button-background-hover) !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:active, #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton[open=true] {
				background: var(--button-background-active) !important;
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton::before {
				content: attr(tooltiptext);
			  }
			  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton .button-box {
				display: none !important;
			  }
			  @supports -moz-bool-pref("BeautyFox.appearance.IE10") {
				#places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton {
				  outline: none !important;
				  border-radius: 0 !important;
				}
				#places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:hover {
				  border: 1px solid var(--button-border-hover) !important;
				}
				#places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:active, #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton[open=true] {
				  border: 1px solid var(--button-border-active) !important;
				}
			  }
			  
			  .textbox-search-icons {
				display: grid !important;
				height: 18px !important;
				width: 18px !important;
			  }
			  .textbox-search-icons .textbox-search-icon {
				list-style-image: url(chrome://userchrome/content/images/search7.svg) !important;
				height: 16px !important;
				width: 16px !important;
			  }
			  .textbox-search-icons .textbox-search-clear {
				list-style-image: url(images/clear.svg) !important;
				height: 18px !important;
				width: 18px !important;
				margin-top: -1px !important;
			  }
			  .textbox-search-icons .textbox-search-clear:hover {
				list-style-image: url(images/clear-hover.svg) !important;
			  }/*# sourceMappingURL=downloads.css.map */
			`

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