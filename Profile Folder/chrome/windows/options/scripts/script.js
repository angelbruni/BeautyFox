const { ctypes } = Components.utils.import("resource://gre/modules/ctypes.jsm", {});

settingsManager.load();

const bDoNotRunWizardInNextStart = pref(BeautyFoxSettingType.option + 'bDoNotRunWizardInNextStart').tryGet.bool();
if (!bDoNotRunWizardInNextStart) { 
    document.getElementById('bDoNotRunWizardInNextStart').setAttribute('disabled', true); 
    document.getElementById('appearanceSelector').setAttribute('disabled', true); 

	document.querySelectorAll('[is="text-link"], .zuneLink').forEach(element => {
		element.style.display = 'none';
	})
}
function openLink(link) {
    const browserWindow = Services.wm.getMostRecentWindow("navigator:browser");
    if (!browserWindow) { console.error("No 'navigator:browser' window found."); }
    else {
        _ucUtils.loadURI(browserWindow, {
            url: link,
            where: "tab"
        });
    }
}

// #region About browser code
const { AppConstants } = ChromeUtils.importESModule("resource://gre/modules/AppConstants.sys.mjs");
const browserName = AppConstants.MOZ_APP_NAME;
document.querySelector('window').setAttribute('browsername', browserName); 
document.querySelectorAll('.browserName').forEach(element => { element.textContent = browserName; })

const aboutFoxLogo = document.querySelector('#aboutFoxLogo > image');
aboutFoxLogo.setAttribute('src', 'chrome://bfwindows/content/options/resources/'+ browserName +'Logo.svg');

const browserVersion = AppConstants.MOZ_APP_VERSION_DISPLAY;
const browserVersionLabel = document.getElementById('browserVersion');
browserVersionLabel.textContent = browserVersion.replace("esr", "");

const browserVersionBased = Services.appinfo.version;
const browserVersionBasedLabel = document.getElementById('browserVersionBased');
browserVersionBasedLabel.textContent = browserVersionBased;

if (parseInt(browserVersionBased.split('.')[0]) < 115 ||
    parseInt(browserVersionBased.split('.')[0]) > 116) {

    setAttributes(browserVersionBasedLabel.nextElementSibling.firstElementChild, {
        'src':          'chrome://userchrome/content/frameworks/zuneMetro/resources/warning.svg',
        'tooltiptext':  'Unsupported version.'
    })
}

const browserUpdateChannelLabel = document.getElementById('browserUpdateChannel');
browserUpdateChannelLabel.textContent = AppConstants.MOZ_UPDATE_CHANNEL;
if (AppConstants.MOZ_UPDATE_CHANNEL !== 'esr' && browserName !== 'waterfox') {
    setAttributes(browserUpdateChannelLabel.nextElementSibling.firstElementChild, {
        'src':          'chrome://userchrome/content/frameworks/zuneMetro/resources/warning.svg',
        'tooltiptext':  'Non-ESR is unsupported.'
    })
}

const browserArchitecture = document.getElementById('browserArchitecture');
if (!Services.appinfo.is64Bit) {
    browserArchitecture.textContent = '32-bit';
    setAttributes(browserArchitecture.nextElementSibling.firstElementChild.setAttribute, {
        'src':          'chrome://userchrome/content/frameworks/zuneMetro/resources/warning.svg',
        'tooltiptext':  '32-bit is unsupported.'
    })
}
else { browserArchitecture.textContent = '64-bit'; }
// #endregion

// #region About OS code
let OSName;
if (getRegKeyValue('HKLM', 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion', 'ProductName', 'String').includes('Vista')) {
	OSName = 'Windows NT 6.0';
} else {
	OSName = navigator.oscpu.split(';')[0];
}

const aboutOSLogo = document.querySelector('#aboutOSLogo > image');
aboutOSLogo.setAttribute('src', 'chrome://bfwindows/content/options/resources/'+ OSName.replaceAll(" ","") +'Logo.svg');

document.querySelector('tabviewitem.OSName').textContent = OSName.split(' ')[0];
document.querySelector('label.OSName').textContent = OSName;

const OSArchitecture = navigator.oscpu.split(';')[2].replaceAll(" ", "");
const OSArchitectureLabel = document.getElementById('OSArchitecture')
OSArchitectureLabel.textContent = OSArchitecture;
if (OSArchitecture !== 'x64') {
    setAttributes(OSArchitectureLabel.nextElementSibling.firstElementChild.setAttribute, {
        'src':          'chrome://userchrome/content/frameworks/zuneMetro/resources/warning.svg',
        'tooltiptext':  '32-bit is unsupported.'
    })
}
// #endregion

function isUxThemeActive() {
    const user32 = ctypes.open("user32.dll");
    const uxtheme = ctypes.open("uxtheme.dll");

    const IsThemeActive = uxtheme.declare("IsThemeActive", ctypes.winapi_abi, ctypes.bool);
    const isUxThemeActive = IsThemeActive();

    user32.close();
    uxtheme.close();

    return isUxThemeActive;
}

function isCompositorEnabled() {
    const dwmapi = ctypes.open("dwmapi.dll");

    const DwmIsCompositorEnabled = dwmapi.declare("DwmIsCompositionEnabled", ctypes.winapi_abi, ctypes.long, ctypes.bool.ptr);
    const compositorEnabled = new ctypes.bool();
    const hr = DwmIsCompositorEnabled(compositorEnabled.address());

    dwmapi.close();

    if (hr == 0) { return compositorEnabled.value; }
    else {
        console.error("Error:", hr);
        return false;
    }
}

const OSUXThemeStatus = document.getElementById('OSUXTheme');
if (isUxThemeActive() == true) {
    OSUXThemeStatus.setAttribute('locale', 'enabled');
} else {
    OSUXThemeStatus.setAttribute('locale', 'disabled');
}

const OSCompositorStatus = document.getElementById('OSCompositor');
if (isCompositorEnabled() == true) { OSCompositorStatus.setAttribute('locale', 'enabled'); }
else { OSCompositorStatus.setAttribute('locale', 'disabled'); }

// #region fqFLhsreb3to1gkaRUuIubolh2n5fzG7jCpgStZzQ6c code
const Pb56QFszgUxotLq6OHvxjA = document.getElementById('Pb56QFszgUxotLq6OHvxjA');
let Q9mHyNTEXFj2Cy7QHg85IWbpb674d2Q0pp4hUJlWmuQ = 0;
function handlePYlRDBAWtsTWgE7oPAs6AA() {
    Q9mHyNTEXFj2Cy7QHg85IWbpb674d2Q0pp4hUJlWmuQ++;
    if (Q9mHyNTEXFj2Cy7QHg85IWbpb674d2Q0pp4hUJlWmuQ > 5) {
        var randomNumber = Math.floor(Math.random() * 10) + 1; // Generate random number between 1 and 10
        if (randomNumber === 7) {
            setTimeout(() => {
                Pb56QFszgUxotLq6OHvxjA.setAttribute('src', 'chrome://bfwindows/content/options/resources/inori_excited.png')
            }, 120);

            Pb56QFszgUxotLq6OHvxjA.parentElement.style.animation = 'inoriExcited .2s';
            Pb56QFszgUxotLq6OHvxjA.style.pointerEvents = 'none';
            Pb56QFszgUxotLq6OHvxjA.removeEventListener("click", handlePYlRDBAWtsTWgE7oPAs6AA);
        }
    } else if (Q9mHyNTEXFj2Cy7QHg85IWbpb674d2Q0pp4hUJlWmuQ == 1) {
        Pb56QFszgUxotLq6OHvxjA.style.cursor = 'grab';
    }
}
Pb56QFszgUxotLq6OHvxjA.addEventListener("click", handlePYlRDBAWtsTWgE7oPAs6AA);
if (document.querySelector('[src="chrome://userchrome/content/frameworks/zuneMetro/resources/warning.svg"]')) { Pb56QFszgUxotLq6OHvxjA.setAttribute('src', 'chrome://bfwindows/content/options/resources/inori_protection.png') }
if (document.querySelector('[src="chrome://userchrome/content/frameworks/zuneMetro/resources/error.svg"]')) { Pb56QFszgUxotLq6OHvxjA.setAttribute('src', 'chrome://bfwindows/content/options/resources/inori_angry.png') }
// #endregion

loadLocale();

const initialAttributeValues = {};
document.querySelectorAll('[requiresrestart]').forEach(element => {
    setTimeout(() => {
        const attributeName = element.getAttribute('name');
        const attributeValue = element.value;
        const attributeChecked = element.checked;
        
        initialAttributeValues[attributeName] = {
            value: attributeValue,
            checked: attributeChecked,
            animationOrder: 0 // Initialize animation order to 0
        };
    }, 100);
});

function applySettings(closeWindow) {
    settingsManager.apply();

    dispatchEventInAllWindows(settingsChanged, 'navigator:browser');
	dispatchEventInAllWindows(settingsChanged, 'beautyFox:options');

    const changedAttributes = [];
    let animationOrderCounter = 1;
    Object.keys(initialAttributeValues).forEach(attributeName => {
        const currentValue = document.querySelector(`[name="${attributeName}"]`).value;
        const currentChecked = document.querySelector(`[name="${attributeName}"]`).checked;

        const initialValue = initialAttributeValues[attributeName].value;
        const initialChecked = initialAttributeValues[attributeName].checked;

        if (currentValue !== initialValue ||
            currentChecked !== initialChecked) {
            changedAttributes.push({
                name: attributeName,
                animationOrder: animationOrderCounter
            });
            animationOrderCounter++;
        }
    });

    const requiresRestartList = document.getElementById('requiresRestartList');
    requiresRestartList.innerHTML = '';
    if (changedAttributes.length > 0) {
        const ul = document.createElement('ul');
        changedAttributes.forEach(attribute => {
            const li = document.createElement('li');
            li.classList.add('fadeInLeftToRight');
            li.setAttribute('animation-order', attribute.animationOrder);
            li.textContent = attribute.name;
            ul.appendChild(li);
        });
        requiresRestartList.appendChild(ul);
        showRestartModal(); }
    else { if (closeWindow) {  zuneClose(); } }
}

setCustomColourInUI();