// ==UserScript==
// @name        BeautyFox - Windows Colorization Colour
// @author      AngelBruni
// @include     main
// @loadorder   3
// ==/UserScript==

function getDWMBGColour() {
    return new Promise((resolve, reject) => {
        fetch('file:///'+ pref('BeautyFox.option.sDWMBlurGlassPath').tryGet.string().replace(/\\/g, "/") + '/data/config.ini')
            .then(response => response.text())
            .then(data => {
                const parsedINI = parseINI(data);
                let color = parsedINI['vruh']['PrimaryColor'];
				
                if (!color)
                    color = parsedINI['config']['activeBlendColor'];

                resolve(color);
            })
            .catch(error => {
                console.error('Error fetching INI file:', error);
                reject(error);
            });
    });
}

var DWMBGColour;
getDWMBGColour()
	.then(colour => {
		console.log("Resolved value:", colour);
		DWMBGColour = colour;
	})
	.catch(error => {
		console.error("Error occurred:", error);
	});


function getCustomColour() {
	let storedCustomColourMethodForUIChoice = pref('BeautyFox.option.storedCustomColourMethodForUIChoice').tryGet.int();

	let desiredColourForUI;

	function getUserAccentColour() {
		var accentColour = getRegKeyValue("HKCU", "SOFTWARE\\Microsoft\\Windows\\DWM", "ColorizationColor", "DWORD");
		const r = (accentColour >> 16) & 0xFF,
			  g = (accentColour >> 8) & 0xFF,
			  b = accentColour & 0xFF;
		return convertRGBtoHEX(r, g, b);
	}

	function getAWMAccentColour() {
		var AWMActiveAccentColourColourR = getRegKeyValue("HKLM", "SOFTWARE\\AWM", "Window_ColorRActive", "DWORD"),
			AWMActiveAccentColourColourG = getRegKeyValue("HKLM", "SOFTWARE\\AWM", "Window_ColorGActive", "DWORD"),
			AWMActiveAccentColourColourB = getRegKeyValue("HKLM", "SOFTWARE\\AWM", "Window_ColorBActive", "DWORD");
		return convertRGBtoHEX(AWMActiveAccentColourColourR, AWMActiveAccentColourColourG, AWMActiveAccentColourColourB);
	}
	
	switch (storedCustomColourMethodForUIChoice) {
		case 1: // Custom Colour
			desiredColourForUI = pref('BeautyFox.option.sDesiredColourForUI').tryGet.string();
			break;
		case 3: // AWM Accent Colour
			desiredColourForUI = getAWMAccentColour();
			break;
		case 4: // DWMBG Accent Colour
			desiredColourForUI = reorderAABBGGRRtoRRGGBB(decimalToHexadecimal(parseInt(DWMBGColour)));
			break;
		default: // User Accent Colour
			desiredColourForUI = getUserAccentColour();
			break;
	}

	return desiredColourForUI;
}

function setCustomColourInUI() {
    document.documentElement.removeAttribute('customcolour');
	
	let storedCustomColourMethodForUIChoice = pref('BeautyFox.option.storedCustomColourMethodForUIChoice').tryGet.int();
	if (storedCustomColourMethodForUIChoice >= 1 && storedCustomColourMethodForUIChoice <= 4)
		document.documentElement.setAttribute('customcolour', true);

	let desiredColourForUIStyle = document.createElement('style');
	desiredColourForUIStyle.id = 'desiredColourForUIStyle';

	let customcolour = getCustomColour();

	if (customcolour !== '#AN0N00' || !customcolour)
		desiredColourForUIStyle.innerHTML = `:root[customcolour] { --desiredColourForUI: `+ customcolour + `; } :root { --desiredColourForUIALWAYS: `+ customcolour +` }`;
	
	document.querySelector('head').appendChild(desiredColourForUIStyle);
}

let timeout;
if (pref('BeautyFox.option.storedCustomColourMethodForUIChoice').tryGet.int() == 4)
	timeout = 1000;
else
	timeout = 0;

setTimeout(() => {
	if (location == 'chrome://browser/content/browser.xhtml' || location == 'chrome://bfwindows/content/options/index.xhtml')
		setCustomColourInUI();
}, timeout);