const { AppConstants } = ChromeUtils.importESModule("resource://gre/modules/AppConstants.sys.mjs");

Services.wm.getMostRecentWindow("navigator:browser").close();

function setFirefoxDefaults() {
	const browserName = AppConstants.MOZ_APP_NAME;

	// Firefox
	pref('toolkit.legacyUserProfileCustomizations.stylesheets').set.bool(true);				// Enables chrome themes;
	pref('browser.display.windows.non_native_menus').set.int(0);							// Disables non-native menus;
	pref('widget.non-native-theme.enabled').set.bool(false);								// Disables non-native-looking controls;
	pref('browser.tabs.tabmanager.enabled').set.bool(false);								// Removes tabs dropdown;
	pref('browser.theme.dark-private-windows').set.bool(false);								// Disables dark theme in Private window;
	pref('nglayout.enable_drag_image').set.bool(false);										// Disables thumbnail preview when dragging tab;
	pref('browser.newtabpage.activity-stream.topSitesRows').set.int(2)						// Enables 2 rows for the new tab page;
	pref('browser.taskbar.previews.enable').set.bool(true);        							// Enables taskbar tabs previews;
	pref('browser.download.always_ask_before_handling_new_types').set.bool(true)			// Enables legacy download dialog;
	pref('security.dialog_enable_delay').set.int(0);										// Disables OK button delay in the legacy download dialog;
	pref('browser.uidensity').set.int(0);													// Forces UI density to Normal;
	pref('browser.touchmode.auto').set.bool(false);											// Disable Touch density when Tablet mode;
	pref('browser.newtabpage.activity-stream.feeds.section.highlights').set.bool(false);	// Disable recent activity in new tab;
	pref('browser.tabs.inTitlebar').set.int(1);												// Disable native titlebar;
	pref('browser.toolbars.bookmarks.visibility').set.string('never');						// Hide bookmarks bar initially;
	pref('browser.download.autohideButton').set.bool(true);									// Auto-hide downloads button if empty.
	// Set default layout.
	pref('browser.uiCustomization.state').set.string('{"placements": {"widget-overflow-fixed-list": [],"unified-extensions-area": [],"nav-bar": ["back-button","forward-button","urlbar-container","stop-reload-button","bookmarks-button","unified-extensions-button","search-container"],"endToolbar": ["home-button","bookmarksSidebarButton","IEMenuButton","feedbackButton"],"TabsToolbar": ["tabbrowser-tabs","new-tab-button","alltabs-button"],"toolbar-menubar": ["menubar-items"],"PersonalToolbar": ["addToBookmarksBarButton","suggestedsites_bruni_com-browser-action","personal-bookmarks"],"commandBar": ["cBHomeButton","cBPrintButton","cBReadMailButton","downloads-button","cBPageMenuButton","cBToolsMenuButton","cBSafetyMenuButton","cBHelpMenuButton"],"addonsBar": ["_799c0914-748b-41df-a25c-22d008f9e83f_-browser-action","ublock0_raymondhill_net-browser-action","zoomMenuButton"]},"seen": [],"dirtyAreaCache": ["nav-bar","endToolbar","TabsToolbar","toolbar-menubar","PersonalToolbar","commandBar","addonsBar","unified-extensions-area"],"currentVersion": 19,"newElementCount": 61}')
	
	// Waterfox
	if (browserName == 'waterfox') {
		pref('browser.theme.enableWaterfoxCustomizations').set.int(2);	// Disable Waterfox's theming;
		pref('browser.tabs.toolbarposition').set.string('topabove');	// Force tab position to top;
		pref('browser.statusbar.enabled').set.bool(false);				// Disable Waterfox's status bar;
		pref('browser.bookmarks.toolbarposition').set.string('top');	// Force bookmarks toolbar position to top.
	}

	// BeautyFox
	multipleChoiceSetting(2, BeautyFoxSettingType.appearance, 'storedAppearanceChoice').apply(mapCollections.appearanceSelectorMap);
	pref('BeautyFox.option.bHideFakeInnerBorders').set.bool(false);
	pref('BeautyFox.option.bInetCPL').set.bool(false);
	pref('BeautyFox.option.bShowDownloadProgress').set.bool(false);
	pref('BeautyFox.option.bTabsOnNavRow').set.bool(true);
	multipleChoiceSetting(1, BeautyFoxSettingType.option, 'storedEdgeButtonChoice').apply(mapCollections.edgeButtonSelectorMap);
	pref('BeautyFox.option.bHideSettingsInPopUp').set.bool(true);
	pref('BeautyFox.option.bDoNotUseOldSettingsIcon').set.bool(false);
	multipleChoiceSetting(1, BeautyFoxSettingType.option, 'storedExtensionsButtonChoice').apply(mapCollections.extensionsButtonSelectorMap);
	multipleChoiceSetting(0, BeautyFoxSettingType.option, 'storedBookmarItemTitleWidthChoice').apply(mapCollections.bookmarkItemTitleWidthSelectorMap);
	pref('BeautyFox.option.bFakeDropdownIconsinCommandBar').set.bool(true);
	multipleChoiceSetting(1, BeautyFoxSettingType.option, 'storedCustomiseCommandBarItemsChoice').apply(mapCollections.customiseCommandBarItemsSelectorMap);
	pref('BeautyFox.option.bShowStatusBar').set.bool(false);
	multipleChoiceSetting(0, BeautyFoxSettingType.option, 'storedFakeInternetProtectedLabelChoice').apply(mapCollections.fakeInternetProtectedLabelSelectorMap);
	pref('BeautyFox.option.iNavigationButtonsRadius').set.int(50);
	multipleChoiceSetting(0, BeautyFoxSettingType.option, 'storedCustomColourMethodForUIChoice').apply(mapCollections.customColourMethodForUISelectorMap);
	pref('BeautyFox.option.sDesiredColourForUI').set.string('#0284c5');
	pref('BeautyFox.option.sDWMBlurGlassPath').set.string('C:\\DWMBlurGLass');
	pref('BeautyFox.option.commandBar').set.bool(false);

	// Native Controls Patch
	if (navigator.oscpu.split(';')[0] == 'Windows NT 10.0') {
		pref('widget.ev-native-controls-patch.override-win-version').set.int(7);
		pref('BeautyFox.option.iForceAeroSupport').set.bool(true);
	}
}
setFirefoxDefaults()

if (pref('browser.theme.enableWaterfoxCustomizations').tryGet.int() !== 2) {
	setFirefoxDefaults();
	_ucUtils.restart(true);
}