// ==UserScript==
// @name        BeautyFox - Functions Loader
// @description Loads functions after "load" so no issues arise.
// @author      AngelBruni
// @loadorder   2
// ==/UserScript==

const { ctypes } = Components.utils.import("resource://gre/modules/ctypes.jsm", {});

if (location == "chrome://browser/content/browser.xhtml" || location == "chrome://bfwindows/content/options/index.xhtml") {
	function executeFunctions() {
		// TODO: Change menu entries with IE ones;
		// TODO: Modals to dialogs.
		// TODO: Make Windows-only code execute only in Windows.
		launchBeautyFoxWizard();
		setNavButtonsRadius();
		createFeedbackButton();
		createNewAndEndToolbar();
		fixTabs();
		urlbarContainerBackgroundOnMouseAttrs();
		removeReloadWhenTyping();
		changeUrlbarFakeDropdownStyling();
		addEllipsesSearch();
		insertMSEdgeNewTabButton();
		updateSettingsAppearance();
		createFavouritesSidebarButton();
		updateBookmarkAppearance();
		createAddToBookmarksBarButton();
		moveExtensionsBtn();
		createCommandBar();
		updateCommandbarAppearance();
		createCBHomeButton();
		createCBPrintButton();
		createCBReadMailButton()
		downloadsButton();
		createFakeTitlebarSpace();
		createStatusbar();
		updateStatusbarAppearance();
		loadLocale();
	
		setTimeout(() => { applyTranslations(); }, 1000);
		
		console.info("Functions executed.");
	}
	
	window.addEventListener("load", function () { executeFunctions(); })
}

