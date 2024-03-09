// ==UserScript==
// @name        BeautyFox - Utils
// @author      AngelBruni
// @loadorder   1
// ==/UserScript==

function setAttributes(element, attributes) { for (var key in attributes) { element.setAttribute(key, attributes[key]); } }

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function pref(prefName) {
    return {
        set: {
            bool: function (value) { Services.prefs.setBoolPref(prefName, value); },
            int: function (value) { Services.prefs.setIntPref(prefName, value); },
            string: function (string) { Services.prefs.setStringPref(prefName, string); }
        },
        tryGet: {
            bool: function () { try { return Services.prefs.getBoolPref(prefName); } catch (e) { console.log('Setting not found: '+ e) } },
            int: function () { try { return Services.prefs.getIntPref(prefName); } catch (e) { console.log('Setting not found: '+ e) } },
            string: function () { try { return Services.prefs.getStringPref(prefName); } catch (e) { console.log('Setting not found: '+ e) } }
        }
    }
};

function dispatchEventInAllWindows(customEvent, windowType) {
    let windowMediator = Services.wm;
    let enumerator = windowMediator.getEnumerator(windowType);

    while (enumerator.hasMoreElements()) {
        let win = enumerator.getNext();

        win.document.dispatchEvent(customEvent);
    }
}

function decimalToHexadecimal(decimal) {
    let hex = decimal.toString(16).toUpperCase();
    while (hex.length < 8) {
        hex = '0' + hex;
    }
    return hex;
}

function reorderAABBGGRRtoRRGGBB(hex) {
    hex = hex.substring(6) + hex.substring(4, 6) + hex.substring(2, 4);
    return '#' + hex;
}

function convertRGBtoHEX(red, green, blue) {
    const r = red.toString(16).padStart(2, '0'),
          g = green.toString(16).padStart(2, '0'),
          b = blue.toString(16).padStart(2, '0');
    return '#' + r + g + b;
}

function parseINI(data) {
	const regexSection = /\[(.*?)\]/g;
	const regexKeyValue = /([^=]+)=([^]*)/g;
	let currentSection = null;
	const result = {};

	data.split('\n').forEach(line => {
	let sectionMatch = regexSection.exec(line);
	if (sectionMatch) {
		currentSection = sectionMatch[1];
		result[currentSection] = {};
		return;
	}

	let keyValueMatch = regexKeyValue.exec(line);
	if (keyValueMatch) {
		const key = keyValueMatch[1].trim();
		const value = keyValueMatch[2].trim();
		result[currentSection][key] = value;
	}
	});

	return result;
}

function openWindow(windowName, features) {
	window.openDialog('chrome://bfwindows/content/'+ windowName +'/index.xhtml', '', features);
}