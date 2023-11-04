function openWindowsUpdate() {
    const HWND = ctypes.voidptr_t;
    const HINSTANCE = ctypes.voidptr_t;
    const SW_SHOWNORMAL = 1;

    const shell32 = ctypes.open("shell32.dll");

    const ShellExecuteW = shell32.declare(
        "ShellExecuteW",
        ctypes.winapi_abi,
        HINSTANCE,
        HWND,
        ctypes.jschar.ptr,
        ctypes.jschar.ptr,
        ctypes.jschar.ptr,
        ctypes.jschar.ptr,
        ctypes.int
    );

    const hInstance = ShellExecuteW(
        null,
        "open",
        "control.exe",
        "/name Microsoft.WindowsUpdate",
        null,
        SW_SHOWNORMAL
    );

    if (hInstance.isNull()) {
        console.error("Failed to open Windows Update. Error code: " + ctypes.winLastError);
    }
}