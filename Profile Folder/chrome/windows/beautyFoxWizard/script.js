// [bruno, pre-restructure]: Yes, this code is terrible, oh well. HELP?
// [betty]: Oh That's a Fine Lookin P-
/* [betty]: just a sidenote: does this really needs that many bool declarations? 
   i'm pretty sure this can be very much minified with a serialized logic. */

var [currentPage, chosenIEAppearance, chosenAboutDialog] = Array.from({length: 3}, () => { 0 });

const elements = ['tabsOnNavRow', 'fakeDropdownArrowsinCB', 'showStatusBar', 
                  'useAccentColouring', 'AWMAccentColouring', 'accentNavBtns', 
                  'accentToolbars', 'edgeCBParent', 'hideSettingsPopup', 
                  'showDownloadProgress', 'hideFakeInnerBorders', 'inetcpl', 
                  'doNotUseOldSettingsIcon', 'navButtonsRadius'];

var [optionTabsOnNavRow, optionFakeDropdownArrowsinCB, optionStatusBar, 
     optionUseAccentColouring, optionAWMAccentColouring, optionAccentNavBtns, 
     optionAccentToolbars, edgeCBParent, optionHideSettingsPopup, optionShowDownloadProgress, 
     optionHideFakeInnerBorders, optioninetcpl, optionDoNotUseOldSettingsIcon, 
     optionNavButtonsRadius] = elements.map(id => document.getElementById(id));



const comboBoxItems = ['wizardComboBoxBookmarkItemItem', 'wizardComboBoxCBItemsItem','wizardComboBoxEdgeButtonItem',
'wizardComboBoxExtensionsButtonItem', 'wizardComboBoxInternetProtectedLabelItem'];
var [wizardComboBoxBookmarkItemItems, wizardComboBoxCBItems, wizardComboBoxEdgeButtonItems, wizardComboBoxExtensionsButtonItems] = Array.from({length: 4}, (_, cb) => {
    return Array.from({length: 3}, (_, i) => { 
        return document.getElementById(`${comboBoxItems[cb]}${i}`); 
    }); 
});
var wizardComboBoxInternetProtectedLabelItems = Array.from({length: 4}, (_, i) => {
    return document.getElementById(`${comboBoxItems[4]}${i}`);
});

function updateNavBackButton() {
    var navBackButton = document.getElementById('backButton');
    if (navBackButton) {try {
        if (Services.prefs.getBoolPref("BeautyFox.parameter.isFirstRunFinished")) {
            navBackButton.disabled = (currentPage === 0 || currentPage === 1);
        }} catch (error) { navBackButton.disabled = (currentPage === 0); }
        // Assign a function to the onclick property
        navBackButton.onclick = function () {
            // Check if currentPage is IE10+ feature specific page
            if (currentPage == 100 || currentPage == 101 || currentPage == 102) { showPage(1); }
            // Check if currentPage is greater than 0
            else if (currentPage > 0) {
                // Call showPage with the previous page number
                showPage(currentPage - 1);
            }
        };
    } else { console.error('The wizard back navigation button was not found.'); }
}

function showPage(pageNumber) {
    var pageId = 'page' + pageNumber;
    var selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        // Hide all pages
        var pages = document.querySelectorAll('.page');
        pages.forEach((_, i) => { pages[i].style.display = 'none'; });
        // Show the selected page
        selectedPage.style.display = 'flex';
        currentPage = pageNumber; // Update the currentPage variable
    } else {
        console.error('Page not found: ' + pageId);
    }

    updateNavBackButton()
    if (chosenIEAppearance > 1) { optionAccentToolbars.style.display = 'none';
    } else { optionAccentToolbars.style.display = 'flex'; }

    if (chosenIEAppearance === 4) { edgeCBParent.style.display = 'flex';
    } else { edgeCBParent.style.display = 'none'; }

    if (chosenIEAppearance === 5) { optionDoNotUseOldSettingsIcon.style.display = 'flex';
    } else { optionDoNotUseOldSettingsIcon.style.display = 'none'; }
}


try { if(Services.prefs.getBoolPref("BeautyFox.parameter.isFirstRunFinished")) { showPage(1); }
} catch (error) { showPage(0); }


updateNavBackButton();

const { ctypes } = Components.utils.import("resource://gre/modules/ctypes.jsm");

const advapi32 = ctypes.open("advapi32.dll");

function checkRegistryKeyExists(keyPath) {
    const RegOpenKeyExW = advapi32.declare(
        "RegOpenKeyExW",
        ctypes.winapi_abi, ctypes.int32_t,
        ctypes.uintptr_t, ctypes.jschar.ptr,
        ctypes.int32_t, ctypes.uint32_t,
        ctypes.uintptr_t.ptr
    );

    const hKey = new ctypes.uintptr_t();
    const result = RegOpenKeyExW(
        0x80000002, // HKEY_LOCAL_MACHINE
        keyPath, 0,
        0x20019, // KEY_READ | KEY_WOW64_64KEY
        hKey.address()
    );

    if (result == 0) {
        const RegCloseKey = advapi32.declare(
            "RegCloseKey",
            ctypes.winapi_abi, ctypes.int32_t,
            ctypes.uintptr_t, ctypes.jschar.ptr,
            ctypes.int32_t, ctypes.uint32_t,
            ctypes.uintptr_t.ptr
        );

        RegCloseKey(0x80000002, // HKEY_LOCAL_MACHINE
            keyPath, 0, 0x20019, // KEY_READ | KEY_WOW64_64KEY
            hKey.address());

        return true;
    }

    return false;
}

const registryKeyPath = "SOFTWARE\\AWM";
const isRegistryKeyExists = checkRegistryKeyExists(registryKeyPath);

function getBoolPrefWithCatch(...values) {
    values.forEach(pair => {
        try {
            pair[1].setAttribute('checked', Services.prefs.getBoolPref(`BeautyFox.option.${pair[0]}`));
        } catch (error) { }
    });
}
/*
    gets all all the required checkboxes for a certain range of values, 
    and adjusts according to the order specified.
*/
function attributeFrenzy(values, checks) {
    values.forEach((val, i) => {
        if (checks[i]) { 
            val.removeAttribute('selected'); 
        } else { 
            val.setAttribute('selected', true); 
        }
    });
}

function getCurrentSettings() {
    getBoolPrefWithCatch(
        ["tabsOnNavRow", optionTabsOnNavRow],
        ["fakeDropdownArrowsinCB", optionFakeDropdownArrowsinCB],
        ["showStatusBar", optionStatusBar]
    );

    try {
        if (Services.prefs.getBoolPref("BeautyFox.option.useAccentColouring")) {
            optionUseAccentColouring.checked = true;

            if (isRegistryKeyExists == true) {
                console.log("AWM registry key exists."); 
                optionAWMAccentColouring.disabled = false;
            } else { optionAWMAccentColouring.disabled = true; }

            optionAccentNavBtns.disabled = false;
            optionAccentToolbars.disabled = false;
        }
    } catch {
        [optionAWMAccentColouring, optionAccentNavBtns, optionAccentToolbars].forEach(checks => { 
            checks = Object.assign({checked: false, disabled: true})
        })
    }

    getBoolPrefWithCatch(["useAccentColourToolbars", optionAccentToolbars], ["userAccentColorNavButtons", optionAccentNavBtns],
        ["hideSettingsInPopUp", optionHideSettingsPopup], ["showDownloadProgress", optionShowDownloadProgress],
        ["hideFakeInnerBorders", optionHideFakeInnerBorders], ["inetcpl", optioninetcpl]);

    if (optionUseAccentColouring.getAttribute('checked')) {
        getBoolPrefWithCatch("BeautyFox.option.AWMAccentColorNavButtons", optionAWMAccentColouring);
    }

    try {
        if (Services.prefs.getBoolPref('BeautyFox.option.smallBookmarkItem')) {
            attributeFrenzy(wizardComboBoxBookmarkItemItems, [0,1,0]);
        } else if (Services.prefs.getBoolPref('BeautyFox.option.iconOnlyBookmarkItem')) {
            attributeFrenzy(wizardComboBoxBookmarkItemItems, [0,0,1]);
        }
    } catch { attributeFrenzy(wizardComboBoxBookmarkItemItems, [1,0,0]); }

    try {
        if (Services.prefs.getBoolPref('BeautyFox.option.textIconInCB')) {
            attributeFrenzy(wizardComboBoxCBItems, [1,0,0]);
        } else if (Services.prefs.getBoolPref('BeautyFox.option.onlyIconsinCB')) {
            attributeFrenzy(wizardComboBoxCBItems, [0,0,1]);
        }
    } catch {
        attributeFrenzy(wizardComboBoxCBItems, [0,1,0]);
    }
    
    getBoolPrefWithCatch("BeautyFox.option.doNotUseOldSettingsIcon", optionDoNotUseOldSettingsIcon);

    try {
        if (Services.prefs.getBoolPref('BeautyFox.option.hideEdgeButton')) {
            attributeFrenzy(wizardComboBoxEdgeButtonItems, [1,0,0]);
        } else if (Services.prefs.getBoolPref('BeautyFox.option.newEdgeButton')) {
            attributeFrenzy(wizardComboBoxEdgeButtonItems, [0,0,1]);
        }
    } catch {attributeFrenzy(wizardComboBoxEdgeButtonItems, [0,1,0]);}

    try {
        if (Services.prefs.getBoolPref('BeautyFox.option.hideExtensionsButton', true)) {
            attributeFrenzy(wizardComboBoxExtensionsButtonItems, [1,0,0]);
        } else if (Services.prefs.getBoolPref('BeautyFox.option.moveExtensionsButtonToEndToolbar', true)) {
            attributeFrenzy(wizardComboBoxExtensionsButtonItems, [0,0,1]);
        }
    } catch { attributeFrenzy(wizardComboBoxExtensionsButtonItems, [0,1,0]); }

    try {
        if (Services.prefs.getBoolPref('BeautyFox.option.fakeInternetProtectedOn', true)) {
            attributeFrenzy(wizardComboBoxInternetProtectedLabelItems, [0,0,1,0]);
        } else if (Services.prefs.getBoolPref('BeautyFox.option.fakeInternetProtectedOff', true)) {
            attributeFrenzy(wizardComboBoxInternetProtectedLabelItems, [0,0,0,1]);
        } else if (Services.prefs.getBoolPref('BeautyFox.option.fakeInternetProtected', true)) {
            attributeFrenzy(wizardComboBoxInternetProtectedLabelItems, [0,1,0,0]);
        }
    } catch { attributeFrenzy(wizardComboBoxInternetProtectedLabelItems, [1,0,0,0]); }

    try {
        optionNavButtonsRadius.value = Services.prefs.getIntPref('BeautyFox.option.navButtonsRadius')
    } catch {
        optionNavButtonsRadius.value = 50
    }
}
getCurrentSettings()

function setOptions() {
    const setBFOption = (vs, b, dir = "option") => { vs.forEach((v, i) => Services.prefs.setBoolPref('BeautyFox.${dir}.${v}', b[i])) }
    let isBeautyFoxFirstRunFinished = false;
    try {
        isBeautyFoxFirstRunFinished = Services.prefs.getBoolPref("BeautyFox.parameter.isFirstRunFinished");
    } catch (error) { }

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
    /* [betty] this has some space to be better, bruno! 
    you could easily make a int-based pref for appearance rather than giving each type a boolean.
    i'm leaving it as-is since my general objective is to get this code working without conflicting
    with the existing logic. but yeah. :3c */
    const appearancePrefs = ['IE9PreRelease', 'IE9PreRelease7777', 'IE10', 'IE11', 'IE11Win10'];
    switch (chosenIEAppearance) {
        // IE9PreRelease
        case 0: setBFOption(appearancePrefs, [true, false, false, false, false], 'appearance'); break;
        // IE9
        case 1: setBFOption(appearancePrefs, [false, false, false, false, false], 'appearance'); break;
        // IE10
        case 2: setBFOption(appearancePrefs, [false, false, true, false, false], 'appearance'); break;
        // IE11
        case 3: setBFOption(appearancePrefs, [false, false, true, true, false], 'appearance'); break;
        // IE11Win10
        case 4: setBFOption(appearancePrefs, [false, false, true, true, true], 'appearance'); break;
        // IE9PreRelease7777
        case 5: setBFOption(appearancePrefs, [true, true, false, false, false], 'appearance'); break;
    }

    const dialogModes = ['IE10DeveloperPreview', 'IE10ConsumerPreview', 'IE10ReleasePreview'];
    switch (chosenAboutDialog) {
        // IE9/IE10/IE11
        case 0: setBFOption(dialogModes, [false, false, false], 'appearance'); break;
        // IE10DeveloperPreview
        case 1: setBFOption(dialogModes, [true, false, false], 'appearance'); break;
        // IE11ConsumerPreview
        case 2: setBFOption(dialogModes, [false, true, false], 'appearance'); break;
        // IE11ReleasePreview
        case 3: setBFOption(dialogModes, [false, true, true], 'appearance'); break;
    }
    const optionValues = [
        ['iconOnlyBookmarkItem', 'smallBookmarkItem'],
        ['onlyIconsinCB', 'textIconInCB'],
        ['hideEdgeButton', 'newEdgeButton'],
        ['tabsOnNavRow', 'fakeDropdownArrowsinCB', 'showStatusBar', 
        'AWMAccentColorNavButtons', 'useAccentColourToolbars', 'userAccentColorNavButtons',
        'hideSettingsInPopUp', 'doNotUseOldSettingsIcon', 'showDownloadProgress', 
        'hideFakeInnerBorders', 'inetcpl'],
        ['hideExtensionsButton', 'moveExtensionsButtonToEndToolbar'],
        ['fakeInternetProtected', 'fakeInternetProtectedOn', 'fakeInternetProtectedOff']];
    Array.from({length: 3}).forEach((_, i) => {
        if (wizardComboBoxBookmarkItemItems[i].getAttribute('selected', 'true')) {
            let bools; switch(i) {
                case 0: bools = [false, false]; break;
                case 1: bools = [false, true]; break;
                case 2: bools = [true, false]; break;
            } setBFOption(optionValues[0], bools); 
        }
    });
    Array.from({length: 3}).forEach((_, i) => {
        if (wizardComboBoxCBItems[i].getAttribute('selected', 'true')) {
            let bools; switch(i) {
                case 0: bools = [false, true]; break;
                case 1: bools = [false, false]; break;
                case 2: bools = [true, false]; break;
            } setBFOption(optionValues[1], bools); 
        }
    });
    if (chosenIEAppearance == 4) {
        Array.from({length: 3}).forEach((_, i) => {
            if (wizardComboBoxEdgeButtonItems[i].getAttribute('selected', 'true')) {
                let bools; switch(i) {
                    case 0: bools = [true, false]; break;
                    case 1: bools = [false, false]; break;
                    case 2: bools = [false, true]; break;
                } setBFOption(optionValues[2], bools); 
            }
        });
    } else { setBFOption(optionValues[2], [true, false]); }

    setBFOption(optionValues[3], [optionTabsOnNavRow.getAttribute('checked') === 'true',
    optionFakeDropdownArrowsinCB.getAttribute('checked') === 'true', optionStatusBar.getAttribute('checked') === 'true',
    optionAWMAccentColouring.getAttribute('checked') === 'true', optionAccentToolbars.getAttribute('checked') === 'true',
    optionAccentNavBtns.getAttribute('checked') === 'true', optionHideSettingsPopup.getAttribute('checked') === 'true',
    optionDoNotUseOldSettingsIcon.getAttribute('checked') === 'true', optionShowDownloadProgress.getAttribute('checked') === 'true',
    optionHideFakeInnerBorders.getAttribute('checked') === 'true', optioninetcpl.getAttribute('checked') === 'true']);

    if (optionUseAccentColouring.getAttribute('checked') == 'true') {
        if (optionAccentNavBtns.checked || optionAccentToolbars.checked) {
            setBFOption(['useAccentColouring'], [true]);
        } else { setBFOption(['useAccentColouring'], [false]); }
    } else { setBFOption(['useAccentColouring'], [false]); }

    Array.from({length: 3}).forEach((_, i) => {
        if (wizardComboBoxExtensionsButtonItems[i].getAttribute('selected', 'true')) {
            let bools; switch(i) {
                case 0: bools = [true, false]; break;
                case 1: bools = [false, false]; break;
                case 2: bools = [false, true]; break;
            } setBFOption(optionValues[4], bools); 
        }
    });
    
    Array.from({length: 4}).forEach((_, i) => {
        if (wizardComboBoxInternetProtectedLabelItems[i].getAttribute('selected', 'true')) {
            let bools; switch(i) {
                case 0: bools = [false, false, false]; break;
                case 1: bools = [true, false, false]; break;
                case 2: bools = [true, true, false]; break;
                case 3: bools = [true, false, true]; break;
            } setBFOption(optionValues[4], bools); 
        }
    });

    Services.prefs.setIntPref('BeautyFox.option.navButtonsRadius', optionNavButtonsRadius.value)
}

optionUseAccentColouring.addEventListener("click", function () {
    setTimeout(() => {
        if (optionUseAccentColouring.getAttribute('checked', 'true')) {
            if (isRegistryKeyExists == true) {
                console.info("AWM registry key exists.");

                if (optionUseAccentColouring.checked == true) {
                    optionAWMAccentColouring.disabled = false;
                }
            } else {
                console.info("AWM registry key does not exist.");
            }
            optionAccentNavBtns.disabled = false;
            optionAccentToolbars.disabled = false;
            console.log("Registry key check result: " + isRegistryKeyExists);
        } else {
            optionAWMAccentColouring.disabled = true;
            optionAWMAccentColouring.checked = false;
            
            optionAccentNavBtns.disabled = true;
            optionAccentNavBtns.checked = false;

            optionAccentToolbars.disabled = true;
            optionAccentToolbars.checked = false;
        }
    }, 0);
});

var creditsText = document.createTextNode(`Credits:
- AngelBruni - Theme Developer;
-------------------------------
- Trailer produced under the mice nest (micenest.xyz);
- luisl - Spanish translation and testing;
- ephemeralViolette - Firefox Native Controls;
- MaTe - Portuguese (Brazillian) translation and testing;
- neptuneen - Portuguese (Brazillian) translation and testing;
- Brawllux - Turkish translation and testing;
- ImSwordQueen - For a bunch of little cool ideas;
- Testing Team - For making sure all bugs are squished and improvements are made;
- Microsoft - Internet Explorer and Windows software and assets;
- Mozilla - Firefox software.`);

document.getElementById('credits').appendChild(creditsText);

var restartNow = document.getElementById('restartNow');
restartNow.addEventListener("click", () => {
    setOptions();
    advapi32.close(); // Close the library
    _ucUtils.restart(true);
})

var restartLater = document.getElementById('restartLater');
restartLater.addEventListener("click", () => {
    setOptions(); advapi32.close(); window.close(); });
