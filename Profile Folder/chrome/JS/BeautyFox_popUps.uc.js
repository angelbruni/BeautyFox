// ==UserScript==
// @name        BeautyFox - Pop Ups
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function removeElementById(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function updateIdentityPopup() {
	if (document.getElementById("identity-popup")) {
		const identityPopupSecurityViewBody = document.querySelector('#identity-popup-securityView > .panel-subview-body');
		const identityPopupSecurityButton = document.getElementById('identity-popup-security-button');

		while (identityPopupSecurityViewBody.firstChild) {
			identityPopupSecurityButton.parentNode.insertBefore(identityPopupSecurityViewBody.firstChild, identityPopupSecurityButton.nextSibling);
		}
		
		const identityPopupClearSitedataFooter = document.getElementById("identity-popup-clear-sitedata-footer");
		const identityPopupMoreInfoFooter = document.getElementById("identity-popup-more-info-footer");
		try {
			insertAfter(identityPopupMoreInfoFooter, identityPopupClearSitedataFooter);
		} catch (error) {
			console.log(error);
		}
		
		removeElementById("identity-popup-clear-sitedata-footer");
		removeElementById("identity-popup-content-owner-label");
		removeElementById("identity-popup-content-supplemental");
		removeElementById("identity-popup-city-state");
		removeElementById("identity-popup-country");

		document.getElementById("identity-popup-security-button").style.display = 'none';
		document.getElementById("identity-popup-security-description").style.display = "none";
		document.getElementById("identity-popup-mainView-panel-header-span").display = 'none';

		const identityPopupSecurityViewExtendedInfo = document.getElementById("identity-popup-securityView-extended-info");
		identityPopupSecurityViewExtendedInfo.appendChild(document.querySelector("[data-l10n-id='identity-connection-not-secure-security-view']"));
		identityPopupSecurityViewExtendedInfo.appendChild(document.querySelector("[data-l10n-id='identity-connection-verified']"));
		
		const identityPopupContentOwner = document.getElementById("identity-popup-content-owner");
		identityPopupSecurityViewExtendedInfo.insertBefore(document.getElementById("identity-popup-content-verifier"), identityPopupContentOwner)
		identityPopupContentOwner.classList.remove('header');

		const identityCityState = gIdentityHandler.getIdentityData().city + ', ' + gIdentityHandler.getIdentityData().state
		const identityPopupCityState = document.createXULElement('description');
		identityPopupCityState.id = 'identity-popup-city-state';
		identityPopupCityState.textContent = identityCityState;
		if (identityCityState !== 'undefined, undefined') {
			insertAfter(identityPopupCityState, identityPopupContentOwner);
		}

		const identityCountry = gIdentityHandler.getIdentityData().country;
		const identityPopupCountry = document.createXULElement('description');
		identityPopupCountry.id = 'identity-popup-country';
		identityPopupCountry.textContent = identityCountry;
		if (typeof identityCountry !== 'undefined') {
			insertAfter(identityPopupCountry, identityPopupCityState);
		}

		document.querySelector(".identity-popup-security-connection.identity-popup-section").style.display = 'none';

		if (!document.getElementById("identity-popup-link")) {
			const identityPopupLink = document.createXULElement('toolbarbutton');
			identityPopupLink.id = "identity-popup-link";
			identityPopupLink.setAttribute('onclick', "_ucUtils.loadURI(window, { url: 'https://support.microsoft.com/en-us/windows/certificate-errors-faq-402e08c1-bdd6-5d5c-64f2-ccb8f73cea5c', where: 'tab' });")
			identityPopupSecurityViewExtendedInfo.appendChild(identityPopupLink);
			insertAfter(identityPopupLink, identityPopupSecurityViewExtendedInfo);
		}

		const identityPopupLink = document.getElementById("identity-popup-link")
		switch (gBrowser.selectedTab.linkedBrowser.securityUI.state) {
			case 2:
				identityPopupLink.textContent = 'Should I trust this site?';
				break;
			case 4:
				identityPopupLink.remove();
				break;
			case 1048578:
				identityPopupLink.textContent = 'Should I trust this site?';
				break;
			case 67108866:
				identityPopupLink.textContent = 'About certficate errors';
				break;
		}
	}
}
window.addEventListener("popupshown", updateIdentityPopup); 