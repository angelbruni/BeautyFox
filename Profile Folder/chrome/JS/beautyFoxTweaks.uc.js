function downloadsButton() {
    var downloadsButton = document.getElementById('downloads-button');
    downloadsButton.setAttribute('onmousedown','');
    downloadsButton.setAttribute('oncommand','BrowserDownloadsUI();');
}

function addContainerSupport() {
	const navBar = document.getElementById("nav-bar");

	// Select the node that will be observed for mutations
	const userContextIcons = document.getElementById("userContext-icons");

	// Options for the observer (which mutations to observe)
	const userContextIconsObserverConfig = { attributes: true, childList: false, subtree: false };

	// Callback function to execute when mutations are observed
	const userContextIconsObserverCallback = (mutationList, observer) => {
	for (const mutation of mutationList) {
		if (mutation.type === "attributes") {
			var desiredColour = getComputedStyle(userContextIcons).getPropertyValue('--identity-icon-color');

			if (userContextIcons.hasAttribute("hidden")) {
				navBar.setAttribute("style", "")
			}
			else {
				navBar.setAttribute("style", "--navButtons-colour:" + desiredColour + "!important;" + "--navButtons-disabled-colour:" + desiredColour + "!important;" + "margin-left: 28px !important")
			}
		}
	}
	};

	// Create an observer instance linked to the callback function
	const userContextIconsObserver = new MutationObserver(userContextIconsObserverCallback);

	// Start observing the target node for configured mutations
	userContextIconsObserver.observe(userContextIcons, userContextIconsObserverConfig);
}

function convertCheckboxesToNativeLook() {
    const config = { childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode.nodeName.toLowerCase() === 'findbar') {
                        var findbarHighlight = addedNode.querySelector('[anonid="highlight"]');
                        var findbarCaseSensitive = addedNode.querySelector('[anonid="find-case-sensitive"]');
                        var findbarMatchDiacritics = addedNode.querySelector('[anonid="find-match-diacritics"]');
                        var findbarEntireWord = addedNode.querySelector('[anonid="find-entire-word"]');

                        findbarHighlight.setAttribute('native', 'true');
                        findbarCaseSensitive.setAttribute('native', 'true');
                        findbarMatchDiacritics.setAttribute('native', 'true');
                        findbarEntireWord.setAttribute('native', 'true');
                    }
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);
}

function fixTabs() {
    // Create a new element
    var newToolbar = document.createElement('hbox');
    newToolbar.id = 'newToolbar';

    // Get the #navigator-toolbox element
    var navigatorToolbox = document.getElementById('navigator-toolbox');

    // Get the #PersonalToolbar element
    var personalToolbar = document.getElementById('PersonalToolbar');

    // Insert the new element before the #PersonalToolbar children
    navigatorToolbox.insertBefore(newToolbar, personalToolbar);

    var navBar = document.getElementById('nav-bar');
    newToolbar.appendChild(navBar)

    if (getComputedStyle(document.documentElement).getPropertyValue('--option_tabsOnNavRow') == 1) {
        var tabsToolbar = document.getElementById('TabsToolbar');
        newToolbar.appendChild(tabsToolbar);
    }

    var endToolbarLabel = 'End Toolbar';
    var endToolbar = document.createXULElement('toolbar');
    endToolbar.setAttribute('id','endToolbar');
    endToolbar.setAttribute('collapsed', 'false');
    endToolbar.setAttribute('toolbarname', endToolbarLabel);
    endToolbar.setAttribute('defaultset','spring,spring'); 
    endToolbar.setAttribute('customizable','true');
    endToolbar.setAttribute('mode','icons');
    endToolbar.setAttribute('iconsize','small');
    endToolbar.setAttribute('context','toolbar-context-menu');
    endToolbar.setAttribute('lockiconsize','true');
    endToolbar.setAttribute('class','toolbar-primary chromeclass-toolbar browser-toolbar customization-target');
    newToolbar.appendChild(endToolbar);		
    CustomizableUI.registerArea('endToolbar', {legacy: true});
    CustomizableUI.registerToolbarNode(endToolbar);
}

function insecureToolbarFieldBackground() {
	const navBarCustomizationTarget = document.getElementById("nav-bar-customization-target")
	const identityBox = document.getElementById("identity-box");
	const identityBoxObserverConfig = { attributes: true };
	const identityBoxObserverCallback = (mutationList, observer) => {
	for (const mutation of mutationList) {
	if (mutation.type === "attributes") {
		if (identityBox.classList.contains("certErrorPage")) {
			navBarCustomizationTarget.setAttribute("style", "--toolbar-field-background-color: rgba(255, 71, 97, 0.59) !important; --toolbar-field-background-color_hover: rgba(255, 143, 164, 0.61);")
		}
		else {
			navBarCustomizationTarget.setAttribute("style", "")
		}
	}
	}
	};
	const identityBoxObserver = new MutationObserver(identityBoxObserverCallback);
	identityBoxObserver.observe(identityBox, identityBoxObserverConfig);
}

function moveExtensionsBtn() {
    // Get the elements
    var unifiedExtensionsButton = document.getElementById('unified-extensions-button');
    var personalBookmarks = document.getElementById('personal-bookmarks');
    var personalToolbar = document.getElementById('PersonalToolbar');
    var endToolbar = document.getElementById('endToolbar');
    var IEMenuButton = document.getElementById('IEMenuButton');

    // Check if the button exist on the page
    if (unifiedExtensionsButton) {
        // Check if the elements exist on the page
        if (Services.prefs.getBoolPref('BeautyFox.option.moveExtensionsButtonToEndToolbar')) {
            if (endToolbar && IEMenuButton) {
                // Remove #unified-extensions-button from its current position
                unifiedExtensionsButton.parentNode.removeChild(unifiedExtensionsButton);
                
                // Insert #unified-extensions-button before #personal-bookmarks in #PersonalToolbar
                endToolbar.insertBefore(unifiedExtensionsButton, IEMenuButton);
            }
        } else {
            if (personalBookmarks && personalToolbar) {
                // Remove #unified-extensions-button from its current position
                unifiedExtensionsButton.parentNode.removeChild(unifiedExtensionsButton);
                
                // Insert #unified-extensions-button before #personal-bookmarks in #PersonalToolbar
                personalToolbar.insertBefore(unifiedExtensionsButton, personalBookmarks);
            }
        }
    }
}

function removeReloadWhenTyping() {
	var refreshBtn = document.getElementById('stop-reload-button');
	const reloadButton = document.getElementById("reload-button");
	const urlbarInputContainer = document.getElementById("urlbar-input-container");
	const urlbar = document.getElementById("urlbar");
	const urlbarObserverConfig = { attributes: true, childList: false, subtree: false };
	const urlbarObserverCallback = (mutationList, observer) => {
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

function removeUrlbarFakeDropdownStyling() {
    document.documentElement.style.removeProperty('--urlbar-dropdown-button_width');
    document.documentElement.style.removeProperty('--urlbar-fake-dropdown-mask');
    document.documentElement.style.removeProperty('--urlbar-fake-dropdown-mask-position');
}

function setUrlbarFakeDropdownStyling() {
    document.documentElement.style.setProperty('--urlbar-dropdown-button_width', '17px');
    document.documentElement.style.setProperty('--urlbar-fake-dropdown-mask', 'url(images/dropdown-mask.svg');
    document.documentElement.style.setProperty('--urlbar-fake-dropdown-mask-position', 'center');
}

function changeUrlbarFakeDropdownStyling() {
    if (document.querySelector('.searchbar-textbox') == null) {
        removeUrlbarFakeDropdownStyling();
    }
    else if (getComputedStyle(document.documentElement).getPropertyValue('--option_tabsOnNavRow') == 1) {
        removeUrlbarFakeDropdownStyling();
    } else {
        setUrlbarFakeDropdownStyling();
    }
}

function changeFakeDropdownAccordingly() {
    changeUrlbarFakeDropdownStyling();

    // Target
    const navBarCustomizationTarget = document.getElementById("nav-bar-customization-target")

    // Which mutations to observe
    const navBarCustomizationTargetObserverConfig = { attributes: false, childList: true, subtree: false };

    // Callback function to execute when mutations are observed
    const navBarCustomizationTargetObserverCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            changeUrlbarFakeDropdownStyling()
        }
    }
    };

    // Create an observer instance linked to the callback function
    const navBarCustomizationTargetObserver = new MutationObserver(navBarCustomizationTargetObserverCallback);

    // Start observing the target node for configured mutations
    navBarCustomizationTargetObserver.observe(navBarCustomizationTarget, navBarCustomizationTargetObserverConfig);
}

function setnavButtonsRadius() {
    var navButtonsRadiusStyle = document.createElement('style');
    var navButtonsRadius;

    try {
        navButtonsRadius = Services.prefs.getIntPref('BeautyFox.option.navButtonsRadius');

        if (Services.prefs.getIntPref('BeautyFox.option.navButtonsRadius') < 50) {
            var navButtonsTravelBackgroundStyle = document.createElement('style');
            navButtonsTravelBackgroundStyle.innerHTML = `
                #main-window #nav-bar::before {
                    content: unset !important;
                }
            `
            document.head.appendChild(navButtonsTravelBackgroundStyle);
        }
    } catch {
        navButtonsRadius = 50;
    }

    navButtonsRadiusStyle.innerHTML = `
        :root {
            --navButtons-radius: `+ navButtonsRadius +`%;
        }
    `

    document.head.appendChild(navButtonsRadiusStyle);
}

function urlbarContainerBackgroundOnMouseAttrs() {
    var stopReloadBtn = document.getElementById('stop-reload-button');
    var urlbarContainer = document.getElementById('urlbar-container');

    stopReloadBtn.addEventListener('mouseenter', function() {
        urlbarContainer.classList.add('toolbar-hover-fix');
    })

    stopReloadBtn.addEventListener('mouseleave', function() {
        urlbarContainer.classList.remove('toolbar-hover-fix');
    })

    urlbarContainer.addEventListener('mouseenter', function() {
        stopReloadBtn.classList.add('toolbar-hover-fix');
    })

    urlbarContainer.addEventListener('mouseleave', function() {
        stopReloadBtn.classList.remove('toolbar-hover-fix');
    })
}