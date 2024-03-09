// ==UserScript==
// @name        BeautyFox - Checkbox Fixer
// @description Fixes checkboxes by setting them to native look.
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function convertFindBarCheckboxesToNativeLook() {
    document.querySelectorAll("[anonid='highlight']").forEach(element => {
		element.setAttribute("native", true);
	});

	document.querySelectorAll("[anonid='find-case-sensitive']").forEach(element => {
		element.setAttribute("native", true);
	});

	document.querySelectorAll("[anonid='find-match-diacritics']").forEach(element => {
		element.setAttribute("native", true);
	});

	document.querySelectorAll("[anonid='find-entire-word']").forEach(element => {
		element.setAttribute("native", true);
	});
}
window.addEventListener("findbaropen", convertFindBarCheckboxesToNativeLook)

function convertCustomizationPaletteCheckBoxesToNativeLook() {
	document.querySelectorAll("#customization-titlebar-visibility-checkbox").forEach(element => {
		element.setAttribute("native", true);
	});
}
window.addEventListener("customizationstarting", convertCustomizationPaletteCheckBoxesToNativeLook)