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