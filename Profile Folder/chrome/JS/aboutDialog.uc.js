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

//About Dialog Information - Pane
const aboutDialogInfoPane = document.createElement("div");
const aboutDialogInfoPaneAttrs = {
    "id": "aboutDialogInfoPane"
};
setAttributes(aboutDialogInfoPane, aboutDialogInfoPaneAttrs);

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
aboutDialogInfoCipherStrength.innerHTML = 'Cipher Strength:' + ' ' + '256-bit';
setAttributes(aboutDialogInfoCipherStrength, aboutDialogInfoCipherStrengthAttrs);

//About Dialog Information - Product ID
const aboutDialogInfoProductID = document.createElement("p");
const aboutDialogInfoProductIDAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogInfoProductID"
};
setAttributes(aboutDialogInfoProductID, aboutDialogInfoProductIDAttrs);

//About Dialog Information - Warning
const aboutDialogWarning = document.createElement("p");
const aboutDialogWarningAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogWarning"
};
aboutDialogWarning.innerHTML = 'Warning:' + ' ' + 'This computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution of this program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.';
setAttributes(aboutDialogWarning, aboutDialogWarningAttrs);

//About Dialog Information - Microsoft
const aboutDialogMicrosoft = document.createElement("a");
const aboutDialogMicrosoftAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogMicrosoft",
};
setAttributes(aboutDialogMicrosoft, aboutDialogMicrosoftAttrs);

// Close Button
const aboutDialogOKButton = document.createElement("button")
const aboutDialogOKButtonAttrs = {
	"class": "aboutDialogInfo",
    "id": "aboutDialogOKButton",
};
aboutDialogOKButton.innerHTML = 'OK';
setAttributes(aboutDialogOKButton, aboutDialogOKButtonAttrs);


// IE9 and 10 strings
if (getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE10') == 1) {
	aboutDialogInfoVersion.innerHTML = 'Version:' + ' ' + '10.0.9200.17457';
	aboutDialogInfoUpdateVersion.innerHTML = 'Update Version:' + ' ' + '10.0.30 <a id="aboutDialogInfoKB" href="#">(KB3078071)</a>';
	aboutDialogInfoProductID.innerHTML = 'Product ID:' + ' ' + '00150-20000-00003-AA459';
	aboutDialogMicrosoft.innerHTML = '© 2012 Microsoft Corporation. All rights reserved.';
	aboutDialogOKButton.innerHTML = 'Close';
} else if (getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE9PreRelease') == 1) {
	aboutDialogInfoVersion.innerHTML = 'Version:' + ' ' + '9.0.7930.16406   64-bit Edition';
	aboutDialogInfoUpdateVersion.innerHTML = 'Update Versions:' + ' ' + 'beta <a id="aboutDialogInfoKB" href="#"></a>';
	aboutDialogInfoProductID.innerHTML = 'Product ID:' + ' ' + '03201-292-0000007-85504';
	aboutDialogMicrosoft.innerHTML = '© 2010 Microsoft Corporation';
	aboutDialogOKButton.innerHTML = 'OK';
} else {
	aboutDialogInfoVersion.innerHTML = 'Version:' + ' ' + '9.0.8112.16421   64-bit Edition';
	aboutDialogInfoUpdateVersion.innerHTML = 'Update Version:' + ' ' + '9.0.41 (<a id="aboutDialogInfoKB" href="#">KB3078071</a>)';
	aboutDialogInfoProductID.innerHTML = 'Product ID:' + ' ' + '03553-292-0000007-85504';
	aboutDialogMicrosoft.innerHTML = '© 2011 Microsoft Corporation';
	aboutDialogOKButton.innerHTML = 'OK';
}



// Clear HTML
aboutDialogContainer.innerHTML = '';

// Append new HTML
aboutDialogContainer.appendChild(aboutDialogPane);
aboutDialogPane.appendChild(aboutDialogLogo);
aboutDialogPane.appendChild(aboutDialogInfoPane);
aboutDialogInfoPane.appendChild(aboutDialogInfoVersion);
aboutDialogInfoPane.appendChild(aboutDialogInfoUpdateVersion);
aboutDialogInfoPane.appendChild(aboutDialogInfoCipherStrength);
aboutDialogInfoPane.appendChild(aboutDialogInfoProductID);
aboutDialogPane.appendChild(aboutDialogWarning);
aboutDialogPane.appendChild(aboutDialogMicrosoft);
aboutDialogPane.appendChild(aboutDialogOKButton);

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
aboutDialogMicrosoft.addEventListener("click", (event) => {
	_ucUtils.loadURI(window,{
		url: "http://go.microsoft.com/fwlink/?LinkId=54758",
		where: "window"
	});
});

// OK Button
aboutDialogOKButton.addEventListener("click", (event) => {
    window.close()
});


})();