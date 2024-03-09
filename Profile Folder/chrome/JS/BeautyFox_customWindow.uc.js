// ==UserScript==
// @name        BeautyFox - Custom Window
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function launchBeautyFoxWizard() {
	if (!pref("BeautyFox.option.bDoNotRunWizardInNextStart").tryGet.bool())
		openWindow("wizard", "chrome,centerscreen")
}

const openBeautyFoxOptionsDialog = () => openWindow("options", "chrome,centerscreen");