!!! BEAUTYFOX (IE9+) THEME FOR FIREFOX 115 ESR ONLY !!!
Tested on: Windows 7, Windows 8.1/10 with the default theme and Aero themes with Glass8 enabled and Windows 11.

!!! IT DOES NOT WORK PROPERLY WITH WINDOWBLINDS !!!

MAKE SURE THAT YOUR PROFILE HAS NOT BEEN MODIFIED BY OTHER THEMES IN THE PAST, AND IF SO, DELETE THE MODIFIED FILES OR CREATE A NEW PROFILE!

Changelog b2.7.1
- Added option for tinted titlebar on Firefox 117+ and Windows 10+ BeautyFox.fix.fakeTitlebarAccentColor;
- Added a scriptLoader for loading scripts after Firefox has finished loading;
- Changed how the bookmarks button is moved: it's now duplicated in the right place and the original one is removed;
- Added Internet Explorer 10's bookmarks button icon which gets used when BeautyFox.appearance.IE10 is true in about:config;
- Changed lock icon latch to look thicker to be more accurate;
- Changed lock hover and active colour;
- Changed a all necessary scripts to be executed by scriptLoader instead of using setTimeout or any other hacky methods - this fixes the ellipses sometimes not being added to the search placeholder label and improves the code to move tabs to navigation row;
- Changed spacing between search, dropdown, lock and refresh icons to be more accurate;
- Fixed hovering over refresh and stop buttons changing the toolbar field background in the wrong way, causing hovering applying a brighter colour than when just hovering over a toolbar field;
- Fixed tabs not showing the Internet Explorer 9+ favicon if the website has no favicon;
- Fixed new tab button width when BeautyFox.option.tabsOnNavRow is true in about:config in Internet Explorer 9 Pre-Release appearance.

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

1.1.	about:config
1.1.1.	Boolean	- BeautyFox.hide.unifiedExtensions		Hide extensions button;
1.1.2.	Boolean	- BeautyFox.option.tabsOnNavRow;		Move tabs to navigation row;

	!!! FOR THE THEME TO WORK PROPERLY, ONLY ENABLE ONE OF THESE AT A TIME !!!
1.1.3.	Boolean	- BeautyFox.appearance.IE9PreRelease		Use Internet Explorer 9 Pre-Release appearance
1.1.4.	Boolean	- BeautyFox.appearance.IE10.			Use Internet Explorer 10 appearance.


2.1.	Settings
2.1.1.	General > Tabs > Show tab previews in Windows taskbar.



Done!