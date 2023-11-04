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
