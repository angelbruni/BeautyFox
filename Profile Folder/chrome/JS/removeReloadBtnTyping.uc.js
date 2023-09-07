const reloadButton = document.getElementById("reload-button");
const urlbarInputContainer = document.getElementById("urlbar-input-container");

// Select the node that will be observed for mutations
const urlbar = document.getElementById("urlbar");

// Options for the observer (which mutations to observe)
const urlbarObserverConfig = { attributes: true, childList: false, subtree: false };

// Callback function to execute when mutations are observed
const urlbarObserverCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes") {
        if (urlbar.hasAttribute("usertyping") && urlbar.hasAttribute("focused")) {
            reloadButton.classList.add("reload-button-display-none")
            urlbarInputContainer.classList.add("urlbar-remove-padding-right")
        }
        else {
            reloadButton.classList.remove("reload-button-display-none")
            urlbarInputContainer.classList.remove("urlbar-remove-padding-right")
        }
    }
  }
};

// Create an observer instance linked to the callback function
const urlbarObserver = new MutationObserver(urlbarObserverCallback);

// Start observing the target node for configured mutations
urlbarObserver.observe(urlbar, urlbarObserverConfig);
