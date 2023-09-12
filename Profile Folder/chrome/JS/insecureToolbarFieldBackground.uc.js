function insecureToolbarFieldBackground() {
	const navBarCustomizationTarget = document.getElementById("nav-bar-customization-target")

	// Select the node that will be observed for mutations
	const identityBox = document.getElementById("identity-box");

	// Options for the observer (which mutations to observe)
	const identityBoxObserverConfig = { attributes: true, childList: false, subtree: false };

	// Callback function to execute when mutations are observed
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

	// Create an observer instance linked to the callback function
	const identityBoxObserver = new MutationObserver(identityBoxObserverCallback);

	// Start observing the target node for configured mutations
	identityBoxObserver.observe(identityBox, identityBoxObserverConfig);
}
