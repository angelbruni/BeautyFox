let IsIE9PreReleaseAppearance = false;
try {
    IsIE9PreReleaseAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE9PreRelease");
    console.log("IE9 Pre-Release Appearance:", IsIE9PreReleaseAppearance);
} catch (error) {
    console.error("Error retrieving IE9 Pre-Release Appearance preference:", error);
}

let IsIE10DeveloperPreviewAppearance = false;
try {
    IsIE10DeveloperPreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10DeveloperPreview");
    console.log("IE10DeveloperPreview Appearance:", IsIE10DeveloperPreviewAppearance);
} catch (error) {
    console.error("Error retrieving IE10DeveloperPreview Appearance preference:", error);
}

let IsIE10ConsumerPreviewAppearance = false;
try {
    IsIE10ConsumerPreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10ConsumerPreview");
    console.log("IE10ConsumerPreview Appearance:", IsIE10ConsumerPreviewAppearance);
} catch (error) {
    console.error("Error retrieving IE10ConsumerPreview Appearance preference:", error);
}

let IsIE10ReleasePreviewAppearance = false;
try {
    IsIE10ReleasePreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10ReleasePreview");
    console.log("IE10ReleasePreview Appearance:", IsIE10ReleasePreviewAppearance);
} catch (error) {
    console.error("Error retrieving IE10ReleasePreview Appearance preference:", error);
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