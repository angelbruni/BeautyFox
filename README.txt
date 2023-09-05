!!! THE VERY FIRST AND VERY EARLY RELEASE OF THE BEAUTYFOX (IE9+) THEME FOR FIREFOX 115 ESR ONLY !!!
Tested on: Windows 7, Windows 8.1/10 with the default theme and Aero themes with Glass8 enabled and Windows 11.

!!! IT DOES NOT WORK PROPERLY WITH WINDOWBLINDS !!!

MAKE SURE THAT YOUR PROFILE HAS NOT BEEN MODIFIED BY OTHER THEMES IN THE PAST, AND IF SO, DELETE THE MODIFIED FILES OR CREATE A NEW PROFILE!

Changelog b2.2
- Added option to change appearance to Internet Explorer 9 Pre-Release in about:config - BeautyFox.appearance.IE9PreRelease;
- Fixed appearance options typo, REMOVE BeautyFox.apppearance.IE10 if in use and add BeautyFox.appearance.IE10 instead;
- Changed aboutDialog code, REMOVE STARTUP CACHE;
- Changed InPrivate HTML, REPLACE OMNI.JA.



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