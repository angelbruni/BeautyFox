// ==UserScript==
// @include			chrome://browser/content/aboutDialog.xhtml
// ==/UserScript==

(function () {

var aboutDialog = document.getElementById("aboutDialog");
var aboutDialogContainer = document.getElementById("aboutDialogContainer");

function setAttributes(element, attributes) {
        Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });
}


// About Dialog title
aboutDialog.setAttribute("title", "About Internet Explorer");

// Window size
const aboutDialogPane = document.createElement("div");
const aboutDialogPaneAttrs = {
	"id": "aboutDialogPane",
};
setAttributes(aboutDialogPane, aboutDialogPaneAttrs);

//About Dialog logo
const aboutDialogLogo = document.createElement("div");
const aboutDialogLogoAttrs = {
	"id": "aboutDialogLogo",
};
setAttributes(aboutDialogLogo, aboutDialogLogoAttrs);

//About Dialog Information - Version
const aboutDialogInfoVersion = document.createElement("p");
const aboutDialogInfoVersionAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoVersion"
};

setAttributes(aboutDialogInfoVersion, aboutDialogInfoVersionAttrs);

//About Dialog Information - Update Version
const aboutDialogInfoUpdateVersion = document.createElement("p");
const aboutDialogInfoUpdateVersionAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoUpdateVersion"
};

setAttributes(aboutDialogInfoUpdateVersion, aboutDialogInfoUpdateVersionAttrs);

//About Dialog Information - Cipher Strength
const aboutDialogInfoCipherStrength = document.createElement("p");
const aboutDialogInfoCipherStrengthAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoCipherStrength"
};
aboutDialogInfoCipherStrength.innerHTML = 'Cipher Strength: 256-bit';
setAttributes(aboutDialogInfoCipherStrength, aboutDialogInfoCipherStrengthAttrs);

//About Dialog Information - Product ID
const aboutDialogInfoProductID = document.createElement("p");
const aboutDialogInfoProductIDAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoProductID"
};
setAttributes(aboutDialogInfoProductID, aboutDialogInfoProductIDAttrs);

//About Dialog Information - Warning
const aboutDialogInfoWarning = document.createElement("p");
const aboutDialogInfoWarningAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoWarning"
};
aboutDialogInfoWarning.innerHTML = 'Warning: This computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution of this program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.';
setAttributes(aboutDialogInfoWarning, aboutDialogInfoWarningAttrs);

//About Dialog Information - Microsoft
const aboutDialogInfoMicrosoft = document.createElement("a");
const aboutDialogInfoMicrosoftAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoMicrosoft",
};
setAttributes(aboutDialogInfoMicrosoft, aboutDialogInfoMicrosoftAttrs);

// Close Button
const aboutDialogInfoOKButton = document.createElement("button")
const aboutDialogInfoOKButtonAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoOKButton",
};
aboutDialogInfoOKButton.innerHTML = 'OK';
setAttributes(aboutDialogInfoOKButton, aboutDialogInfoOKButtonAttrs);


// IE9 and 10 strings
if (getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE10') == 1) {
	aboutDialogInfoVersion.innerHTML = 'Version: 10.0.9200.17457';
	aboutDialogInfoUpdateVersion.innerHTML = 'Update Version: 10.0.30 <a id="aboutDialogInfoKB" href="#">(KB3078071)</a>';
	aboutDialogInfoProductID.innerHTML = 'Product ID: 00150-20000-00003-AA459';
	aboutDialogInfoMicrosoft.innerHTML = '© 2012 Microsoft Corporation. All rights reserved.';
	aboutDialogInfoOKButton.innerHTML = 'Close';
}
else {
	aboutDialogInfoVersion.innerHTML = 'Version: 9.0.8112.16421   64-bit Edition';
	aboutDialogInfoUpdateVersion.innerHTML = 'Update Version: 9.0.41 (<a id="aboutDialogInfoKB" href="#">KB3078071</a>)';
	aboutDialogInfoProductID.innerHTML = 'Product ID: 03553-292-0000007-85504';
	aboutDialogInfoMicrosoft.innerHTML = '© 2011 Microsoft Corporation';
	aboutDialogInfoOKButton.innerHTML = 'OK';
}



// Clear HTML
aboutDialogContainer.innerHTML = '';

// Append new HTML
aboutDialogContainer.appendChild(aboutDialogPane);
aboutDialogPane.appendChild(aboutDialogLogo);
aboutDialogPane.appendChild(aboutDialogInfoVersion);
aboutDialogPane.appendChild(aboutDialogInfoUpdateVersion);
aboutDialogPane.appendChild(aboutDialogInfoCipherStrength);
aboutDialogPane.appendChild(aboutDialogInfoProductID);
aboutDialogPane.appendChild(aboutDialogInfoWarning);
aboutDialogPane.appendChild(aboutDialogInfoMicrosoft);
aboutDialogPane.appendChild(aboutDialogInfoOKButton);

// Add Event Listeners
// Copyright Link
var aboutDialogInfoKB = document.getElementById("aboutDialogInfoKB");
aboutDialogInfoKB.addEventListener("click", (event) => {
	_ucUtils.loadURI(window,{
		url: "http://go.microsoft.com/fwlink/?LinkID=617908",
		where: "window"
	});
});

// KB Link
aboutDialogInfoMicrosoft.addEventListener("click", (event) => {
	_ucUtils.loadURI(window,{
		url: "http://go.microsoft.com/fwlink/?LinkId=54758",
		where: "window"
	});
});

// OK Button
aboutDialogInfoOKButton.addEventListener("click", (event) => {
    window.close()
});


})();