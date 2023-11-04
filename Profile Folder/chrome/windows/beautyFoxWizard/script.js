var currentPage = 0; // Default to the first page

function updateNavBackButton() {
    var navBackButton = document.getElementById('backButton');

    if (navBackButton) {
        // Disable the button if currentPage is 0, enable otherwise
        navBackButton.disabled = (currentPage === 0);

        // Assign a function to the onclick property
        navBackButton.onclick = function() {
            // Check if currentPage is IE10+ feature specific page
            if (currentPage == 3) {
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

function getBoolPrefWithCatch(prefName, element) {
    try {
        element.setAttribute('checked', Services.prefs.getBoolPref(prefName));
    } catch (error) {}
}

var chosenIEAppearance = 0;
var optionTabsOnNavRow = document.getElementById('tabsOnNavRow');
var optionOnlyIconsinCB = document.getElementById('onlyIconsinCB');
var optionFakeDropdownArrowsinCB = document.getElementById('fakeDropdownArrowsinCB');
var optionStatusBar = document.getElementById('showStatusBar');
var optionAccentNavBtns = document.getElementById('accentNavBtns');
var optionHideSettingsPopup = document.getElementById('hideSettingsPopup');
var optionShowDownloadProgress = document.getElementById('showDownloadProgress');
var optionHideFakeInnerBorders = document.getElementById('hideFakeInnerBorders');

function getCurrentSettings() {
    getBoolPrefWithCatch("BeautyFox.option.tabsOnNavRow", optionTabsOnNavRow);
    getBoolPrefWithCatch("BeautyFox.option.onlyIconsinCB", optionOnlyIconsinCB);
    getBoolPrefWithCatch("BeautyFox.option.fakeDropdownArrowsinCB", optionFakeDropdownArrowsinCB);
    getBoolPrefWithCatch("BeautyFox.option.showStatusBar", optionStatusBar);
    getBoolPrefWithCatch("BeautyFox.option.userAccentColorNavButtons", optionAccentNavBtns);
    getBoolPrefWithCatch("BeautyFox.option.hideSettingsInPopUp", optionHideSettingsPopup);
    getBoolPrefWithCatch("BeautyFox.option.showDownloadProgress", optionShowDownloadProgress);
    getBoolPrefWithCatch("BeautyFox.option.hideFakeInnerBorders", optionHideFakeInnerBorders);
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
    
    Services.prefs.setBoolPref('BeautyFox.option.tabsOnNavRow', optionTabsOnNavRow.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.onlyIconsinCB', optionOnlyIconsinCB.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.fakeDropdownArrowsinCB', optionFakeDropdownArrowsinCB.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.showStatusBar', optionStatusBar.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.userAccentColorNavButtons', optionAccentNavBtns.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.hideSettingsInPopUp', optionHideSettingsPopup.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.showDownloadProgress', optionShowDownloadProgress.getAttribute('checked') === 'true');
    Services.prefs.setBoolPref('BeautyFox.option.hideFakeInnerBorders', optionHideFakeInnerBorders.getAttribute('checked') === 'true');
}

var restartNow = document.getElementById('restartNow');
restartNow.addEventListener("click", function() {
    setOptions();

    _ucUtils.restart(true);
}); 

var restartLater = document.getElementById('restartLater');
restartNow.addEventListener("click", function() {
    setOptions();
    
    window.close();
}); 