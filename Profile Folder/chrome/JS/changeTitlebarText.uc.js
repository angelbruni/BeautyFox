// ==UserScript==
// @name			Change Titlebar Text
// @description 	Changes Firefox's Titlebar Text
// @author			Travis
// @include			main
// ==/UserScript==


// Mozilla Firefox's window name (e.g. Example - Windows Internet Explorer)
var TitlebarText = "Internet Explorer"; 
// Private Browsing's label (e.g. Example - Windows Internet Explorer [InPrivate])
var PrivateBrowsingLabel = "[InPrivate]"; 


var ReplaceFirefoxTitlebar = {
 init: function() {
   try {

	document.addEventListener("TabAttrModified", updateTitle(), false);
	document.addEventListener('TabSelect', updateTitle(), false);
	document.addEventListener('TabOpen', updateTitle(), false);
	document.addEventListener('TabClose', updateTitle(), false);
	document.addEventListener('load', updateTitle(), false);
	updateTitle();

	function updateTitle() {
		function setAttributes(element, attributes) {
				Object.keys(attributes).forEach(attr => {
				element.setAttribute(attr, attributes[attr]);
			});
		}
		const attributes = {
			"data-content-title-default": "CONTENTTITLE - "+TitlebarText+"",
			"data-title-default": ""+TitlebarText+"",
			"data-content-title-private": "CONTENTTITLE - "+TitlebarText+" - "+PrivateBrowsingLabel+"",
			"data-title-private": ""+TitlebarText+" - "+PrivateBrowsingLabel+"",
		};
		const mainwindow = document.getElementById("main-window");
		setAttributes(mainwindow, attributes);
	}

  } catch(e) {}
 }
};

document.addEventListener("DOMContentLoaded", ReplaceFirefoxTitlebar.init(), false);