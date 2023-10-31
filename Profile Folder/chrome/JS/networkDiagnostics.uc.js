function launchNetworkDiagnostics() {
  // Load shell32.dll library
  const shell32 = ctypes.open("shell32.dll");

  // Define ShellExecuteW function signature
  const ShellExecuteW = shell32.declare(
    "ShellExecuteW",
    ctypes.winapi_abi,
    ctypes.int,
    ctypes.voidptr_t,
    ctypes.jschar.ptr,
    ctypes.jschar.ptr,
    ctypes.jschar.ptr,
    ctypes.jschar.ptr,
    ctypes.int
  );

  // Specify the command to launch Network Diagnostics tool
  const command = "-skip TRUE -path C:\\Windows\\diagnostics\\system\\networking -ep NetworkDiagnosticsConnectivity";

  // Use ShellExecuteW to open Network Diagnostics tool
  const result = ShellExecuteW(
    null,
    "open",
    "msdt.exe",
    command,
    null,
    1 // SW_SHOWNORMAL
  );

  // Check the result
  if (result <= 32) {
    console.error("Failed to launch Network Diagnostics tool");
  } else {
    console.log("Network Diagnostics tool launched successfully");
  }

  // Close the shell32.dll library
  shell32.close();
}