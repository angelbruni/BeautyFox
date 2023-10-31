var IsIE9PreReleaseAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE9PreRelease");
var IsIE10Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10");
var IsIE11Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE11");

var aboutVersionLabel = document.getElementById('aboutVersion');
var aboutUpdateVersionsLabel = document.getElementById('aboutUpdateVersions');
if (IsIE11Appearance) {
    var aboutVersionString = '11.0.9600.17843';
    var aboutVersionBitString = '11.0.20';
}
else if (IsIE10Appearance) {
    var aboutVersionString = '10.0.9200.17457';
    var aboutVersionBitString = '10.0.30';
}
else if (IsIE9PreReleaseAppearance) {
    var aboutVersionString = '9.0.7930.16406';
    var aboutVersionBitString = 'beta';
}
else {
    var aboutVersionString = '9.0.8112.16421';
    var aboutVersionBitString = '9.0.41';
}
aboutVersionLabel.textContent = aboutVersionString;
aboutUpdateVersionsLabel.textContent = aboutVersionBitString;

var aboutVersionBitLabel = document.getElementById('aboutVersionBit');
var is64Bit = navigator.userAgent.includes("Win64") || navigator.userAgent.includes("x64");
if (is64Bit) {
    aboutVersionBitLabel.style.display = 'inline';
}