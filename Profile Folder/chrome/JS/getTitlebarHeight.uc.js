function getAndSetTitleBarHeight() {
    // Load User32.dll library
    const user32 = ctypes.open("User32.dll");

    // Define the GetSystemMetrics function signature
    const GetSystemMetrics = user32.declare("GetSystemMetrics", ctypes.winapi_abi,
        ctypes.int32_t,  // Return type: int
        ctypes.int32_t   // Parameter type: int
    );

    // Get the height of the system title bar (SM_CYCAPTION)
    const titleBarHeight = GetSystemMetrics(4) - 1;

    // Close the User32.dll library
    user32.close();

    // Set titlebarHeight
    var titlebarHeightStyle = document.createElement('style');
    titlebarHeightStyle.innerHTML = `
        :root {
            --titlebar-height:`+ titleBarHeight +`px;
        }
    `
    document.head.appendChild(titlebarHeightStyle);

    // You can use the titleBarHeight variable in your JavaScript code as needed.
}