//const pref = 'BeautyFox.appearance.storedAppearanceChoice'
const attr = 'appearance';
if (pref("BeautyFox.appearance.storedAppearanceChoice").tryGet.int() == 0) {
	if (location == "about:privatebrowsing" || location == "about:inprivate") {
		document.documentElement.setAttribute(attr, "IE97930")
	} else {
		document.documentElement.setAttribute(attr, "IE97777")
	}
} else if (pref("BeautyFox.appearance.storedAppearanceChoice").tryGet.int() <= 1) {
	document.documentElement.setAttribute(attr, "IE97930")
} else if (pref("BeautyFox.appearance.storedAppearanceChoice").tryGet.int() <= 2) {
	document.documentElement.setAttribute(attr, "IE9")
} else if (pref("BeautyFox.appearance.storedAppearanceChoice").tryGet.int() <= 6) {
	document.documentElement.setAttribute(attr, "IE10Plus")
} else if (pref("BeautyFox.appearance.storedAppearanceChoice").tryGet.int() >= 7) {
	document.documentElement.setAttribute(attr, "IE11")
}