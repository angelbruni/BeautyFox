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
	if (pref("BeautyFox.option.bHideSettingsInPopUp").tryGet.bool())
		document.documentElement.setAttribute("hidesettingspopup", "true")
	else
		document.documentElement.removeAttribute("hidesettingspopup")

	if (pref("BeautyFox.option.bDoNotUseOldSettingsIcon").tryGet.bool())
		document.documentElement.setAttribute("newsettingsicon", "true")
	else
		document.documentElement.removeAttribute("newsettingsicon")
	
}