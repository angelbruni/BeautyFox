# It seems the repository was archived, why?
Some of the BeautyFox visual elements will be reworked soon: Zune Metro will either be reworked or replaced with something else entirely. 
This is to remove contributions from a person that requested to have them removed. 
Don't worry, the actual code rework will still come after Geckium is released.

# What is BeautyFox?
BeautyFox is a theme for Firefox 115 ESR that aims to replicate the Internet Explorer 9, 10, and 11 look and feel.
![image](https://github.com/angelbruni/BeautyFox/assets/48385307/c2ffe8f5-0ef7-4555-abfc-92026c58c9f5)
![firefox_JNygRJcaI9](https://github.com/angelbruni/BeautyFox/assets/48385307/10239166-d63a-4011-af3e-12ead61e373c)

[Discord Server](https://discord.gg/ZDeT6vdqMp)

# Notes
* **It will NOT work on anything other than Windows**.
* **This is not the desired Open Beta release but to prevent people from using an outdated leaked build, I am releasing it**.
* BeautyFox style and script code needs a rework in general (Geckium will help with the script side);
* It has been tested on Windows Vista with Extended Kernel, Windows 7, Windows 8.1 and 10 with the default theme and Aero themes with Glass8, [DWMBlurGlass](https://github.com/Maplespe/DWMBlurGlass), [Aero Window Manager](https://youtu.be/KtMIytUqRac) enabled and in Windows 11;
* It doesn't and will **NEVER** work properly with WindowBlinds;
* Make sure that your profile hasn't been modified by other themes, if so, delete the modified files _or_ create a new profile;

# Instructions

1. Copying files:

	1.1.	Copy the contents of the Firefox Folder to where the `firefox.exe` is located;

	1.2.	Copy the contents of the Profile Folder to the Root Directory of the profile folder (if you don't know, open firefox and type `about:profiles` in the address bar).

2. Enabling glass and native-looking controls:

	**Warning!** Using a modded `XUL.dll` will cause some streaming services (like Netflix) to stop working. Continue at your own risk.

	2.1. Download the modded [XUL.dll](https://github.com/ImSwordQueen/firefox-native-controls/releases) (archived);

	2.2. Find `firefox.exe` directory and replace the existing `XUL.dll` with the modded one.

3. Open Firefox and follow the instructions of the wizard that appears on-screen.

4.	Extensions:

	4.1	**(Optional)** In `about:config`, set `xpinstall.signatures.required` to `false` and drag and drop `suggestedSites.xpi` in Firefox;

	4.2	**(Optional)** Install [FeedBro](https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/) for RSS feeds.

Enjoy!

# Credits / Thanks
* [AngelBruni](https://github.com/angelbruni) - Theme Developer;
* [travis](https://github.com/travy-patty) - Inspration, concept art, branding, changeTitlebarText.uc.js;
* [MrOtherGuy](https://github.com/MrOtherGuy) - fx-autoconfig;
* [Aris-t2](https://github.com/Aris-t2) - favicon_in_urlbar.uc.js;
* SQUEeAK - Trailer;
* [ephemeralViolette](https://github.com/ephemeralViolette) - Firefox Native Controls;
* [luisl173](https://github.com/luisl173) - Testing, Spanish translation;
* [MaTe](https://github.com/MisforMaTe) - Testing, Portuguese (Brazillian) translation;
* [catneptune](https://github.com/catneptune) - Testing, Portuguese (Brazillian) translation;
* [Brawllux](https://github.com/EndlessLuck) - Testing and Turkish translation;
* [Longhorn004](https://github.com/Longhorn004) - Testing and Korean translation;
* [chronail](https://github.com/chronail) - Testing and Indonesian translation;
* [ImSwordQueen](https://github.com/ImSwordQueen) - Testing, ideas;
* slice - Comissioner, testing;
* Testing Team - For making sure all bugs are squished and improvements are made;
* Microsoft - Internet Explorer and Windows software and assets;
* Mozilla - Firefox software.

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
