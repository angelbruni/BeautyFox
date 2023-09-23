// ==UserScript==
// @include			chrome://browser/content/aboutDialog.xhtml
// ==/UserScript==

(function () {

	const aboutDialog = document.getElementById("aboutDialog");
	const aboutDialogContainer = document.getElementById("aboutDialogContainer");
	
	function setAttributes(element, attributes) {
			Object.keys(attributes).forEach(attr => {
			element.setAttribute(attr, attributes[attr]);
		});
	}
	
	var labelAboutBefore = getComputedStyle(document.documentElement).getPropertyValue('--label-about-before');
	var labelAboutAfter = getComputedStyle(document.documentElement).getPropertyValue('--label-about-after');
	
	// About Dialog title
	aboutDialog.setAttribute("title", labelAboutBefore + "Internet Explorer " + labelAboutAfter);
	
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
	setAttributes(aboutDialogWarning, aboutDialogWarningAttrs);
	
	//About Dialog Information - Microsoft
	const aboutDialogMicrosoft = document.createElement("p");
	const aboutDialogMicrosoftAttrs = {
		"class": "aboutDialogInfo",
		"id": "aboutDialogMicrosoft",
	};
	setAttributes(aboutDialogMicrosoft, aboutDialogMicrosoftAttrs);
	
	// Close Button
	const aboutDialogOKButton = document.createElement("button");
	const aboutDialogOKButtonAttrs = {
		"class": "aboutDialogInfo",
		"id": "aboutDialogOKButton",
	};
	setAttributes(aboutDialogOKButton, aboutDialogOKButtonAttrs);
	
	const winverSeparator = document.createElement("div");
	const winverSeparatorAttrs = {
		"class": "winverSeparator"
	}
	setAttributes(winverSeparator, winverSeparatorAttrs);
	
	// Winver OS Name
	const winverOSName = document.createElement("p");
	const winverOSNameAttrs = {
		"class": "aboutDialogInfo",
		"id": "winverOSName",
	}
	setAttributes(winverOSName, winverOSNameAttrs);
	
	// Winver Copyright
	const winverCopyright = document.createElement("p");
	const winverCopyrightAttrs = {
		"class": "aboutDialogInfo",
		"id": "winverCopyright",
	}
	setAttributes(winverCopyright, winverCopyrightAttrs);
	
	// Winver License
	const winverLicense = document.createElement("p");
	const winverLicenseAttrs = {
		"class": "aboutDialogInfo",
		"id": "winverLicense",
	}
	setAttributes(winverLicense, winverLicenseAttrs);
	
	// Winver User
	const winverUser = document.createElement("p");
	const winverUserAttrs = {
		"class": "aboutDialogInfo",
		"id": "winverUser",
	}
	setAttributes(winverUser, winverUserAttrs);
	
	// Clear HTML
	aboutDialogContainer.innerHTML = '';
	
	// Append new HTML
	aboutDialogContainer.appendChild(aboutDialogPane);
	aboutDialogPane.appendChild(aboutDialogLogo);
	aboutDialogPane.appendChild(aboutDialogInfoPane);
	
	var IsIE9PreReleaseAppearance = getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE9PreRelease') == 1;
	
	var IsIE10Appearance = getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE10') == 1;
	var IsNotIE11Appearance = getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE11') == 0;
	
	var IsIE11Appearance = getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE11') == 1;
	
	var IsIE11Win10Appearance = getComputedStyle(document.documentElement).getPropertyValue('--appearance_IE11Win10') == 1;
	
	// Strings
	if (IsIE10Appearance && IsIE11Appearance && IsIE11Win10Appearance) {
		var OSCompany = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-company');
		var OSName = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-name');
		var OSBuildVersion = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-build-version');
		var OSBuildString = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-build-string');
		var OSCopyrightYear = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-copyright-year');
		var OSVersion = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-version');
		var OSEdition = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-edition');
		var OSUsername = getComputedStyle(document.documentElement).getPropertyValue('--winver-os-username');
	
		aboutDialogInfoPane.appendChild(winverSeparator);
	
		winverOSName.innerHTML = OSCompany + ' ' + OSName;
		aboutDialogInfoPane.appendChild(winverOSName);
	
		aboutDialogInfoVersion.innerHTML = 'Version' + ' ' + OSBuildVersion + ' (OS Build ' + OSBuildString + ')';
		aboutDialogInfoPane.appendChild(aboutDialogInfoVersion);
	
		aboutDialogMicrosoft.innerHTML = '© ' + OSCopyrightYear + ' ' + OSCompany + ' Corporation. All rights reserved.';
		aboutDialogInfoPane.appendChild(aboutDialogMicrosoft);
	
		winverCopyright.innerHTML = 'The ' + OSName + ' ' + OSVersion + ' ' + OSEdition + ' operating system and its user interface are protected by trademark and other pending or existing intellectual property rights in the United States and other countries/regions.';
		aboutDialogInfoPane.appendChild(winverCopyright);
	
		winverLicense.innerHTML = 'This product is licensed under the ' + '<a href="#">' + OSCompany + ' Software License<br />Terms</a>' + ' to:';
		aboutDialogInfoPane.appendChild(winverLicense);
	
		winverUser.innerHTML = OSUsername;
		aboutDialogInfoPane.appendChild(winverUser);
	
		aboutDialogOKButton.innerHTML = 'OK';
		aboutDialogInfoPane.appendChild(aboutDialogOKButton);
	
	} else if (IsIE10Appearance && IsIE11Appearance) {
	
		aboutDialogInfoVersion.innerHTML = 'Version:' + ' ' + '11.0.9600.17843';
		aboutDialogInfoPane.appendChild(aboutDialogInfoVersion);
	
		aboutDialogInfoUpdateVersion.innerHTML = 'Update Versions:' + ' ' + '11.0.20 <a id="aboutDialogInfoUpdateVersion" href="#">(KB3058515)</a>';
		aboutDialogInfoPane.appendChild(aboutDialogInfoUpdateVersion);
	
		aboutDialogInfoProductID.innerHTML = 'Product ID:' + ' ' + '00150-20000-00003-AA459';
		aboutDialogInfoPane.appendChild(aboutDialogInfoProductID);
	
		aboutDialogMicrosoft.innerHTML = '<a href="#">© 2013 Microsoft Corporation. All rights reserved.</a>';
		aboutDialogInfoPane.appendChild(aboutDialogMicrosoft);
	
		aboutDialogOKButton.innerHTML = 'Close';
		aboutDialogInfoPane.appendChild(aboutDialogOKButton);
	
	}  else if (IsIE10Appearance && IsNotIE11Appearance) {
	
		aboutDialogInfoVersion.innerHTML = 'Version:' + ' ' + '10.0.9200.17457';
		aboutDialogInfoPane.appendChild(aboutDialogInfoVersion);
	
		aboutDialogInfoUpdateVersion.innerHTML = 'Update Version:' + ' ' + '10.0.30 <a id="aboutDialogInfoUpdateVersion" href="#">(KB3078071)</a>';
		aboutDialogInfoPane.appendChild(aboutDialogInfoUpdateVersion);
	
		aboutDialogInfoProductID.innerHTML = 'Product ID:' + ' ' + '00150-20000-00003-AA459';
		aboutDialogInfoPane.appendChild(aboutDialogInfoProductID);
	
		aboutDialogMicrosoft.innerHTML = '<a href="#">© 2012 Microsoft Corporation. All rights reserved.</a>';
		aboutDialogInfoPane.appendChild(aboutDialogMicrosoft);
	
		aboutDialogOKButton.innerHTML = 'Close';
		aboutDialogInfoPane.appendChild(aboutDialogOKButton);
	
	} else if (IsIE9PreReleaseAppearance) {
	
		aboutDialogInfoVersion.innerHTML = 'Version:' + ' ' + '9.0.7930.16406   64-bit Edition';
		aboutDialogInfoPane.appendChild(aboutDialogInfoVersion);
	
		aboutDialogInfoCipherStrength.innerHTML = 'Cipher Strength:' + ' ' + '256-bit';
		aboutDialogInfoPane.appendChild(aboutDialogInfoCipherStrength);
	
		aboutDialogInfoUpdateVersion.innerHTML = 'Update Versions:' + ' ' + 'beta <a id="aboutDialogInfoUpdateVersion" href="#"></a>';
		aboutDialogInfoPane.appendChild(aboutDialogInfoUpdateVersion);
	
		aboutDialogInfoProductID.innerHTML = 'Product ID:' + ' ' + '03201-292-0000007-85504';
		aboutDialogInfoPane.appendChild(aboutDialogInfoProductID);
	
		aboutDialogWarning.innerHTML = 'Warning:' + ' ' + 'This computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution of this program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.';
		aboutDialogInfoPane.appendChild(aboutDialogWarning);
	
		aboutDialogMicrosoft.innerHTML = '<a href="#">© 2010 Microsoft Corporation</a>';
		aboutDialogInfoPane.appendChild(aboutDialogMicrosoft);
	
		aboutDialogOKButton.innerHTML = 'OK';
		aboutDialogInfoPane.appendChild(aboutDialogOKButton);
	
	} else {
		// IE9 Strings
		aboutDialogInfoVersion.innerHTML = 'Version:' + ' ' + '9.0.8112.16421   64-bit Edition';
		aboutDialogInfoPane.appendChild(aboutDialogInfoVersion);
	
		aboutDialogInfoUpdateVersion.innerHTML = 'Update Version:' + ' ' + '9.0.41 (<a id="aboutDialogInfoUpdateVersion" href="#">KB3078071</a>)';
		aboutDialogInfoPane.appendChild(aboutDialogInfoUpdateVersion);
	
		aboutDialogInfoCipherStrength.innerHTML = 'Cipher Strength:' + ' ' + '256-bit';
		aboutDialogInfoPane.appendChild(aboutDialogInfoCipherStrength);
	
		aboutDialogInfoProductID.innerHTML = 'Product ID:' + ' ' + '03553-292-0000007-85504';
		aboutDialogInfoPane.appendChild(aboutDialogInfoProductID);
	
		aboutDialogWarning.innerHTML = 'Warning:' + ' ' + 'This computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution of this program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.';
		aboutDialogInfoPane.appendChild(aboutDialogWarning);
	
		aboutDialogMicrosoft.innerHTML = '<a href="#">© 2011 Microsoft Corporation</a>';
		aboutDialogInfoPane.appendChild(aboutDialogMicrosoft);
	
		aboutDialogOKButton.innerHTML = 'OK';
		aboutDialogInfoPane.appendChild(aboutDialogOKButton);
	
	}
	
	
	// Add Event Listeners
	// KB Link
	aboutDialogInfoUpdateVersion.addEventListener("click", (event) => {
		if (IsIE10Appearance && IsIE11Appearance) {
			_ucUtils.loadURI(window,{
				url: "http://go.microsoft.com/fwlink/?LinkID=395097",
				where: "window"
			});
		}
		else {
			_ucUtils.loadURI(window,{
				url: "http://go.microsoft.com/fwlink/?LinkID=617908",
				where: "window"
			});
		}
	});
	
	// Copyright Link
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