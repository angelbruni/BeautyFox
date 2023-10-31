function getAndSetTitleBarHeight() {
    // Load User32.dll library
    const user32 = ctypes.open("user32.dll");

    // Define the GetSystemMetrics function signature
    const GetSystemMetrics = user32.declare("GetSystemMetrics", ctypes.winapi_abi,
        ctypes.int32_t,
        ctypes.int32_t
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
}