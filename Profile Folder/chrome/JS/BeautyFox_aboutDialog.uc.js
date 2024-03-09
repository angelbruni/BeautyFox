// ==UserScript==
// @name        BeautyFox - About Dialog
// @author		AngelBruni
// @loadorder   3
// ==/UserScript==

function callShellAboutWIE() {
    const user32 = ctypes.open("user32.dll"); const shell32 = ctypes.open("shell32.dll");

    const HICON = ctypes.uintptr_t; const HWND = ctypes.voidptr_t;

    const ExtractIcon = shell32.declare("ExtractIconW", ctypes.winapi_abi, HICON, ctypes.voidptr_t, ctypes.char16_t.ptr, ctypes.uint32_t);
    const szPath = "C:\\Program Files\\Internet Explorer\\iexplore.exe";
    const hIcon = ExtractIcon(null, szPath, 0);
    if (hIcon == 0 || hIcon == ctypes.voidptr_t(0)) {
            console.error("Failed to extract icon from iexplore.exe");
    } else {
        const GetDesktopWindow = user32.declare("GetDesktopWindow", ctypes.winapi_abi, HWND);
        const hwndParent = GetDesktopWindow();

        const lpszTitle = "Internet Explorer";
        const lpszText = null;
        
        const ShellAboutW = shell32.declare("ShellAboutW", ctypes.winapi_abi, ctypes.voidptr_t, HWND, ctypes.char16_t.ptr, ctypes.char16_t.ptr, HICON);
        ShellAboutW(hwndParent, lpszTitle, lpszText, hIcon);
    }

    shell32.close(); user32.close();
}

function openAboutIE() {
    if (pref('BeautyFox.appearance.IE11Win10').tryGet.bool()) 
		callShellAboutWIE();
    else 
		openWindow('aboutIE', 'chrome,centerscreen,dependent,modal')
}