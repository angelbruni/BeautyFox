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
