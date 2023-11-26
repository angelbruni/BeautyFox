# What is BeautyFox?
BeautyFox is a theme for Firefox 115 ESR that aims to replicate the Internet Explorer 9, 10, and 11 look and feel.

# Notes
* It has been tested on Windows 7, Windows 8.1/10 with the default theme and Aero themes with Glass8 enabled and Windows 11;
* It doesn't work properly with WindowBlinds;
* Make sure that your profile hasn't been modified by other themes, if so, delete the modified files _or_ create a new profile.

# Instructions

1. Copying files

1.1.	**(Optional)** For InPrivate page, copy the contents of the Firefox Folder to where the `firefox.exe` is located;

1.2.	Copy the contents of the Profile Folder to the Root Directory of the profile folder (if you don't know, open firefox and type `about:profiles` in the address bar).

2.	Download and install [Resource Hacker](https://angusj.com/resourcehacker/) (if your OS is NOT Windows Vista/7) - this is to enable glass in navigation pane

2.1.	Run as administrator

2.2.	File > Open > find `firefox.exe` > Manifest > delete/comment these lines:
```xml
<supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
<supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/>
<supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/>
```
2.3.	Restart your computer if aero does not work after these changes.

3. Open Firefox and follow the instructions of the wizard that appears on-screen.

4.	Extensions

4.1	**(Optional)** In `about:config`, set `xpinstall.signatures.required` to `false` and drag and drop `suggestedSites.xpi` in Firefox

4.2	Install [Add to bookmarks bar](https://addons.mozilla.org/en-US/firefox/addon/add-to-favorites-bar/)

4.3	**(Optional)** Install [FeedBro](https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/) for RSS feeds

5. Go to `about:support` and click on "Clear startup cache"

Enjoy!

# Credits / Thanks
* [AngelBruni](https://github.com/angelbruni) - Theme Developer;
* [luisl173](https://github.com/luisl173) - README.md Creator, Spanish translator and testing;
* MaTe - Portuguese (Brazillian) translation and testing;
* nneptuneen - Portuguese (Brazillian) translator and testing;
* Testing Team - For making sure all bugs are squished and improvements are made;
* Microsoft - Internet Explorer and Windows software and assets;
* Mozilla - Firefox software.