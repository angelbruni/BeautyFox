function openFakeIEAbout() {
    for (let win of Services.wm.getEnumerator("Browser:AboutIE")) {
        // Only open one about window
        if (win.closed) {
            continue;
        }
        win.focus();
        return;
    }

    var features = "chrome,centerscreen,dependent";

    window.openDialog('chrome://userchrome/content/windows/aboutIE/aboutIE.xhtml', '', features); 
}

function callShellAboutWIE() {
    // Path to iexplore.exe
    const szPath = "C:\\Program Files\\Internet Explorer\\iexplore.exe";

    // Define necessary data types
    const HICON = ctypes.uintptr_t;
    const HWND = ctypes.voidptr_t;

    // Load the user32 and shell32 libraries
    const user32 = ctypes.open("user32.dll");
    const shell32 = ctypes.open("shell32.dll");

    // Define necessary functions from user32 and shell32
    const ExtractIcon = shell32.declare("ExtractIconW", ctypes.winapi_abi, HICON, ctypes.voidptr_t, ctypes.char16_t.ptr, ctypes.uint32_t);
    const GetDesktopWindow = user32.declare("GetDesktopWindow", ctypes.winapi_abi, HWND);
    const ShellAboutW = shell32.declare("ShellAboutW", ctypes.winapi_abi, ctypes.voidptr_t, HWND, ctypes.char16_t.ptr, ctypes.char16_t.ptr, HICON);

    // Get the icon from iexplore.exe
    const hIcon = ExtractIcon(null, szPath, 0);
    if (hIcon == 0 || hIcon == ctypes.voidptr_t(0)) {
        // Handle error if ExtractIcon fails
        alert("Failed to extract icon from iexplore.exe");
    } else {
        // Get the handle to the parent window (use desktop window as parent)
        const hwndParent = GetDesktopWindow();

        // Set the title and text for the ShellAboutW dialog box
        const lpszTitle = "Internet Explorer";
        const lpszText = null;
        
        ShellAboutW(hwndParent, lpszTitle, lpszText, hIcon);

        // Destroy the icon handle after using it
        shell32.close();
        user32.close();
    }
}