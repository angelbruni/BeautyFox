let IsIE9PreReleaseAppearance = false;
try {
  	IsIE9PreReleaseAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE9PreRelease");
  	console.log("IE9 Pre-Release Appearance:", IsIE9PreReleaseAppearance);
} catch (error) {
  	console.error("Error retrieving IE9 Pre-Release Appearance preference:", error);
}

let IsIE10Appearance = false;
try {
  	IsIE10Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10");
  	console.log("IE10 Appearance:", IsIE10Appearance);
} catch (error) {
  	console.error("Error retrieving IE10 Appearance preference:", error);
}

let IsIE11Appearance = false;
try {
  	IsIE11Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE11");
  	console.log("IE11 Appearance:", IsIE11Appearance);
} catch (error) {
  	console.error("Error retrieving IE11 Appearance preference:", error);
}

var aboutVersionLabel = document.getElementById('aboutVersion');
var aboutUpdateVersionsLabel = document.getElementById('aboutUpdateVersions');
var aboutProductIDLabel = document.getElementById('aboutProductID');
var aboutMicrosoftLabel = document.getElementById('aboutIEMicrosoft');
var aboutUpdateKBLabel = document.getElementById('aboutUpdateKB');
if (IsIE11Appearance) {
    var aboutVersionString = '11.0.9600.17843';
    var aboutVersionBitString = '11.0.20';
    var aboutUpdateKBString = '(KB3058515)';
    aboutUpdateKBLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=395097');
    var aboutProductIDString = '00150-20000-00003-AA459';
    var aboutMicrosoftString = '© 2013 Microsoft Corporation. All rights reserved.';
}
else if (IsIE10Appearance) {
    var aboutVersionString = '10.0.9200.17457';
    var aboutVersionBitString = '10.0.30';
    var aboutUpdateKBString = '(KB3078071)';
    aboutUpdateKBLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=395097');
    var aboutProductIDString = '00150-20000-00003-AA459';
    var aboutMicrosoftString = '© 2012 Microsoft Corporation. All rights reserved.';
}
else if (IsIE9PreReleaseAppearance) {
    var aboutVersionString = '9.0.7930.16406';
    var aboutVersionBitString = 'beta';
    var aboutProductIDString = '03201-292-0000007-85504';
    var aboutMicrosoftString = '© 2010 Microsoft Corporation';
}
else {
    var aboutVersionString = '9.0.8112.16421';
    var aboutVersionBitString = '9.0.41';
    var aboutUpdateKBString = '(KB3078071)';
    aboutUpdateKBLabel.setAttribute('href', 'http://go.microsoft.com/fwlink/?LinkID=617908');
    var aboutProductIDString = '03553-292-0000007-85504';
    var aboutMicrosoftString = '© 2011 Microsoft Corporation';
}
aboutVersionLabel.textContent = aboutVersionString;
aboutUpdateVersionsLabel.textContent = aboutVersionBitString;
aboutProductIDLabel.textContent = aboutProductIDString;
aboutMicrosoftLabel.textContent = aboutMicrosoftString;
aboutUpdateKBLabel.textContent = aboutUpdateKBString;

var aboutVersionBitLabel = document.getElementById('aboutVersionBit');
var is64Bit = navigator.userAgent.includes("Win64") || navigator.userAgent.includes("x64");
if (is64Bit) {
    aboutVersionBitLabel.style.display = 'inline';
}