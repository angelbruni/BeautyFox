var IsIE9PreReleaseAppearance = false;
try {
  	IsIE9PreReleaseAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE9PreRelease");
} catch (error) {
  	console.error("Error retrieving IE9 Pre-Release Appearance preference:", error);
}

var IsIE10DeveloperPreviewAppearance = false;
try {
  	IsIE10DeveloperPreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10DeveloperPreview");
} catch (error) {
  	console.error("Error retrieving IE10DeveloperPreview Appearance preference:", error);
}

var IsIE10ConsumerPreviewAppearance = false;
try {
  	IsIE10ConsumerPreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10ConsumerPreview");
} catch (error) {
  	console.error("Error retrieving IE10ConsumerPreview Appearance preference:", error);
}

var IsIE10ReleasePreviewAppearance = false;
try {
  	IsIE10ReleasePreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10ReleasePreview");
} catch (error) {
  	console.error("Error retrieving IE10ReleasePreview Appearance preference:", error);
}

var IsIE10Appearance = false;
try {
  	IsIE10Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10");
} catch (error) {
  	console.error("Error retrieving IE10 Appearance preference:", error);
}

var IsIE11Appearance = false;
try {
  	IsIE11Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE11");
} catch (error) {
  	console.error("Error retrieving IE11 Appearance preference:", error);
}

var aboutVersionLabel = document.getElementById('aboutVersion');
var aboutUpdateVersionsLabel = document.getElementById('aboutUpdateVersions');
var aboutProductIDLabel = document.getElementById('aboutProductID');
var aboutMicrosoftLabel = document.getElementById('aboutIEMicrosoft');
var aboutUpdateKBLabel = document.getElementById('aboutUpdateKB');
var aboutVersionString = null;
var aboutUpdateVersionsString = null;
var aboutUpdateKBString = null;
var aboutProductIDString = null;
var aboutMicrosoftString = null;
function getNSetIEInfo() {
    if (IsIE11Appearance) {
        aboutVersionString = '11.0.9600.17843';
        aboutUpdateVersionsString = '11.0.20';
        aboutUpdateKBString = '(KB3058515)';
        aboutUpdateKBLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=395097');
        aboutProductIDString = '00150-20000-00003-AA459';
        aboutMicrosoftString = '© 2013 Microsoft Corporation. All rights reserved.';
    }
    else if (IsIE10Appearance) {
        aboutVersionString = '10.0.9200.17457';
        aboutUpdateVersionsString = '10.0.30';
        aboutUpdateKBString = '(KB3078071)';
        aboutUpdateKBLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=395097');
        aboutProductIDString = '00150-20000-00003-AA459';
        aboutMicrosoftString = '© 2012 Microsoft Corporation. All rights reserved.';
    }
    else if (IsIE10ReleasePreviewAppearance) {
        aboutVersionString = '10.0.8375.0';
        aboutUpdateVersionsString = 'Pre-release';
        aboutUpdateKBString = '(KB2702844)';
        aboutUpdateKBLabel.setAttribute('href', '');
        aboutProductIDString = '00150-20000-00001-AA416';
        aboutMicrosoftString = '© 2012 Microsoft Corporation. All rights reserved.';
    }
    else if (IsIE10ConsumerPreviewAppearance) {
        aboutVersionString = '10.0.8250.0';
        aboutUpdateVersionsString = 'Pre-release';
        aboutUpdateKBString = '(KB2650043)';
        aboutUpdateKBLabel.setAttribute('href', '');
        aboutProductIDString = '00150-20000-00001-AA416';
        aboutMicrosoftString = '© 2012 Microsoft Corporation. All rights reserved.';
    }
    else if (IsIE10DeveloperPreviewAppearance) {
        aboutVersionString = '10.0.8102.0';
        aboutUpdateVersionsString = 'Pre-release';
        aboutUpdateKBString = '(KB2587683)';
        aboutUpdateKBLabel.setAttribute('href', '');
        aboutProductIDString = '00127-82010-02956-AA976';
        aboutMicrosoftString = '© 2011 Microsoft Corporation';
    }
    else if (IsIE9PreReleaseAppearance) {
        aboutVersionString = '9.0.7930.16406';
        aboutUpdateVersionsString = 'beta';
        aboutProductIDString = '03201-292-0000007-85504';
        aboutMicrosoftString = '© 2010 Microsoft Corporation';
    }
    else {
        aboutVersionString = '9.0.8112.16421';
        aboutUpdateVersionsString = '9.0.41';
        aboutUpdateKBString = '(KB3078071)';
        aboutUpdateKBLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=617908');
        aboutProductIDString = '03553-292-0000007-85504';
        aboutMicrosoftString = '© 2011 Microsoft Corporation';
    }

    setIEInfo()
}
getNSetIEInfo();

var aboutIEMicrosoftLabel = document.getElementById('aboutIEMicrosoft');
aboutIEMicrosoftLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=617908');

function setIEInfo() {
    aboutVersionLabel.textContent = aboutVersionString;
    aboutUpdateVersionsLabel.textContent = aboutUpdateVersionsString;
    aboutProductIDLabel.textContent = aboutProductIDString;
    aboutMicrosoftLabel.textContent = aboutMicrosoftString;
    aboutUpdateKBLabel.textContent = aboutUpdateKBString;
}

var aboutVersionBitLabel = document.getElementById('aboutVersionBit');
var is64Bit = navigator.userAgent.includes("Win64") || navigator.userAgent.includes("x64");
if (is64Bit) {
    aboutVersionBitLabel.style.display = 'inline';
}

var aboutLogoImage = document.getElementById('aboutIELogo');
var aboutIEInfoCipherStrength = document.getElementById('aboutIEInfoCipherStrength');
var aboutIEInfoProductID = document.getElementById('aboutIEInfoProductID');
var aboutIEWarningLabel = document.getElementById('aboutIEWarning');

var aboutIEWindow = document.querySelector('window');

var aboutUpdateVersionsTitle = document.getElementById('aboutUpdateVersionsTitle');

// Add event listener for Shift key press to toggle special items
document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
        aboutIEWindow.setAttribute('locale', 'aboutBeautyFox');
        loadLocale();

        aboutLogoImage.style.backgroundPositionY = '-532px';
        aboutVersionString = '1.0';
        aboutVersionBitLabel.style.display = 'none';
        aboutUpdateKBLabel.style.display = 'none';
        aboutUpdateVersionsTitle.style.display = 'none';
        aboutUpdateVersionsLabel.style.transform = 'translateX(-3px)';
        aboutUpdateVersionsString = ' BeautyFox Dark Beta 1. Based on Beautyfox Release Candidate 1';
        aboutIEInfoProductID.style.opacity = 0;
        aboutIEInfoCipherStrength.style.opacity = 0;
        aboutIEWarningLabel.style.opacity = 0;
        aboutMicrosoftString = 'by AngelBruni and ImSwordQueen with ♥';
        aboutIEMicrosoftLabel.setAttribute('href', 'https://github.com/angelbruni');
        setIEInfo();
    }
});

document.addEventListener('keyup', function() {
    aboutIEWindow.setAttribute('locale', 'aboutIE');
    loadLocale();

    aboutLogoImage.style.backgroundPositionY = null;
    if (is64Bit) {
        aboutVersionBitLabel.style.display = 'inline';
    }
    aboutUpdateKBLabel.style.display = null;
    aboutUpdateVersionsTitle.style.display = null;
    aboutUpdateVersionsLabel.style.transform = null;
    aboutIEInfoCipherStrength.style.opacity = null;
    aboutIEInfoProductID.style.opacity = null;
    aboutIEWarningLabel.style.opacity = null;

    aboutIEMicrosoftLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=617908');
    getNSetIEInfo();
});