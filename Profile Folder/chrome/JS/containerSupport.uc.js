
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
