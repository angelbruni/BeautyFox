// ==UserScript==
// @name        BeautyFox - Internet options Dialog
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function openInternetOptions() {
    pref("BeautyFox.option.bInetCPL").tryGet.bool() ? runFile("Rundll32.exe", "shell32.dll,Control_RunDLL inetcpl.cpl") : openPreferences();
}