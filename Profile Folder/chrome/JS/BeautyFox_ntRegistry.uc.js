// ==UserScript==
// @name        BeautyFox - Registry Reader
// @author      AngelBruni
// @loadorder   1
// ==/UserScript==

const hives = {
	"HKCR": 0x80000000, "HKEY_CLASSES_ROOT": 0x80000000,
	"HKCU": 0x80000001, "HKEY_CURRENT_USER": 0x80000001,
	"HKLM": 0x80000002, "HKEY_LOCAL_MACHINE": 0x80000002,
	"HKU": 0x80000003, "HKEY_USERS": 0x80000003,
	"HKCC": 0x80000005, "HKEY_CURRENT_CONFIG": 0x80000005
};

function getRegKeyValue(hive, subkey, key, expectedType) {
    // Check if the provided hive is valid
    if (!(hive in hives)) {
        console.error("Invalid hive specified.");
        return null;
    }

    const advapi32 = ctypes.open("advapi32.dll");

    const HKEY = ctypes.voidptr_t;
    const DWORD = ctypes.uint32_t;
    //const REG_SZ = 1; // String value type
    //const REG_DWORD = 4; // DWORD (32-bit) value type
    const KEY_READ = 0x20019;
    const LPBYTE = ctypes.voidptr_t;
    const LPDWORD = ctypes.voidptr_t;
    const LPCTSTR = ctypes.jschar.ptr;

    const hKey = ctypes.cast(ctypes.uintptr_t(hives[hive]), HKEY);

    const RegOpenKeyExW = advapi32.declare("RegOpenKeyExW",
        ctypes.winapi_abi,
        ctypes.int,
        HKEY,      
        LPCTSTR,   
        DWORD,     
        DWORD,     
        HKEY.ptr); 

    const RegQueryValueExW = advapi32.declare("RegQueryValueExW",
        ctypes.winapi_abi,
        ctypes.int,
        HKEY,     
        LPCTSTR,  
        LPDWORD,  
        LPDWORD,  
        LPBYTE,   
        LPDWORD); 

    var hKeyResult = HKEY();
    var result = RegOpenKeyExW(hKey, subkey, 0, KEY_READ, hKeyResult.address());

    if (result === 0) {
        var value;
        var size = DWORD();
        size.value = 4096; // Adjust size as needed

        var queryResult = RegQueryValueExW(hKeyResult, key, null, null, null, size.address());

        if (queryResult === 0) {
            if (expectedType === "DWORD") { value = DWORD(); }
            else if (expectedType === "String") { value = ctypes.jschar.array(size.value)(); }
            else {
                console.error("Invalid expected value type specified.");
                return null;
            }

            queryResult = RegQueryValueExW(hKeyResult, key, null, null, value.address(), size.address());
            if (queryResult === 0) {
                if (expectedType === "DWORD") {
                    console.log('Reading key of type '+ expectedType + ': ' + hive + '\\' + subkey + '\\' + key + ' = ' + value.value)
                    return value.value;
                } else if (expectedType === "String") {
                    console.log('Reading key of type '+ expectedType + ': ' + hive + '\\' + subkey + '\\' + key + ' = ' + value.readString())
                    return value.readString();
                }
            } else {
                console.error("Failed to read registry key value. RegQueryValueExW error code: " + queryResult);
            }
        } else {
            console.error("Failed to read registry key value size. RegQueryValueExW error code: " + queryResult);
        }
    } else {
        console.error("Failed to open registry key. RegOpenKeyExW error code: " + result);
    }

    advapi32.close();
    return null;
}

function checkRegKeyExistence(key) {
	const advapi32 = ctypes.open("advapi32.dll");
	
    const RegOpenKeyExW = advapi32.declare(
        "RegOpenKeyExW",
        ctypes.winapi_abi,
        ctypes.int32_t,
        ctypes.uintptr_t,
        ctypes.jschar.ptr,
        ctypes.int32_t,
        ctypes.uint32_t,
        ctypes.uintptr_t.ptr
    );

    const hKey = new ctypes.uintptr_t();
    const result = RegOpenKeyExW(
        0x80000002, // HKEY_LOCAL_MACHINE
        key,
        0,
        0x20019, // KEY_READ | KEY_WOW64_64KEY
        hKey.address()
    );

    if (result == 0) {
        const RegCloseKey = advapi32.declare(
            "RegCloseKey",
            ctypes.winapi_abi,
            ctypes.int32_t,
            ctypes.uintptr_t,
            ctypes.jschar.ptr,
            ctypes.int32_t,
            ctypes.uint32_t,
            ctypes.uintptr_t.ptr
        );

        RegCloseKey(0x80000002, // HKEY_LOCAL_MACHINE
            key,
            0,
            0x20019, // KEY_READ | KEY_WOW64_64KEY
            hKey.address());

        return true;
    }

    return false;
}