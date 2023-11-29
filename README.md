[![en](https://img.shields.io/badge/readme-en-red.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.md)
[![pt](https://img.shields.io/badge/leia--me-pt-green.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.pt.md)
[![es](https://img.shields.io/badge/léame-es-yellow.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.es.md)
[![tr](https://img.shields.io/badge/benioku-tr-aqua.svg)](https://github.com/angelbruni/BeautyFox/blob/main/README.tr.md)
# What is BeautyFox?
BeautyFox is a theme for Firefox 115 ESR that aims to replicate the Internet Explorer 9, 10, and 11 look and feel.

# Notes
* It has been tested on Windows 7, Windows 8.1/10 with the default theme and Aero themes with Glass8 enabled and Windows 11;
* It doesn't work properly with WindowBlinds;
* Make sure that your profile hasn't been modified by other themes, if so, delete the modified files _or_ create a new profile.

# Instructions

1. Copying files:

1.1.	Copy the contents of the Firefox Folder to where the `firefox.exe` is located;

1.1.1. **(Optional)** For InPrivate page, also copy the "browser" folder inside the folder previously mentioned.

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

4.	Extensions:

4.1	**(Optional)** In `about:config`, set `xpinstall.signatures.required` to `false` and drag and drop `suggestedSites.xpi` in Firefox

4.2	**(Optional)** Install [FeedBro](https://addons.mozilla.org/en-US/firefox/addon/feedbroreader/) for RSS feeds

5. Customise your layout to resemble [this](https://www.techrepublic.com/wp-content/uploads/2011/03/6202428.png)

5.1 Right click an empty space of the tabs bar and click on "Customise Toolbar..."

6. **(Optional)** - Enabling native controls (scrollbars, checkboxes):

6.1. Go to the [Firefox native controls repo](https://github.com/ephemeralViolette/firefox-native-controls)

6.2. Go to releases and download the `xul.dll` file corresponding to your Firefox version.

6.3. Close Firefox completely then replace the `xul.dll` file where Firefox is installed with the downloaded `xul.dll` file.

6.4. Open Firefox again and now you have native controls! (Note that this will apply to ***everything*** Firefox loads, including websites, so sites like Discord Web will look weird with the native scrollbars).

Enjoy!

# Credits / Thanks
* [AngelBruni](https://github.com/angelbruni) - Theme Developer, README.pt.md Creator;
* SQUEeAK - Trailer;
* [luisl173](https://github.com/luisl173) - README.md and README.es.md Creator, Spanish translator and testing;
* [ephemeralViolette](https://github.com/ephemeralViolette) - Firefox Native Controls;
* [MaTe](https://github.com/MisforMaTe) - Portuguese (Brazillian) translation and testing;
* [catneptune](https://github.com/catneptune) - Portuguese (Brazillian) translator and testing;
* [Brawllux](https://github.com/EndlessLuck) - Turkish translator and testing;
* Testing Team - For making sure all bugs are squished and improvements are made;
* Microsoft - Internet Explorer and Windows software and assets;
* Mozilla - Firefox software.