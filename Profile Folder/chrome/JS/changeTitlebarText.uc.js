// ==UserScript==
// @name		Change Titlebar Text
// @description	Changes Firefox's Titlebar Text
// @author		Travis
// @include		main
// ==/UserScript==


// Mozilla Firefox's window name (e.g. Example - Internet Explorer)
var TitlebarText = "Internet Explorer";
// Private Browsing's label (e.g. Example - Internet Explorer [InPrivate])
var PrivateBrowsingLabel = "[InPrivate]";

var ReplaceFirefoxTitlebar = {
	init: function () {
		try {
			function updateTitle() {
				function setAttributes(element, attributes) {
					Object.keys(attributes).forEach(attr => {
						element.setAttribute(attr, attributes[attr]);
					});
				}
				const attributes = {
					"data-content-title-default": "CONTENTTITLE - " + TitlebarText + "",
					"data-title-default": "" + TitlebarText + "",
					"data-content-title-private": "CONTENTTITLE - " + TitlebarText + " - " + PrivateBrowsingLabel + "",
					"data-title-private": "" + TitlebarText + " - " + PrivateBrowsingLabel + "",
				};
				const mainwindow = document.getElementById("main-window");
				setAttributes(mainwindow, attributes);
			}
			updateTitle();

			document.addEventListener("TabAttrModified", updateTitle(), false);
			document.addEventListener('TabSelect', updateTitle(), false);
			document.addEventListener('TabOpen', updateTitle(), false);
			document.addEventListener('TabClose', updateTitle(), false);
			document.addEventListener('load', updateTitle(), false);
		} catch (e) {
			console.error(e)
		}
	}
};

document.addEventListener("DOMContentLoaded", ReplaceFirefoxTitlebar.init(), false);