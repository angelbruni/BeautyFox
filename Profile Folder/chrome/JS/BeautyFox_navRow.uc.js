// ==UserScript==
// @name        BeautyFox - Navigation Row
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function setNavButtonsRadius() {
    try { document.getElementById("navButtonsRadiusStyle").remove(); } catch (error) {}

    let navButtonsRadius = pref("BeautyFox.option.iNavigationButtonsRadius").tryGet.int();
    if (navButtonsRadius < 50) {
        let navButtonsRadiusStyle = document.createElement("style");
        navButtonsRadiusStyle.id = "navButtonsRadiusStyle";
        navButtonsRadiusStyle.innerHTML = `
            :root {
                --navButtons-radius: `+ navButtonsRadius +`%;
            }

            #main-window #nav-bar::before {
                content: unset !important;
            }
        `
        document.head.appendChild(navButtonsRadiusStyle);  
    }
}

function updateSettingsAppearance() {
	const hideSettingsPopup = pref("BeautyFox.option.bHideSettingsInPopUp").tryGet.bool();
	hideSettingsPopup ? document.documentElement.setAttribute("hidesettingspopup", "true") : document.documentElement.removeAttribute("hidesettingspopup");

	const useNewSettingsIcon = pref("BeautyFox.option.bDoNotUseOldSettingsIcon").tryGet.bool();
	useNewSettingsIcon ? document.documentElement.setAttribute("newsettingsicon", "true") : document.documentElement.removeAttribute("newsettingsicon");
}