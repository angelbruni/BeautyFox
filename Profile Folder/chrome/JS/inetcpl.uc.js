function openInternetOptions() {
    try {
        if (Services.prefs.getBoolPref("BeautyFox.option.inetcpl")) {
            openinetcpl();
        } else {
            openPreferences();
        }
    } catch {
        openPreferences();
    }   
}

function openinetcpl() {
    runFile("Rundll32.exe", "shell32.dll,Control_RunDLL inetcpl.cpl")
}