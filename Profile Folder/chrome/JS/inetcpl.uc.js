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
    var shell32 = ctypes.open("shell32.dll");

    // Define the necessary types
    var LPCWSTR = ctypes.jschar.ptr;
    var HINSTANCE = ctypes.voidptr_t;

    // Define the function signature for ShellExecuteW
    var ShellExecuteW = shell32.declare(
        "ShellExecuteW",
        ctypes.winapi_abi,
        HINSTANCE,
        HINSTANCE,
        LPCWSTR,
        LPCWSTR,
        LPCWSTR,
        LPCWSTR,
        ctypes.uint32_t
    );

    // Open Internet Options
    ShellExecuteW(
        null,
        "open",
        "Rundll32.exe",
        "shell32.dll,Control_RunDLL inetcpl.cpl",
        null,
        1
    );

    shell32.close();
}