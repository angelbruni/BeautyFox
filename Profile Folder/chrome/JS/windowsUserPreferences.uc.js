function getAndSetTitleBarHeight() { 
    if (Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS == "WINNT") {
        // Load User32.dll library
        const user32 = ctypes.open("user32.dll");

        // Define the GetSystemMetrics function signature
        const GetSystemMetrics = user32.declare("GetSystemMetrics", ctypes.winapi_abi,
            ctypes.int32_t,
            ctypes.int32_t
        );

        // Get the height of the system title bar (SM_CYCAPTION)
        var titleBarHeight = GetSystemMetrics(4) - 1;

        // Close the User32.dll library
        user32.close();
    } else {
        var titleBarHeight = 16;
    }

    var titlebarHeightStyle = document.createElement('style');
    document.head.appendChild(titlebarHeightStyle);

    titlebarHeightStyle.innerHTML = `
        :root {
            --titlebar-height:`+ titleBarHeight +`px;
        }
    `
}

function getAndSetUserAccentColor() {
	if (Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS == "WINNT") {
		const advapi32 = ctypes.open("advapi32.dll");

		if (!advapi32) {
			console.error("Failed to load advapi32.dll");
		} else {
			const HKEY = ctypes.voidptr_t;
			const DWORD = ctypes.unsigned_long;
			const KEY_READ = 0x20019;
			const LPBYTE = ctypes.voidptr_t;
			const LPDWORD = ctypes.voidptr_t;
			const LPCTSTR = ctypes.jschar.ptr;

			const HKEY_CURRENT_USER = ctypes.cast(ctypes.uintptr_t(0x80000001), HKEY);
			const HKEY_LOCAL_MACHINE = ctypes.cast(ctypes.uintptr_t(0x80000002), HKEY);

			const RegOpenKeyExW = advapi32.declare("RegOpenKeyExW",
				ctypes.winapi_abi,
				ctypes.int,
				HKEY,      // hKey
				LPCTSTR,   // lpSubKey
				DWORD,     // ulOptions
				DWORD,     // samDesired
				HKEY.ptr); // phkResult

			const RegQueryValueExW = advapi32.declare("RegQueryValueExW",
				ctypes.winapi_abi,
				ctypes.int,
				HKEY,     // hKey
				LPCTSTR,  // lpValueName
				LPDWORD,  // lpReserved
				LPDWORD,  // lpType
				LPBYTE,   // lpData
				LPDWORD); // lpcbData

			var hKey = HKEY();

			var result = RegOpenKeyExW(HKEY_CURRENT_USER, "SOFTWARE\\Microsoft\\Windows\\DWM", 0, KEY_READ, hKey.address());

				if (result === 0) {
					var color = DWORD();
					var size = DWORD();
					size.value = 4; // Size of a DWORD in bytes

					var queryResult = RegQueryValueExW(hKey, "AccentColor", null, null, color.address(), size.address());

					if (queryResult === 0) {
						var red = (color.value & 0xFF);
						var green = ((color.value >> 8) & 0xFF);
						var blue = ((color.value >> 16) & 0xFF);
					} else {
						console.log("Failed to read accent color from registry. RegQueryValueExW error code: " + queryResult);
					}
				} else {
					console.log("Failed to open registry key. RegOpenKeyExW error code: " + result);
				}

			try {
				if (Services.prefs.getBoolPref("BeautyFox.option.AWMAccentColorNavButtons")) {
					var result = RegOpenKeyExW(HKEY_LOCAL_MACHINE, "SOFTWARE\\AWM", 0, KEY_READ, hKey.address());
					if (result === 0) {
						// Read and get HKEY_LOCAL_MACHINE\SOFTWARE\AWM\Window_ColorRActive, HKEY_LOCAL_MACHINE\SOFTWARE\AWM\Window_ColorGActive, HKEY_LOCAL_MACHINE\SOFTWARE\AWM\Window_ColorBActive decimal values
						var rValue = DWORD();
						var gValue = DWORD();
						var bValue = DWORD();

						// Assuming these values are DWORDs, adjust the size accordingly if they have different data types
						var size = DWORD();
						size.value = 4; // Size of a DWORD in bytes

						// Read R, G, B values
						var rQueryResult = RegQueryValueExW(hKey, "Window_ColorRActive", null, null, rValue.address(), size.address());
						var gQueryResult = RegQueryValueExW(hKey, "Window_ColorGActive", null, null, gValue.address(), size.address());
						var bQueryResult = RegQueryValueExW(hKey, "Window_ColorBActive", null, null, bValue.address(), size.address());

						if (rQueryResult === 0 && gQueryResult === 0 && bQueryResult === 0) {
							var red = rValue.value;
							var green = gValue.value;
							var blue = bValue.value;

							console.log("Window_ColorRActive: " + red);
							console.log("Window_ColorGActive: " + green);
							console.log("Window_ColorBActive: " + blue);
						}
					}
				}
			} catch {
				
			}

			advapi32.close();

			// Get and set accentColour
			var accentColorStyle = document.createElement('style');
			var rgb = red+','+green+','+blue;
			accentColorStyle.innerHTML = `
				:root {
					--userAccentColor: rgb(`+rgb+`);
				}
			`
			document.head.appendChild(accentColorStyle);
		}
	}
}