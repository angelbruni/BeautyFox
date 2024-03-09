// ==UserScript==
// @name        BeautyFox - URL and Search Bar
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function secureStateTextFieldBackground() {
	const identityIconBox = document.getElementById("identity-icon-box");

	const previousCustomIdentityLabel = document.getElementById("custom-identity-label");
	if (previousCustomIdentityLabel) {
		previousCustomIdentityLabel.remove();
	}

	const customIdentityLabel = document.createXULElement('label');
	customIdentityLabel.id = "custom-identity-label";
	identityIconBox.appendChild(customIdentityLabel);

	const navBarCustomizationTarget = document.getElementById("nav-bar-customization-target");
	
	const attr = "securestate"
	switch (gBrowser.selectedTab.linkedBrowser.securityUI.state) {
		case 2:
			document.documentElement.setAttribute(attr, "secure")
			navBarCustomizationTarget.setAttribute(attr, "secure")
			break;
		case 4:
			document.documentElement.setAttribute(attr, "browser")
			navBarCustomizationTarget.setAttribute(attr, "browser")
			break;
		case 1048578:
			document.documentElement.setAttribute(attr, "ev")
			navBarCustomizationTarget.setAttribute(attr, "ev")
			customIdentityLabel.textContent = gIdentityHandler.getIdentityData().cert.organization + " ["+ gIdentityHandler.getIdentityData().country +"]";
			break;
		case 67108866:
			document.documentElement.setAttribute(attr, "insecure")
			navBarCustomizationTarget.setAttribute(attr, "insecure")
			customIdentityLabel.textContent = "Certificate error";
			break;
	}
}
window.addEventListener("TabAttrModified", secureStateTextFieldBackground)

// TODO: Switch mutationObserver to existing Firefox API if possible. (Doesn't seem possible at the moment.)
function removeReloadWhenTyping() {
	var refreshBtn = document.getElementById("stop-reload-button");
	const reloadButton = document.getElementById("reload-button");
	const urlbarInputContainer = document.getElementById("urlbar-input-container");
	const urlbar = document.getElementById("urlbar");
	const urlbarObserverConfig = { attributes: true, childList: false, subtree: false };
	const urlbarObserverCallback = (mutationList) => {
		for (const mutation of mutationList) {
			if (mutation.type === "attributes") {
				if (urlbar.hasAttribute("usertyping") && urlbar.hasAttribute("focused")) {
					reloadButton.classList.add("reload-button-display-none");
					urlbarInputContainer.classList.add("urlbar-remove-padding-right");
					refreshBtn.classList.add("stop-reload-button-margin");
				}
				else {
					reloadButton.classList.remove("reload-button-display-none");
					urlbarInputContainer.classList.remove("urlbar-remove-padding-right");
					refreshBtn.classList.remove("stop-reload-button-margin");
				}
			}
		}
	};
	const urlbarObserver = new MutationObserver(urlbarObserverCallback);
	urlbarObserver.observe(urlbar, urlbarObserverConfig);
}

function changeUrlbarFakeDropdownStyling() {
    function removeUrlbarFakeDropdownStyling() {
        document.documentElement.style.removeProperty("--urlbar-fake-dropdown-mask");
        document.documentElement.style.removeProperty("--urlbar-fake-dropdown-mask-position");
    }

    if (document.querySelector(".searchbar-textbox") == null) {
        removeUrlbarFakeDropdownStyling();
    } else if (pref("BeautyFox.option.bTabsOnNavRow").tryGet.bool()) {
        removeUrlbarFakeDropdownStyling();
    } else {
        document.documentElement.style.setProperty("--urlbar-fake-dropdown-mask", "url(images/nosearch-dropdown-mask.svg");
        document.documentElement.style.setProperty("--urlbar-fake-dropdown-mask-position", "center");
    }
}
window.addEventListener("customizationending", changeUrlbarFakeDropdownStyling)

// TODO: Switch mutationObserver to existing Firefox API if possible. (Doesn't seem possible at the moment.)
function urlbarContainerBackgroundOnMouseAttrs() {
    var stopReloadBtn = document.getElementById("stop-reload-button");
    var urlbarContainer = document.getElementById("urlbar-container");

    stopReloadBtn.addEventListener("mouseenter", function() { urlbarContainer.classList.add("toolbar-hover-fix"); })
    stopReloadBtn.addEventListener("mouseleave", function() { urlbarContainer.classList.remove("toolbar-hover-fix"); })

    urlbarContainer.addEventListener("mouseenter", function() { stopReloadBtn.classList.add("toolbar-hover-fix"); })
    urlbarContainer.addEventListener("mouseleave", function() { stopReloadBtn.classList.remove("toolbar-hover-fix"); })

    var targetNode = document.getElementById("urlbar");
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes") {
                const breakoutExtendValue = targetNode.getAttribute("breakout-extend");
                if (breakoutExtendValue) 
					stopReloadBtn.setAttribute("urlbarfocus", true);
                else 
					stopReloadBtn.setAttribute("urlbarfocus", false);
            }
        });
    });
    const config = { attributes: true };
    observer.observe(targetNode, config);
}

function addEllipsesSearch() {
    setTimeout(() => {
        if (document.querySelector(".searchbar-textbox")) {
            const searchPlaceholderClass = document.querySelector(".searchbar-textbox")
            const searchPlaceholderText = searchPlaceholderClass.getAttribute("placeholder");
            const SearchPlacegolderTextEllipses = searchPlaceholderText + '...';
    
            searchPlaceholderClass.setAttribute("placeholder", SearchPlacegolderTextEllipses.toString());
        } 
    }, 1000);
}

function fixUrlbarHeight() {
	const urlbar = document.getElementById("urlbar");
	const urlbarHeight = '24px';

	setTimeout(() => {
		urlbar.style.setProperty("--urlbar-height", urlbarHeight);
		urlbar.style.setProperty("--urlbar-toolbar-height", urlbarHeight);
	}, 500);	
}