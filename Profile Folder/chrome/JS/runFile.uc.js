// Needs ctypes.

function runFile(filePath, commandLineArgs) {
    // Define necessary types
    const HWND = ctypes.voidptr_t;
    const LPCWSTR = ctypes.jschar.ptr;
    const HINSTANCE = ctypes.voidptr_t;
    const UINT = ctypes.uint32_t;
    const SW = {
        SHOWNORMAL: 1
    };

    // Load shell32.dll
    const shell32 = ctypes.open("shell32.dll");

    // Declare ShellExecuteW function
    const ShellExecuteW = shell32.declare(
        "ShellExecuteW",
        ctypes.winapi_abi,
        HINSTANCE,
        HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, UINT
    );

    // Convert the path and arguments to wide strings
    const filePathWide = ctypes.jschar.array()(filePath);
    const commandLineArgsWide = ctypes.jschar.array()(commandLineArgs);

    // Use ShellExecuteW to start msedge.exe
    const hInstance = ShellExecuteW(
        null,
        "open",
        filePathWide,
        commandLineArgsWide,
        null,
        SW.SHOWNORMAL
    );

    // Check if ShellExecuteW was successful
    if (hInstance <= 32) {
        // Handle error (you can add your own error-handling code here)
        // Example: dump("Error starting Edge: " + hInstance.toString() + "\n");
    }

    // Close the shell32.dll library
    shell32.close();
}

function launchNetworkDiagnostics() {
	runFile("msdt.exe", "-skip TRUE -path C:\\Windows\\diagnostics\\system\\networking -ep NetworkDiagnosticsConnectivity")
}

function openWindowsUpdate() {
    runFile("control.exe", "/name Microsoft.WindowsUpdate") 
}