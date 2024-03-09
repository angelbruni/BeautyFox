var IsIE9PreReleaseAppearance = pref("BeautyFox.appearance.IE9PreRelease").tryGet.bool();
var IsIE10DeveloperPreviewAppearance = pref("BeautyFox.appearance.IE10DeveloperPreview").tryGet.bool();
var IsIE10ConsumerPreviewAppearance = pref("BeautyFox.appearance.IE10ConsumerPreview").tryGet.bool();
var IsIE10ReleasePreviewAppearance = pref("BeautyFox.appearance.IE10ReleasePreview").tryGet.bool();
var IsIE10Appearance = pref("BeautyFox.appearance.IE10").tryGet.bool();
var IsIE11Appearance = pref("BeautyFox.appearance.IE11").tryGet.bool();

var aboutVersionLabel = document.getElementById("aboutVersion");
var aboutUpdateVersionsLabel = document.getElementById("aboutUpdateVersions");
var aboutProductIDLabel = document.getElementById("aboutProductID");
var aboutMicrosoftLabel = document.getElementById("aboutIEMicrosoft");
var aboutUpdateKBLabel = document.getElementById("aboutUpdateKB");
var aboutVersionString, aboutUpdateVersionsString, aboutUpdateKBString, aboutProductIDString, aboutMicrosoftString;

var ieAppearances = [
    {
        "name": "IE11",
        "versionString": "11.0.9600.17843",
        "updateVersionsString": "11.0.20",
        "updateKBString": "KB3058515",
        "productIDString": "00150-20000-00003-AA459",
        "microsoftString": "© 2013 Microsoft Corporation. All rights reserved.",
        "href": "http://go.microsoft.com/fwlink/?LinkID=395097"
    },
    {
        "name": "IE10",
        "versionString": "10.0.9200.17457",
        "updateVersionsString": "10.0.30",
        "updateKBString": "KB3078071",
        "productIDString": "00150-20000-00003-AA459",
        "microsoftString": "© 2012 Microsoft Corporation. All rights reserved.",
        "href": "http://go.microsoft.com/fwlink/?LinkID=395097"
    },
    {
        "name": "IE10ReleasePreview",
        "versionString": "10.0.8375.0",
        "updateVersionsString": "Pre-release",
        "updateKBString": "KB2702844",
        "productIDString": "00150-20000-00001-AA416",
        "microsoftString": "© 2012 Microsoft Corporation. All rights reserved.",
        "href": "http://go.microsoft.com/fwlink/?LinkID=395097"
    },
    {
        "name": "IE10ConsumerPreview",
        "versionString": "10.0.8250.0",
        "updateVersionsString": "Pre-release",
        "updateKBString": "KB2650043",
        "productIDString": "00150-20000-00001-AA416",
        "microsoftString": "© 2012 Microsoft Corporation. All rights reserved.",
        "href": "http://go.microsoft.com/fwlink/?LinkID=395097"
    },
    {
        "name": "IE10DeveloperPreview",
        "versionString": "10.0.8102.0",
        "updateVersionsString": "Pre-release",
        "updateKBString": "KB2587683",
        "productIDString": "00127-82010-02956-AA976",
        "microsoftString": "© 2011 Microsoft Corporation",
        "href": "http://go.microsoft.com/fwlink/?LinkID=395097"
    },
    {
        "name": "IE9PreRelease",
        "versionString": "9.0.7930.16406",
        "updateVersionsString": "beta",
        "productIDString": "03201-292-0000007-85504",
        "microsoftString": "© 2010 Microsoft Corporation",
        "href": ""
    },
    {
        "name": "IE9",
        "versionString": "9.0.8112.16421",
        "updateVersionsString": "9.0.41",
        "updateKBString": "KB3078071",
        "productIDString": "03553-292-0000007-85504",
        "microsoftString": "© 2011 Microsoft Corporation",
        "href": "http://go.microsoft.com/fwlink/?LinkID=617908"
    }
];

function getAndSetIEInfo() {
    var appearance = null;
    for (var i = 0; i < ieAppearances.length; i++) {
        if (pref("BeautyFox.appearance." + ieAppearances[i].name).tryGet.bool()) {
            appearance = ieAppearances[i];
            break;
        }
    }
    if (!appearance) { appearance = ieAppearances.find(ie => ie.name === "IE9"); }

    aboutVersionLabel.textContent = appearance.versionString;
    aboutUpdateVersionsLabel.textContent = appearance.updateVersionsString;
    aboutProductIDLabel.textContent = appearance.productIDString;
    aboutMicrosoftLabel.textContent = appearance.microsoftString;
    aboutUpdateKBLabel.textContent = appearance.updateKBString;
    aboutUpdateKBLabel.setAttribute("href", appearance.href);
}
getAndSetIEInfo();

var aboutIEMicrosoftLabel = document.getElementById("aboutIEMicrosoft");
aboutIEMicrosoftLabel.setAttribute("href", "http://go.microsoft.com/fwlink/?LinkID=617908");

var aboutVersionBitLabel = document.getElementById("aboutVersionBit");
if (navigator.userAgent.includes("x64")) { aboutVersionBitLabel.style.display = 'inline'; }