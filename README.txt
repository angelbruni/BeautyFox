!!! BEAUTYFOX (IE9+) THEME FOR FIREFOX 115 ESR ONLY !!!
Tested on: Windows 7, Windows 8.1/10 with the default theme and Aero themes with Glass8 enabled and Windows 11.

!!! IT DOES NOT WORK PROPERLY WITH WINDOWBLINDS !!!

MAKE SURE THAT YOUR PROFILE HAS NOT BEEN MODIFIED BY OTHER THEMES IN THE PAST, AND IF SO, DELETE THE MODIFIED FILES OR CREATE A NEW PROFILE!

Changelog b3.0
- Fixed the toolbar button background position;
- Internet Explorer 11 Windows 10+ appearance does not show fake borders;
- TabsToolbar shine is always disabled if BeautyFox.option.tabsOnNavRow is enabled;
- Fixed Internet Explorer 10+ appearances favourites icon;
- Changed context menu navigation items from column-icons to row-text to replicate native context menu items;
- Fixed bookmarks bar bookmark button icon looking stretched in height;
- Fixed bookmark items being styled in menus;
- Fixed tabs close button not showing on hover if tabs are too small;
- Added "About" string localisation;
- Added Downloads window + localisation;
- Initial work on settings menu;
- Changed the sidebars (bookmarks and history) look;
- Fixed the titlebar height when maximised;
- Initial work on appMenuNotificationPopup;
- Fixed addEllipsesSearchPlaceholder script breaking scriptsLoader;
- Fixed backwards button masking in IE9Pre-Release;
- Added custom navigation colours BeautyFox.option.customColouredNavButtons as an option in about:config, the custom colour is selected from uservars.css --navButtons-customColour variable;
- Fixed native buttons having white colours sometimes;
- Fixed bookmarks bar border-bottom not filling the entire width;
- Fixed menu bar, bookmarks bar and customize page having the fake border even when maxmised/fullscreened;
- Renamed BeautyFox.hide.unifiedExtensions to BeautyFox.option.hideUnifiedExtensions;
- Fixed new tab button not having outlined in IE9 appearance;
- Fixed new tab button not having hover background-colour in IE9 Pre-Release appearance;
- Made the close button not show if there's only one tab opened in IE9 Pre-Release appearance;
- Removed tabs row margin when maximised;
- Fixed bookmarks bar bookmark button not having the same height as the bookmarks;



CLEAR STARTUP CACHE


Instructions

1.	about:config
1.1.	Number	- ui.prefersReducedMotion = 1;
1.2.	Boolean	- toolkit.legacyUserProfileCustomizations.stylesheets = true;
1.3.	Boolean	- browser.tabs.tabmanager.enabled = false;
1.4.	Boolean	- browser.theme.dark-private-windows = false.
1.5.	Close Firefox


2.	Copy/pasting
2.1.	copy the contents of the Firefox Folder to where the firefox.exe is located;
2.2.	copy the contents of the Profile FOlder to the Root Directory of the profile folder (about:profiles).


3.	Resource Hacker (if your OS is NOT Windows Vista/7) - Enable glass in navigation pane
3.1.	firefox.exe > Manifest > delete/comment these lines:

	<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
	<supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/>
	<supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/>



	Optional

1.	about:config
	- Boolean - BeautyFox.hide.unifiedExtensions		Hide the extensions button;
	- Boolean - BeautyFox.option.tabsOnNavRow		Move tabs to navigation row;
	- Boolean - BeautyFox.option.hideSettingsInPopUp	Hide the settings button in pop-up windows;
	- Boolean - BeautyFox.fix.fakeTitlebarAccentColor	Accent color in titlebar for Firefox 117+ and Windows 10+;
	- Boolean - BeautyFox.appearance.IE9PreRelease		Use Internet Explorer 9 Pre-Release appearance;
	- Boolean - BeautyFox.appearance.IE10			Use Internet Explorer 10 appearance (disable Internet Explorer 9 Pre-Release appearance first);
	- Boolean - BeautyFox.appearance.IE11			Use Internet Explorer 11 appearance (enable Internet Explorer 10 appearance first);
	- Boolean - BeautyFox.appearance.IE11Win10		Use Internet Explorer 11 appearance from Windows 10+ (enable Internet Explorer 10 and 11 appearance first).


2.1.	Settings
2.1.1.	General > Tabs > Show tab previews in Windows taskbar.



Done!