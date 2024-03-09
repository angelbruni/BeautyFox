// ==UserScript==
// @name        BeautyFox - File Runner
// @author      AngelBruni
// @loadorder   1
// ==/UserScript==

function runFile(filePath, commandLineArgs) {
    const HWND = ctypes.voidptr_t;
    const LPCWSTR = ctypes.jschar.ptr;
    const HINSTANCE = ctypes.voidptr_t;
    const UINT = ctypes.uint32_t;
    const SW = { SHOWNORMAL: 1 };

    const shell32 = ctypes.open("shell32.dll");

    const ShellExecuteW = shell32.declare(
        "ShellExecuteW",
        ctypes.winapi_abi,
        HINSTANCE,
        HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, UINT
    );

    const filePathWide = ctypes.jschar.array()(filePath);
    const commandLineArgsWide = ctypes.jschar.array()(commandLineArgs);

    const hInstance = ShellExecuteW(
        null,
        "open",
        filePathWide,
        commandLineArgsWide,
        null,
        SW.SHOWNORMAL
    );

    if (hInstance <= 32) 
		console.error("Error starting "+ filePath +". "+ hInstance.toString())

    shell32.close();
}