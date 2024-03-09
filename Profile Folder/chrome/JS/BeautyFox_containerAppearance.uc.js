// ==UserScript==
// @name		BeautyFox - Container Appearance
// @author		AngelBruni
// @loadorder	3
// ==/UserScript==

function setContainerAppearance() {
	const navBar = document.getElementById("nav-bar");

	setTimeout(() => {
		const userContextIcons = document.getElementById("userContext-icons");
		const containerColour = getComputedStyle(userContextIcons).getPropertyValue("--identity-icon-color");
		
		if (userContextIcons.hasAttribute("hidden")) { 
			navBar.removeAttribute("iscontainer") 
			navBar.style.removeProperty("--containerColour")
		} else { 
			navBar.style.setProperty("--containerColour", containerColour)
			navBar.setAttribute("iscontainer", "true");
		}
	}, 0);
}
window.addEventListener("TabSelect", setContainerAppearance);