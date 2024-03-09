// ==UserScript==
// @name        BeautyFox - Settings Manager
// @description Settings Manager for BeautyFox.
// @author      AngelBruni
// @loadorder   2
// ==/UserScript==

function checkboxData(checkboxID) {
	return {
		state: {
			set: function (state) { document.getElementById(checkboxID).checked = state; },
			get: function () { return document.getElementById(checkboxID).checked; }
		}
	}
}

function inputData(inputID) {
	return {
		value: {
			set: function (value) { document.getElementById(inputID).value = value },
			get: function () { return document.getElementById(inputID).value }
		}
	}
}

var isWindowsClassicThemeEnabled = window.matchMedia("(-moz-windows-classic)").matches;
var isWindowsCompositorEnabled = window.matchMedia("(-moz-windows-compositor)").matches;

const BeautyFoxSettingType = {
	appearance: "BeautyFox.appearance.",
	option: "BeautyFox.option."
}

function multipleChoiceSetting(comboBoxId, prefType, prefName) {
	return {
		load: function () { document.getElementById(comboBoxId).querySelector('menupopup menuitem[value="' + pref(prefType + prefName).tryGet.int() + '"]').setAttribute('selected', true); },
		apply: function (map) {
			var selectedValue;

			if (typeof comboBoxId === 'string') {
				selectedValue = document.getElementById(comboBoxId).querySelector('menupopup menuitem[selected="true"]').getAttribute('value');
				console.log('settingsManager - multipleChoiceSetting: Getting information from string, it is probably a Combo Box ID and the value of the selected option is ' + selectedValue)
			} else if (typeof comboBoxId === 'number') {
				selectedValue = comboBoxId;
				console.log('settingsManager - multipleChoiceSetting: Getting information from integer, forcing value of function parameter: ' + selectedValue)
			} else {
				console.error('settingsManager - multipleChoiceSetting: It is not a string or integer.')
				return;
			}

			pref(prefType + prefName).set.int(selectedValue);

			var selectedItem = map.find(item => item.value === parseInt(selectedValue));
			if (selectedItem) {
				map.forEach(item => { item.settings.forEach(setting => { pref(prefType + setting).set.bool(false); }); });

				var settings = selectedItem.settings;
				settings.forEach(setting => { pref(prefType + setting).set.bool(true); });
				pref(prefType + prefName).set.int(parseInt(selectedValue));
			}
		}
	}
}

const mapCollections = {
	appearanceSelectorMap: [
		{ value: 0, settings: ['IE9PreRelease7777', 'IE9PreRelease'] },			// Internet Explorer 9 Pre-Release 7777
		{ value: 1, settings: ['IE9PreRelease'] },								// Internet Explorer 9 Pre-Release 7930
		{ value: 2, settings: [] },												// Internet Explorer 9
		{ value: 3, settings: ['IE10DeveloperPreview'] },						// Internet Explorer 10 Developer Preview
		{ value: 4, settings: ['IE10ConsumerPreview'] },						// Internet Explorer 10 Consumer Preview
		{ value: 5, settings: ['IE10ConsumerPreview', 'IE10ReleasePreview'] },	// Internet Explorer 10 Release Preview
		{ value: 6, settings: ['IE10'] },										// Internet Explorer 10
		{ value: 7, settings: ['IE10', 'IE11'] },								// Internet Explorer 11
		{ value: 8, settings: ['IE10', 'IE11', 'IE11Win10'] }					// Internet Explorer 11 from Windows 10
	],
	edgeButtonSelectorMap: [
		{ value: 0, settings: [] },
		{ value: 1, settings: [] },
		{ value: 2, settings: [] }
	],
	extensionsButtonSelectorMap: [
		{ value: 0, settings: [] },
		{ value: 1, settings: [] },
		{ value: 2, settings: [] }
	],
	bookmarkItemTitleWidthSelectorMap: [
		{ value: 0, settings: [] },
		{ value: 1, settings: [] },
		{ value: 2, settings: [] }
	],
	customiseCommandBarItemsSelectorMap: [
		{ value: 0, settings: [] },
		{ value: 1, settings: [] },
		{ value: 2, settings: [] }
	],
	fakeInternetProtectedLabelSelectorMap: [
		{ value: 0, settings: [] },
		{ value: 1, settings: [] },
		{ value: 2, settings: [] },
		{ value: 3, settings: [] }
	],
	customColourMethodForUISelectorMap: [
		{ value: 0, settings: [] },
		{ value: 1, settings: [] },
		{ value: 2, settings: [] },
		{ value: 3, settings: [] },
		{ value: 4, settings: [] }
	]
};
const multipleChoiceSettings = [
	{ id: 'appearanceSelector',                 type: BeautyFoxSettingType.appearance, name: 'storedAppearanceChoice',                 map: mapCollections.appearanceSelectorMap },
	{ id: 'edgeButtonSelector',                 type: BeautyFoxSettingType.option,     name: 'storedEdgeButtonChoice',                 map: mapCollections.edgeButtonSelectorMap },
	{ id: 'extensionsButtonSelector',           type: BeautyFoxSettingType.option,     name: 'storedExtensionsButtonChoice',           map: mapCollections.extensionsButtonSelectorMap },
	{ id: 'bookmarkItemTitleWidthSelector',     type: BeautyFoxSettingType.option,     name: 'storedBookmarItemTitleWidthChoice',      map: mapCollections.bookmarkItemTitleWidthSelectorMap },
	{ id: 'customiseCommandBarItemsSelector',   type: BeautyFoxSettingType.option,     name: 'storedCustomiseCommandBarItemsChoice',   map: mapCollections.customiseCommandBarItemsSelectorMap },
	{ id: 'fakeInternetProtectedLabelSelector', type: BeautyFoxSettingType.option,     name: 'storedFakeInternetProtectedLabelChoice', map: mapCollections.fakeInternetProtectedLabelSelectorMap },
	{ id: 'customColourMethodForUISelector',    type: BeautyFoxSettingType.option,     name: 'storedCustomColourMethodForUIChoice',    map: mapCollections.customColourMethodForUISelectorMap }
];
let boolSettings = [
	"bTabsOnNavRow",
	"bFakeDropdownIconsinCommandBar",
	"bShowStatusBar",
	"bHideSettingsInPopUp",
	"bHideFakeInnerBorders",
	"bInetCPL",
	"bDoNotUseOldSettingsIcon",
	"bShowDownloadProgress",
	"bDoNotRunWizardInNextStart",
	"iForceAeroSupport" ],
	stringSettings = [ "sDesiredColourForUI",
					   "sDWMBlurGlassPath" ]

let intSettings = [
	{ type: BeautyFoxSettingType.option,			name: "iNavigationButtonsRadius" },
	{ type: 'browser.newtabpage.activity-stream.',	name: "topSitesRows" },
];

const settingsManager = {
	load: function () {
		multipleChoiceSettings.forEach(setting => {
			const { id, type, name } = setting;
			multipleChoiceSetting(id, type, name).load();
		});
		boolSettings.forEach(setting => checkboxData(setting).state.set(pref(BeautyFoxSettingType.option + setting).tryGet.bool()))
		intSettings.forEach(setting => inputData(setting.name).value.set(pref(setting.type + setting.name).tryGet.int()));
		stringSettings.forEach(setting => inputData(setting).value.set(pref(BeautyFoxSettingType.option + setting).tryGet.string()))

		if (pref('widget.ev-native-controls-patch.override-win-version').tryGet.int() == 7) 
			checkboxData('iForceAeroSupport').state.set(true)
	},
	apply: function () {
		multipleChoiceSettings.forEach(setting => {
			const { id, type, name, map } = setting;
			multipleChoiceSetting(id, type, name).apply(map);
		});
		boolSettings.forEach(setting => pref(BeautyFoxSettingType.option + setting).set.bool(checkboxData(setting).state.get()));
		intSettings.forEach(setting => pref(setting.type + setting.name).set.int(inputData(setting.name).value.get()));
		stringSettings.forEach(setting => pref(BeautyFoxSettingType.option + setting).set.string(inputData(setting).value.get()));

		const winVersion = checkboxData('iForceAeroSupport').state.get() ? 7 : 10;
		pref('widget.ev-native-controls-patch.override-win-version').set.int(winVersion);
	}
}

function iHateClassicAndBasicTheme() {
	if (isWindowsClassicThemeEnabled) {
		if (pref(BeautyFoxSettingType.option + 'bDoNotRunWizardInNextStart').tryGet.bool()) {
			var storedAppearanceChoice = pref(BeautyFoxSettingType.appearance + 'storedAppearanceChoice').tryGet.int()

			if (storedAppearanceChoice !== 2 || !pref(BeautyFoxSettingType.option + 'bHideFakeInnerBorders').tryGet.bool() || pref('browser.tabs.inTitlebar').tryGet.int() !== 0) {
				multipleChoiceSetting(2, BeautyFoxSettingType.appearance, 'storedAppearanceChoice').apply(mapCollections.appearanceSelectorMap);
				pref(BeautyFoxSettingType.option + 'bHideFakeInnerBorders').set.bool(true);
				pref('browser.tabs.inTitlebar').set.int(0);

				console.log('settingsManager - iHateClassicTheme: Forcing native titlebar, IE9 appearance and hiding fake inner borders for Classic Theme')
				_ucUtils.restart(true);
			}

			if (pref('BeautyFox.option.storedCustomColourMethodForUIChoice').tryGet.int() !== 0)
				multipleChoiceSetting(0, BeautyFoxSettingType.appearance, 'storedCustomColourMethodForUIChoice').apply(mapCollections.appearanceSelectorMap);
		}
	} else if (!isWindowsCompositorEnabled) {
		if (!pref(BeautyFoxSettingType.option + 'bHideFakeInnerBorders').tryGet.bool()) {
			pref(BeautyFoxSettingType.option + 'bHideFakeInnerBorders').set.bool(true);

			console.log('settingsManager - iHateBasicTheme: Forcing hide fake inner borders for Basic Theme')
			_ucUtils.restart(true);
		}

		if (pref('BeautyFox.option.storedCustomColourMethodForUIChoice').tryGet.int() !== 0)
			multipleChoiceSetting(0, BeautyFoxSettingType.appearance, 'storedCustomColourMethodForUIChoice').apply(mapCollections.appearanceSelectorMap);
	} else { console.warn('settingsManager - iHateClassicAndBasicTheme: Something went wrong... ' + 'the stored appearance choice is: ' + storedAppearanceChoice + '. This can probably be ignored.') }
}
iHateClassicAndBasicTheme();

const settingsChanged = new CustomEvent("settingsChanged");

document.addEventListener("settingsChanged", () => {
	if (location == 'chrome://browser/content/browser.xhtml') {	
		fixTabs();
		moveExtensionsBtn();
		setNavButtonsRadius();
		createMSEdgeNewTabButton();
		updateSettingsAppearance();
		updateBookmarkAppearance();
		updateCommandbarAppearance();
		downloadsButton();
		updateStatusbarAppearance();
		fixUrlbarHeight();
		changeUrlbarFakeDropdownStyling();
		loadLocale();
	} 

	if (location == 'chrome://browser/content/browser.xhtml' || location == 'chrome://bfwindows/content/options/index.xhtml') {
		const timeout = pref('BeautyFox.option.storedCustomColourMethodForUIChoice').tryGet.int() === 4 ? 300 : 0;
		setTimeout(() => {
			setCustomColourInUI();
		}, timeout);
	}

	console.log('Applied settings in all ' + location)
});