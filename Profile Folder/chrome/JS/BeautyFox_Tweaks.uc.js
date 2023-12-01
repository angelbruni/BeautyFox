// ==UserScript==
// @name			BeautyFox Tweaks
// @description 	Changes some Firefox functionality to work more like Internet Explorer.
// @author			AngelBruni
// ==/UserScript==

function downloadsButton() {
    try {
        var downloadsButton = document.getElementById('downloads-button');
        downloadsButton.setAttribute('onmousedown','');
        downloadsButton.setAttribute('oncommand','BrowserDownloadsUI();');
    } catch (e) {
        console.log(e);
    }
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
    document.documentElement.style.removeProperty('--urlbar-fake-dropdown-mask');
    document.documentElement.style.removeProperty('--urlbar-fake-dropdown-mask-position');
}

function setUrlbarFakeDropdownStyling() {
    document.documentElement.style.setProperty('--urlbar-fake-dropdown-mask', 'url(images/nosearch-dropdown-mask.svg');
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

    var targetNode = document.querySelector('#urlbar');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'breakout-extend') {
                const breakoutExtendValue = targetNode.getAttribute('breakout-extend');
                if (breakoutExtendValue === 'true') {
                    stopReloadBtn.setAttribute('urlbarFocus', 'true');
                } else {
                    stopReloadBtn.setAttribute('urlbarFocus', 'false');
                }
            }
        });
    });
    const config = { attributes: true };
    observer.observe(targetNode, config);
}

function createFakeTitlebarSpace() {
    // Create a new div element
    var fakeTitlebarSpace = document.createElement("vbox");

    // Set some properties for the new div (optional)
    fakeTitlebarSpace.id = "fakeTitlebarSpace";

    // Get the reference to the parent element
    var parentElement = document.querySelector("#navigator-toolbox-background");

    // Insert the new div before the #navigator-toolbox-background element
    parentElement.parentNode.insertBefore(fakeTitlebarSpace, parentElement);

    // Check if the user agent is not macOS
    if (!navigator.userAgent.includes("Macintosh")) {
        // Get all elements with the class "titlebar-buttonbox-container"
        var titlebarButtonboxContainers = document.querySelectorAll(".titlebar-buttonbox-container");

        // Move each element to the new div
        titlebarButtonboxContainers.forEach(function(element) {
            fakeTitlebarSpace.appendChild(element);
        });
    }
}

// #region windowsOnly
function openFakeIEAbout() {
    for (let win of Services.wm.getEnumerator("Browser:AboutIE")) {
        // Only open one about window
        if (win.closed) {
            continue;
        }
        win.focus();
        return;
    }

    var features = "chrome,centerscreen,dependent,modal";

    window.openDialog('chrome://userchrome/content/windows/aboutIE/index.xhtml', '', features); 
}
function callShellAboutWIE() {
    // Path to iexplore.exe
    const szPath = "C:\\Program Files\\Internet Explorer\\iexplore.exe";

    // Define necessary data types
    const HICON = ctypes.uintptr_t;
    const HWND = ctypes.voidptr_t;

    // Load the user32 and shell32 libraries
    const user32 = ctypes.open("user32.dll");
    const shell32 = ctypes.open("shell32.dll");

    // Define necessary functions from user32 and shell32
    const ExtractIcon = shell32.declare("ExtractIconW", ctypes.winapi_abi, HICON, ctypes.voidptr_t, ctypes.char16_t.ptr, ctypes.uint32_t);
    const GetDesktopWindow = user32.declare("GetDesktopWindow", ctypes.winapi_abi, HWND);
    const ShellAboutW = shell32.declare("ShellAboutW", ctypes.winapi_abi, ctypes.voidptr_t, HWND, ctypes.char16_t.ptr, ctypes.char16_t.ptr, HICON);

    // Get the icon from iexplore.exe
    const hIcon = ExtractIcon(null, szPath, 0);
    if (hIcon == 0 || hIcon == ctypes.voidptr_t(0)) {
        // Handle error if ExtractIcon fails
        alert("Failed to extract icon from iexplore.exe");
    } else {
        // Get the handle to the parent window (use desktop window as parent)
        const hwndParent = GetDesktopWindow();

        // Set the title and text for the ShellAboutW dialog box
        const lpszTitle = "Internet Explorer";
        const lpszText = null;
        
        ShellAboutW(hwndParent, lpszTitle, lpszText, hIcon);

        // Destroy the icon handle after using it
        shell32.close();
        user32.close();
    }
}
function openAboutIE() {
    let isIE11Win10 = false;
    try {
        isIE11Win10 = Services.prefs.getBoolPref("BeautyFox.appearance.IE11Win10");
    } catch (error) {}

    if (isIE11Win10) {
        callShellAboutWIE();
    } else {
        openFakeIEAbout();
    }
}

function addEllipsesSearch() {
    setTimeout(() => {
        if (document.querySelector('.searchbar-textbox')) {
            const searchPlaceholderClass = document.querySelector('.searchbar-textbox')
            const searchPlaceholderText = searchPlaceholderClass.getAttribute('placeholder');
            const SearchPlacegolderTextEllipses = searchPlaceholderText + '...';
    
            searchPlaceholderClass.setAttribute('placeholder', SearchPlacegolderTextEllipses.toString());
        } 
    }, 0);
}

function reportUnsafeWebsite() {
    _ucUtils.loadURI(window,{
        url: 'https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site',
        where: 'tab'
    });
}

function openBeautyFoxWizardWindow(verifyFirstRun) {
    if (verifyFirstRun) {
        let isBeautyFoxFirstRunFinished = false;
        try {
            isBeautyFoxFirstRunFinished = Services.prefs.getBoolPref("BeautyFox.parameter.isFirstRunFinished");
        } catch (error) {}
        
        if (!isBeautyFoxFirstRunFinished) {
            Services.prefs.setBoolPref('BeautyFox.parameter.isFirstRunFinished', false)

            launchBeautyFoxWizard();
        }
    } else {
        launchBeautyFoxWizard();
    }
}
function launchBeautyFoxWizard() {
    var features = "chrome,centerscreen,resizeable=no,dependent,modal";
    window.openDialog('chrome://userchrome/content/windows/beautyFoxWizard/index.xhtml', "BeautyFox Wizard", features); 
}

function openInternetOptions() {
    try {
        if (Services.prefs.getBoolPref("BeautyFox.option.inetcpl")) {
            openinetcpl();
        } else {
            openPreferences();
        }
    } catch {
        openPreferences();
    }   
}
function openinetcpl() {
    runFile("Rundll32.exe", "shell32.dll,Control_RunDLL inetcpl.cpl")
}

function runFile(filePath, commandLineArgs) {
    // Define necessary types
    const HWND = ctypes.voidptr_t;
    const LPCWSTR = ctypes.jschar.ptr;
    const HINSTANCE = ctypes.voidptr_t;
    const UINT = ctypes.uint32_t;
    const SW = {
        SHOWNORMAL: 1
    };

    // Load shell32.dll
    const shell32 = ctypes.open("shell32.dll");

    // Declare ShellExecuteW function
    const ShellExecuteW = shell32.declare(
        "ShellExecuteW",
        ctypes.winapi_abi,
        HINSTANCE,
        HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, UINT
    );

    // Convert the path and arguments to wide strings
    const filePathWide = ctypes.jschar.array()(filePath);
    const commandLineArgsWide = ctypes.jschar.array()(commandLineArgs);

    // Use ShellExecuteW to start msedge.exe
    const hInstance = ShellExecuteW(
        null,
        "open",
        filePathWide,
        commandLineArgsWide,
        null,
        SW.SHOWNORMAL
    );

    // Check if ShellExecuteW was successful
    if (hInstance <= 32) {
        // Handle error (you can add your own error-handling code here)
        // Example: dump("Error starting Edge: " + hInstance.toString() + "\n");
    }

    // Close the shell32.dll library
    shell32.close();
}
function launchNetworkDiagnostics() {
	runFile("msdt.exe", "-skip TRUE -path C:\\Windows\\diagnostics\\system\\networking -ep NetworkDiagnosticsConnectivity")
}
function openWindowsUpdate() {
    runFile("control.exe", "/name Microsoft.WindowsUpdate") 
}

function openWhatsNewIE() {
    var whatsNewURL = null;

    if (IsIE11Appearance) {
        whatsNewURL = 'https://betawiki.net/wiki/Internet_Explorer_11';
    }
    else if (IsIE10DeveloperPreviewAppearance || IsIE10ConsumerPreviewAppearance || IsIE10ReleasePreviewAppearance || IsIE10Appearance) {
        whatsNewURL = 'https://betawiki.net/wiki/Internet_Explorer_10';
    }
    else {
        whatsNewURL = 'https://betawiki.net/wiki/Internet_Explorer_9';
    }

    _ucUtils.loadURI(window,{url: whatsNewURL, where: 'tab'})
}

function getAndSetUserAccentColor() {
	if (Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS == "WINNT") {
		const advapi32 = ctypes.open("advapi32.dll");

		if (!advapi32) {
			console.error("Failed to load advapi32.dll");
		} else {
			const HKEY = ctypes.voidptr_t;
			const DWORD = ctypes.unsigned_long;
			const KEY_READ = 0x20019;
			const LPBYTE = ctypes.voidptr_t;
			const LPDWORD = ctypes.voidptr_t;
			const LPCTSTR = ctypes.jschar.ptr;

			const HKEY_CURRENT_USER = ctypes.cast(ctypes.uintptr_t(0x80000001), HKEY);
			const HKEY_LOCAL_MACHINE = ctypes.cast(ctypes.uintptr_t(0x80000002), HKEY);

			const RegOpenKeyExW = advapi32.declare("RegOpenKeyExW",
				ctypes.winapi_abi,
				ctypes.int,
				HKEY,      // hKey
				LPCTSTR,   // lpSubKey
				DWORD,     // ulOptions
				DWORD,     // samDesired
				HKEY.ptr); // phkResult

			const RegQueryValueExW = advapi32.declare("RegQueryValueExW",
				ctypes.winapi_abi,
				ctypes.int,
				HKEY,     // hKey
				LPCTSTR,  // lpValueName
				LPDWORD,  // lpReserved
				LPDWORD,  // lpType
				LPBYTE,   // lpData
				LPDWORD); // lpcbData

			var hKey = HKEY();

			var result = RegOpenKeyExW(HKEY_CURRENT_USER, "SOFTWARE\\Microsoft\\Windows\\DWM", 0, KEY_READ, hKey.address());

			if (result === 0) {
				var color = DWORD();
				var size = DWORD();
				size.value = 4; // Size of a DWORD in bytes

				var queryResult = RegQueryValueExW(hKey, "AccentColor", null, null, color.address(), size.address());

				if (queryResult === 0) {
					var red = (color.value & 0xFF);
					var green = ((color.value >> 8) & 0xFF);
					var blue = ((color.value >> 16) & 0xFF);
				} else {
					console.log("Failed to read accent color from registry. RegQueryValueExW error code: " + queryResult);
				}
			} else {
				console.log("Failed to open registry key. RegOpenKeyExW error code: " + result);
			}

			try {
				if (Services.prefs.getBoolPref("BeautyFox.option.AWMAccentColorNavButtons")) {
					var result = RegOpenKeyExW(HKEY_LOCAL_MACHINE, "SOFTWARE\\AWM", 0, KEY_READ, hKey.address());
					if (result === 0) {
						// Read and get HKEY_LOCAL_MACHINE\SOFTWARE\AWM\Window_ColorRActive, HKEY_LOCAL_MACHINE\SOFTWARE\AWM\Window_ColorGActive, HKEY_LOCAL_MACHINE\SOFTWARE\AWM\Window_ColorBActive decimal values
						var rValue = DWORD();
						var gValue = DWORD();
						var bValue = DWORD();

						// Assuming these values are DWORDs, adjust the size accordingly if they have different data types
						var size = DWORD();
						size.value = 4; // Size of a DWORD in bytes

						// Read R, G, B values
						var rQueryResult = RegQueryValueExW(hKey, "Window_ColorRActive", null, null, rValue.address(), size.address());
						var gQueryResult = RegQueryValueExW(hKey, "Window_ColorGActive", null, null, gValue.address(), size.address());
						var bQueryResult = RegQueryValueExW(hKey, "Window_ColorBActive", null, null, bValue.address(), size.address());

						if (rQueryResult === 0 && gQueryResult === 0 && bQueryResult === 0) {
							var red = rValue.value;
							var green = gValue.value;
							var blue = bValue.value;
						}
					}
				}
			} catch {

			}

			advapi32.close();

			// Get and set accentColour
			var accentColorStyle = document.createElement('style');
			var rgb = red + ',' + green + ',' + blue;
			accentColorStyle.innerHTML = `
				:root {
					--userAccentColor: rgb(`+ rgb + `);
				}
			`
			document.head.appendChild(accentColorStyle);
		}
	}
}
// #endregion