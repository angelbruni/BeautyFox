!!! BEAUTYFOX (IE9+) THEME FOR FIREFOX 115 ESR ONLY !!!
Tested on: Windows 7, Windows 8.1/10 with the default theme and Aero themes with Glass8 enabled and Windows 11.

!!! IT DOES NOT WORK PROPERLY WITH WINDOWBLINDS !!!

MAKE SURE THAT YOUR PROFILE HAS NOT BEEN MODIFIED BY OTHER THEMES IN THE PAST, AND IF SO, DELETE THE MODIFIED FILES OR CREATE A NEW PROFILE!

Changelog b4.0
- Added a button to open the Favourites sidebar, can be used to replace the "Bookmarks Menu" button;
- Added status bar, addons can be put in it. For convenience, made status bar hide in fullscreen mode;
- Added command bar buttons and menus, need to be manually placed. Command bar also has a setting for icons-only;
- Added alternative app settings menu;
- BeautyFox options wizard added, all settings that I am not considering removing are present there. The wizard automatically adds default about:config preferences making going to about:config not needed for initial setup;
- Removed "move starbox" code, use <a href="https://addons.mozilla.org/en-US/firefox/addon/add-to-favorites-bar/" target="_blank">florin's extension</a> instead;
- Stop and refresh buttons always show up in Internet Explorer 9 appearance now;
- Suggested Sites extension;
- Modified Download dialog to resemble IE7/8 since it's impossible to theme pop-ups to look like IE9-11's pop-ups and it would also be impossible to change the prompt to be a pop-up instead;
- Removed Firefox appMenu styling code since there's a separate settings menu for the BeautyFox theme now;
- Fixed urlbar go button being in the wrong position;
- Fixed URL being cut of before reaching the end of available space and removed the smooth mask;
- Fixed tab closing not cleaning spot if ui.reducedMotion is not 1, no need to enable reduced motion anymore;
- Replaced "Bookmarks" text the menu bar with "Favorites";
- Replaced the fake Version Reporter Applet code with ctypes code for calling real ShellAboutW with Internet Explorer title and iexplore.exe icon (Internet Explorer 11 Windows 10 Appearance only);
- Removed the fake Version Reporter Applet assets;
- Completely rewrote how tabs are moved when BeautyFox.option.tabsOnNavRow is set to true, fixing tabs re-arrangement by dragging not working;
- Removed custom color for navigation buttons code and replaced with a ctypes code to get user accent color for the new bool called BeautyFox.option.userAccentColorNavButtons;
- Removed dummy javascript "loaderTest.uc.js" that I forgot to delete a long time ago;
- Moved unified extensions button to bookmars toolbar with an appearance similar to a folder item but with the iexplore file icon and the label "Get More Add-ons";
- Removed unused experimental pop-up notifications code;
- Changed the way tabs get colored by the container so it looks better and more like real IE tab coloring (still needs to be adapted for IE9PreRelease);
- Changed Internet Explorer 9 tab gradient for all states to resemble the real IE9 tabs more;
- Changed how the border-left in tabs and new tab button is hidden so it doesn't look as obvious when dragging tabs;
- Fixed the search suggestions pane text being cut off with a smooth mask instead of ellipsis;
- Firefox Multi-Containers button in url bar is now hidden;
- Close button in pinned tabs is always hidden;
- User titlebar height value is requested by ctypes code making custom titlebar height variable deprecated;
- uservars.css is deprecated, all the custom variables are now obtainable by ctypes code;
- Implemented a new, separate About Internet Explorer dialog that does not replace the Firefox about dialog;
- Finally fixed "Firefox Suggest" in URL bar suggestions;
- Added RSS Command Bar style to <a href="https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/" target="_blank">FeedBro</a> extension;
- Added feedback smiley button to BeautyFox.appearance.IE11Win10;
- Added locale system for everything but only works with window elements, checkbox elements and elements that sets text with textContent;
- Made en, pt and es localisation for About Internet Explorer dialog and BeautyFox Wizard;
- Removed style code for extensions in navigation bar as there is a statusbar for them now;
- Initial developer tools theming for IE9 and IE10+;
- Changed bookmarks folder icon to get the system icon automatically, no need to replace folder.png anymore, it's gone;
- Removed weird menu bar background and glow on Windows 7;
- Made a temporary "What's New" page (you are reading it now!).



CLEAR STARTUP CACHE


Instructions

1.	Copy/pasting

1.1.	copy the contents of the Firefox Folder to where the firefox.exe is located;

1.2.	copy the contents of the Profile Folder to the Root Directory of the profile folder (about:profiles).



2.	Resource Hacker (if your OS is NOT Windows Vista/7) - Enable glass in navigation pane

2.1.	run as administrator;

2.2.	firefox.exe > Manifest > delete/comment these lines:
	<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
	<supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/>
	<supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/>

2.3.	Restart your computer.



3.	Extensions

3.1	[Optional] In about:config, xpinstall.signatures.required = false and drag and drop suggestedSites.xpi in Firefox;

3.2	Add to bookmarks bar: https://addons.mozilla.org/en-US/firefox/addon/add-to-favorites-bar/

3.3	[Optional] FeedBro for RSS feeds: https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/

Done!