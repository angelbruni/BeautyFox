var currentPage = 0; // Default to the first page

function updateNavBackButton() {
    var navBackButton = document.getElementById('backButton');

    if (navBackButton) {
        // Disable the button if currentPage is 0, enable otherwise
        navBackButton.disabled = (currentPage === 0);

        // Assign a function to the onclick property
        navBackButton.onclick = function() {
            // Check if currentPage is IE10+ feature specific page
            if (currentPage == 100 || currentPage == 101) {
                showPage(1);
            }
            // Check if currentPage is greater than 0
            else if (currentPage > 0) {
                // Call showPage with the previous page number
                showPage(currentPage - 1);
            }
        };
    } else {
        console.log('The wizard back navigation button was not found.');
    }
}

function showPage(pageNumber) {
    var pageId = 'page' + pageNumber;
    var selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        // Hide all pages
        var pages = document.querySelectorAll('.page');
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.display = 'none';
        }

        // Show the selected page
        selectedPage.style.display = 'flex';
        currentPage = pageNumber; // Update the currentPage variable
    } else {
        console.error('Page not found: ' + pageId);
    }
    
    updateNavBackButton()
}

showPage(currentPage);
updateNavBackButton();

const { ctypes } = Components.utils.import("resource://gre/modules/ctypes.jsm");

const advapi32 = ctypes.open("advapi32.dll");

function checkRegistryKeyExists(keyPath) {
    const RegOpenKeyExW = advapi32.declare(
        "RegOpenKeyExW",
        ctypes.winapi_abi,
        ctypes.int32_t,
        ctypes.uintptr_t,
        ctypes.jschar.ptr,
        ctypes.int32_t,
        ctypes.uint32_t,
        ctypes.uintptr_t.ptr
    );

    const hKey = new ctypes.uintptr_t();
    const result = RegOpenKeyExW(
        0x80000002, // HKEY_LOCAL_MACHINE
        keyPath,
        0,
        0x20019, // KEY_READ | KEY_WOW64_64KEY
        hKey.address()
    );

    if (result == 0) {
        const RegCloseKey = advapi32.declare(
            "RegCloseKey",
            ctypes.winapi_abi,
            ctypes.int32_t,
            ctypes.uintptr_t,
            ctypes.jschar.ptr,
            ctypes.int32_t,
            ctypes.uint32_t,
            ctypes.uintptr_t.ptr
        );

        RegCloseKey(0x80000002, // HKEY_LOCAL_MACHINE
                    keyPath,
                    0,
                    0x20019, // KEY_READ | KEY_WOW64_64KEY
                    hKey.address());
                    
        return true;
    }

    return false;
}

const registryKeyPath = "SOFTWARE\\AWM";
const isRegistryKeyExists = checkRegistryKeyExists(registryKeyPath);

function getBoolPrefWithCatch(prefName, element) {
    try {
        element.setAttribute('checked', Services.prefs.getBoolPref(prefName));
    } catch (error) {}
}

var chosenIEAppearance = 0;
var chosenAboutDialog = 0;
var optionTabsOnNavRow = document.getElementById('tabsOnNavRow');
var optionOnlyIconsinCB = document.getElementById('onlyIconsinCB');
var optionFakeDropdownArrowsinCB = document.getElementById('fakeDropdownArrowsinCB');
var optionStatusBar = document.getElementById('showStatusBar');
var optionUseAccentColouring = document.getElementById('useAccentColouring');
var optionAWMAccentColouring = document.getElementById('AWMAccentColouring');
var optionAccentNavBtns = document.getElementById('accentNavBtns');
var optionAccentToolbars = document.getElementById('accentToolbars');
var optionHideSettingsPopup = document.getElementById('hideSettingsPopup');
var optionShowDownloadProgress = document.getElementById('showDownloadProgress');
var optionHideFakeInnerBorders = document.getElementById('hideFakeInnerBorders');
var optioninetcpl = document.getElementById('inetcpl');
var wizardComboBoxExtensionsButtonItem0 = document.getElementById('wizardComboBoxExtensionsButtonItem0');
var wizardComboBoxExtensionsButtonItem1 = document.getElementById('wizardComboBoxExtensionsButtonItem1');
var wizardComboBoxExtensionsButtonItem2 = document.getElementById('wizardComboBoxExtensionsButtonItem2');
var optionNavButtonsRadius = document.getElementById('navButtonsRadius');

function getCurrentSettings() {
    getBoolPrefWithCatch("BeautyFox.option.tabsOnNavRow", optionTabsOnNavRow);
    getBoolPrefWithCatch("BeautyFox.option.onlyIconsinCB", optionOnlyIconsinCB);
    getBoolPrefWithCatch("BeautyFox.option.fakeDropdownArrowsinCB", optionFakeDropdownArrowsinCB);
    getBoolPrefWithCatch("BeautyFox.option.showStatusBar", optionStatusBar);

    try {
        if (Services.prefs.getBoolPref("BeautyFox.option.useAccentColouring")) {
            optionUseAccentColouring.checked = true;

            optionAWMAccentColouring.disabled = false;
            optionAccentNavBtns.disabled = false;
            optionAccentToolbars.disabled = false;
        } else {
            optionAWMAccentColouring.checked = false;
            optionAWMAccentColouring.disabled = true;

            optionAccentNavBtns.disabled = true;
            optionAccentNavBtns.checked = false;

            optionAccentToolbars.disabled = true;
            optionAccentToolbars.checked = false;
        }
    } catch {
        optionAWMAccentColouring.checked = false;
        optionAWMAccentColouring.disabled = true;

        optionAccentNavBtns.disabled = true;
        optionAccentNavBtns.checked = false;

        optionAccentToolbars.disabled = true;
        optionAccentToolbars.checked = false;
    }
    
    getBoolPrefWithCatch("BeautyFox.option.useAccentColourToolbars", optionAccentToolbars);
    getBoolPrefWithCatch("BeautyFox.option.userAccentColorNavButtons", optionAccentNavBtns);

    getBoolPrefWithCatch("BeautyFox.option.hideSettingsInPopUp", optionHideSettingsPopup);
    getBoolPrefWithCatch("BeautyFox.option.showDownloadProgress", optionShowDownloadProgress);
    getBoolPrefWithCatch("BeautyFox.option.hideFakeInnerBorders", optionHideFakeInnerBorders);
    getBoolPrefWithCatch("BeautyFox.option.inetcpl", optioninetcpl);

    if (optionUseAccentColouring.getAttribute('checked')) {
        getBoolPrefWithCatch("BeautyFox.option.AWMAccentColorNavButtons", optionAWMAccentColouring);
    }

    if (Services.prefs.getBoolPref('BeautyFox.option.hideExtensionsButton', true)) {
        wizardComboBoxExtensionsButtonItem0.setAttribute('selected', true);
        wizardComboBoxExtensionsButtonItem1.removeAttribute('selected');
        wizardComboBoxExtensionsButtonItem2.removeAttribute('selected');
    } else if (Services.prefs.getBoolPref('BeautyFox.option.moveExtensionsButtonToEndToolbar', true)) {
        wizardComboBoxExtensionsButtonItem0.removeAttribute('selected');
        wizardComboBoxExtensionsButtonItem1.removeAttribute('selected');
        wizardComboBoxExtensionsButtonItem2.setAttribute('selected', true);
    } else {
        wizardComboBoxExtensionsButtonItem0.removeAttribute('selected');
        wizardComboBoxExtensionsButtonItem1.setAttribute('selected', true);
        wizardComboBoxExtensionsButtonItem2.removeAttribute('selected');
    }

    try {
        optionNavButtonsRadius.value = Services.prefs.getIntPref('BeautyFox.option.navButtonsRadius')
    } catch {
        optionNavButtonsRadius.value = 50
    }
}
getCurrentSettings()

function setOptions() {
    let isBeautyFoxFirstRunFinished = false;
    try {
        isBeautyFoxFirstRunFinished = Services.prefs.getBoolPref("BeautyFox.parameter.isFirstRunFinished");
    } catch (error) {}

    if (!isBeautyFoxFirstRunFinished) {
        Services.prefs.setBoolPref('toolkit.legacyUserProfileCustomizations.stylesheets', true);        // Enables chrome themes;
        Services.prefs.setIntPref('browser.display.windows.non_native_menus', 0);                       // Disables non-native menus;
        Services.prefs.setBoolPref('widget.non-native-theme.enabled', false);                           // Disables non-native-looking controls;
        Services.prefs.setBoolPref('browser.tabs.tabmanager.enabled', false);                           // Removes tabs dropdown;
        Services.prefs.setBoolPref('browser.theme.dark-private-windows', false);                        // Disables dark theme in Private window;
        Services.prefs.setBoolPref('nglayout.enable_drag_images', false);                               // Disables thumbnail preview when dragging tab;
        Services.prefs.setIntPref('browser.newtabpage.activity-stream.topSitesRows', 2);                // Enables two rows for the new tab page;
        Services.prefs.setBoolPref('browser.taskbar.previews.enable', true);                            // Enables taskbar tabs previews;
        Services.prefs.setBoolPref('browser.download.always_ask_before_handling_new_types', true);      // Enables legacy download dialog;
        Services.prefs.setIntPref('security.dialog_enable_delay', 0);                                   // Disables OK button delay in the legacy download dialog.

        Services.prefs.setBoolPref('BeautyFox.parameter.isFirstRunFinished', true)
    }

    switch (chosenIEAppearance) {
        case 0:
            // IE9PreRelease
            Services.prefs.setBoolPref('BeautyFox.appearance.IE9PreRelease', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11Win10', false)
            break;
        case 1:
            // IE9
            Services.prefs.setBoolPref('BeautyFox.appearance.IE9PreRelease', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11Win10', false)
            break;
        case 2:
            // IE10
            Services.prefs.setBoolPref('BeautyFox.appearance.IE9PreRelease', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11Win10', false)
            break;
        case 3:
            // IE11
            Services.prefs.setBoolPref('BeautyFox.appearance.IE9PreRelease', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11Win10', false)
            break;
        case 4:
            // IE11Win10
            Services.prefs.setBoolPref('BeautyFox.appearance.IE9PreRelease', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE11Win10', true)
            break;
    }

    switch (chosenAboutDialog) {
        case 0:
            // IE9/IE10/IE11
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10DeveloperPreview', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ConsumerPreview', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ReleasePreview', false)
            break;
        case 1:
            // IE10DeveloperPreview
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10DeveloperPreview', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ConsumerPreview', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ReleasePreview', false)
            break;
        case 2:
            // IE11ConsumerPreview
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10DeveloperPreview', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ConsumerPreview', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ReleasePreview', false)
            break;
        case 3:
            // IE11ReleasePreview
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10DeveloperPreview', false)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ConsumerPreview', true)
            Services.prefs.setBoolPref('BeautyFox.appearance.IE10ReleasePreview', true)
            break;
    }
    
    Services.prefs.setBoolPref('BeautyFox.option.tabsOnNavRow', optionTabsOnNavRow.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.onlyIconsinCB', optionOnlyIconsinCB.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.fakeDropdownArrowsinCB', optionFakeDropdownArrowsinCB.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.showStatusBar', optionStatusBar.getAttribute('checked') === 'true');

    if (optionUseAccentColouring.getAttribute('checked') == 'true') {
        if (optionAccentNavBtns.checked || optionAccentToolbars.checked) {
            Services.prefs.setBoolPref('BeautyFox.option.useAccentColouring', true);
        } else {
            Services.prefs.setBoolPref('BeautyFox.option.useAccentColouring', false);
        }
    } else {
        Services.prefs.setBoolPref('BeautyFox.option.useAccentColouring', false)
    }
    Services.prefs.setBoolPref('BeautyFox.option.AWMAccentColorNavButtons', optionAWMAccentColouring.getAttribute('checked') === 'true');

    Services.prefs.setBoolPref('BeautyFox.option.useAccentColourToolbars', optionAccentToolbars.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.userAccentColorNavButtons', optionAccentNavBtns.getAttribute('checked') === 'true');

    Services.prefs.setBoolPref('BeautyFox.option.hideSettingsInPopUp', optionHideSettingsPopup.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.showDownloadProgress', optionShowDownloadProgress.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.hideFakeInnerBorders', optionHideFakeInnerBorders.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.inetcpl', optioninetcpl.getAttribute('checked') === 'true');

    if (wizardComboBoxExtensionsButtonItem0.getAttribute('selected', 'true')) {
        Services.prefs.setBoolPref('BeautyFox.option.hideExtensionsButton', true);
        Services.prefs.setBoolPref('BeautyFox.option.moveExtensionsButtonToEndToolbar', false);
    } 
    if (wizardComboBoxExtensionsButtonItem1.getAttribute('selected', 'true')) {
        Services.prefs.setBoolPref('BeautyFox.option.hideExtensionsButton', false);
        Services.prefs.setBoolPref('BeautyFox.option.moveExtensionsButtonToEndToolbar', false);
    } 
    if (wizardComboBoxExtensionsButtonItem2.getAttribute('selected', 'true')) {
        Services.prefs.setBoolPref('BeautyFox.option.hideExtensionsButton', false);
        Services.prefs.setBoolPref('BeautyFox.option.moveExtensionsButtonToEndToolbar', true);
    }

    Services.prefs.setIntPref('BeautyFox.option.navButtonsRadius', optionNavButtonsRadius.value)
}

optionUseAccentColouring.addEventListener("click", function() {
    setTimeout(() => {
        if (optionUseAccentColouring.getAttribute('checked', 'true')) {
            if (isRegistryKeyExists == true) {
                console.log("AWM registry key exists.");

                if (optionUseAccentColouring.checked == true) {
                    optionAWMAccentColouring.disabled = false;
                }
            } else {
                console.log("AWM registry key does not exist.");
            }

            optionAccentNavBtns.disabled = false;

            optionAccentToolbars.disabled = false;
                
            console.log("Registry key check result: " + isRegistryKeyExists);
        } else  {
            optionAWMAccentColouring.disabled = true;
            optionAWMAccentColouring.checked = false;

            optionAccentNavBtns.disabled = true;
            optionAccentNavBtns.checked = false;

            optionAccentToolbars.disabled = true;
            optionAccentToolbars.checked = false;
        }
    }, 0);
}); 

var creditsText = document.createTextNode("Credits:\n\nAngelBruni - Theme Developer;\n\nSQUEeAK - Trailer;\n\nluisl - Spanish translation and testing;\n\nMaTe - Portuguese (Brazillian) translation and testing;\n\nneptuneen - Portuguese (Brazillian) translation and testing;\n\nTesting Team - For making sure all bugs are squished and improvements are made;\n\nMicrosoft - Internet Explorer and Windows software and assets;\n\nMozilla - Firefox software.");

document.getElementById('credits').appendChild(creditsText);

var restartNow = document.getElementById('restartNow');
restartNow.addEventListener("click", function() {
    setOptions();

    // Close the library
    advapi32.close();

    _ucUtils.restart(true);
}); 

var restartLater = document.getElementById('restartLater');
restartLater.addEventListener("click", function() {
    setOptions();

    // Close the library
    advapi32.close();

    window.close();
}); 