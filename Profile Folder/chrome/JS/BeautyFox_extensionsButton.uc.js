// ==UserScript==
// @name        BeautyFox - Extensions Button
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function moveExtensionsBtn() {
    let unifiedExtensionsButton = document.getElementById("unified-extensions-button");

    if (unifiedExtensionsButton) {
        let personalBookmarks = document.getElementById("personal-bookmarks");
        let personalToolbar = document.getElementById("PersonalToolbar");
        let endToolbar = document.getElementById("endToolbar");
        let IEMenuButton = document.getElementById("IEMenuButton");
		
        unifiedExtensionsButton.setAttribute("locale", "getMoreAddons");
		unifiedExtensionsButton.style.cssText = null;

		switch (pref("BeautyFox.option.storedExtensionsButtonChoice").tryGet.int()) {
			case 0:
				unifiedExtensionsButton.style.cssText = 'appearance: none !important; max-width: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; position: absolute; opacity: 0; pointer-events: none;';
				break;
			case 1:
				if (personalBookmarks && personalToolbar) {
					unifiedExtensionsButton.parentNode.removeChild(unifiedExtensionsButton);
					personalToolbar.insertBefore(unifiedExtensionsButton, personalBookmarks);
				}
				break;
			case 2:
				if (endToolbar && IEMenuButton) {
					unifiedExtensionsButton.parentNode.removeChild(unifiedExtensionsButton);
					endToolbar.insertBefore(unifiedExtensionsButton, IEMenuButton);
				}
		}
    }
}