var currentPage = 0; // Default to the first page

function updateNavBackButton() {
    var navBackButton = document.getElementById('backButton');

    if (navBackButton) {
        // Disable the button if currentPage is 0, enable otherwise
        navBackButton.disabled = (currentPage === 0);

        // Assign a function to the onclick property
        navBackButton.onclick = function() {
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

var chosenIEAppearance = 0;
var optionTabsOnNavRow = document.getElementById('tabsOnNavRow');
var optionOnlyIconsinCB = document.getElementById('onlyIconsinCB');
var optionFakeDropdownArrowsinCB = document.getElementById('fakeDropdownArrowsinCB');
var optionStatusBar = document.getElementById('showStatusBar');
var optionAccentNavBtns = document.getElementById('accentNavBtns');

function getCurrentSettings() {
    try {
        var currentTabsOnNavRow = Services.prefs.getBoolPref("BeautyFox.option.tabsOnNavRow");
        if (currentTabsOnNavRow) {
            optionTabsOnNavRow.setAttribute('checked', true);
        }
    } catch (error) {}

    try {
        var currentOnlyIconsinCB = Services.prefs.getBoolPref("BeautyFox.option.onlyIconsinCB");
        if (currentOnlyIconsinCB) {
            optionOnlyIconsinCB.setAttribute('checked', true);
        }
    } catch (error) {}

    try {
        var currentFakeDropdownArrowsinCB = Services.prefs.getBoolPref("BeautyFox.option.fakeDropdownArrowsinCB");
        if (currentFakeDropdownArrowsinCB) {
            optionFakeDropdownArrowsinCB.setAttribute('checked', true);
        }
    } catch (error) {}
    
    try {
        var currentStatusBar = Services.prefs.getBoolPref("BeautyFox.option.showStatusBar");
        if (currentStatusBar) {
            optionStatusBar.setAttribute('checked', true);
        }
    } catch (error) {}

    try {
        var currentAccentNavBtns = Services.prefs.getBoolPref("BeautyFox.option.userAccentColorNavButtons");
        if (currentAccentNavBtns) {
            optionAccentNavBtns.setAttribute('checked', true);
        }
    } catch (error) {}
}
getCurrentSettings()

function setOptions() {
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

    if (optionTabsOnNavRow.getAttribute('checked') == 'true') {
        Services.prefs.setBoolPref('BeautyFox.option.tabsOnNavRow', true)
    } else {
        Services.prefs.setBoolPref('BeautyFox.option.tabsOnNavRow', false)
    }

    if (optionOnlyIconsinCB.getAttribute('checked') == 'true') {
        Services.prefs.setBoolPref('BeautyFox.option.onlyIconsinCB', true)
    } else {
        Services.prefs.setBoolPref('BeautyFox.option.onlyIconsinCB', false)
    }

    if (optionFakeDropdownArrowsinCB.getAttribute('checked') == 'true') {
        Services.prefs.setBoolPref('BeautyFox.option.fakeDropdownArrowsinCB', true)
    } else {
        Services.prefs.setBoolPref('BeautyFox.option.fakeDropdownArrowsinCB', false)
    }

    if (optionStatusBar.getAttribute('checked') == 'true') {
        Services.prefs.setBoolPref('BeautyFox.option.showStatusBar', true)
    } else {
        Services.prefs.setBoolPref('BeautyFox.option.showStatusBar', false)
    }

    if (optionAccentNavBtns.getAttribute('checked') == 'true') {
        Services.prefs.setBoolPref('BeautyFox.option.userAccentColorNavButtons', true)
    } else {
        Services.prefs.setBoolPref('BeautyFox.option.userAccentColorNavButtons', false)
    }

    Services.prefs.setBoolPref('BeautyFox.parameter.isFirstRunFinished', true)
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