// ==UserScript==
// @name			Locale System
// @description 	Locale system for Firefox themes dependent on userChrome.js.
// @author			AngelBruni
// ==/UserScript==

var userLanguageI = null;
var userLanguageT = null;

if (document.getElementById('main-window')) {
    var mainWindow = document.getElementById('main-window');
    userLanguageI = (mainWindow.getAttribute('lang')).split('-');
    userLanguageT = mainWindow.getAttribute('lang');
} else {
    userLanguageI = (navigator.language || navigator.userLanguage).split('-');
    userLanguageT = navigator.language || navigator.userLanguage;
}

var IsIE9PreReleaseAppearance = false;
try {
    IsIE9PreReleaseAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE9PreRelease");
} catch (error) {
    console.error("Error retrieving IE9 Pre-Release Appearance preference:", error);
}

var IsIE10DeveloperPreviewAppearance = false;
try {
    IsIE10DeveloperPreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10DeveloperPreview");
} catch (error) {
    console.error("Error retrieving IE10DeveloperPreview Appearance preference:", error);
}

var IsIE10ConsumerPreviewAppearance = false;
try {
    IsIE10ConsumerPreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10ConsumerPreview");
} catch (error) {
    console.error("Error retrieving IE10ConsumerPreview Appearance preference:", error);
}

var IsIE10ReleasePreviewAppearance = false;
try {
    IsIE10ReleasePreviewAppearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10ReleasePreview");
} catch (error) {
    console.error("Error retrieving IE10ReleasePreview Appearance preference:", error);
}

var IsIE10Appearance = false;
try {
    IsIE10Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE10");
} catch (error) {
    console.error("Error retrieving IE10 Appearance preference:", error);
}

var IsIE11Appearance = false;
try {
    IsIE11Appearance = Services.prefs.getBoolPref("BeautyFox.appearance.IE11");
} catch (error) {
    console.error("Error retrieving IE11 Appearance preference:", error);
}

var translations = {}; // Object to store translations

// Load translations asynchronously based on user's language
function loadTranslations(lang, region) {
    return fetch(`chrome://userchrome/content/locales/${lang}/${region}.json`)
        .then(response => response.json())
        .then(data => {
            if (!translations[lang]) {
                translations[lang] = {};
            }
            translations[lang][region] = data;
        })
        .catch(error => {
            console.error(`Error loading translations for chrome://userchrome/content/locales/${lang}/${region}.json:`, error);
        });
}

// Load translations for user's language and fallback to 'en' for missing keys
async function loadLocale() {
    if (mainWindow) {
        userLanguageI = (mainWindow.getAttribute('lang')).split('-');
    } else {
        userLanguageI = (navigator.language || navigator.userLanguage).split('-');
    }

    const lang = userLanguageI[0];
    const region = userLanguageI[1];

    try {
        // Load 'en/fallback.json' for missing keys
        await loadTranslations('en', 'fallback');

        // Load user language with fallback for missing keys
        await loadTranslations(lang, 'fallback');

        // Load translations for user's language and region
        await loadTranslations(lang, region);

        // Call applyTranslations inside the promise to ensure translations are loaded before processing
        applyTranslations();
    } catch (error) {
        console.error("Error loading translations:", error);
    }
}

// Apply translations to the document
function applyTranslations() {
    if (mainWindow) {
        userLanguageT = mainWindow.getAttribute('lang');
    } else {
        userLanguageT = navigator.language || navigator.userLanguage;
    }

    const elements = document.querySelectorAll('[locale]');

    elements.forEach(element => {
        const key = element.getAttribute('locale');
        let text = "";

        const lang = userLanguageT.split('-')[0];
        const region = userLanguageT.split('-')[1];

        // Use specific language and region translation if available
        if (translations[lang] && translations[lang][region] && translations[lang][region][key]) {
            text = translations[lang][region][key];
        }
        // Use language fallback if available
        else if (translations[lang] && translations[lang]['fallback'] && translations[lang]['fallback'][key]) {
            text = translations[lang]['fallback'][key];
        }
        // Fallback to English if no translation is found
        else {
            text = translations['en']['fallback'][key];
        }

        // Replace the placeholder with the actual version
        const beautyFoxVersion = '%beautyFoxVersion';
        if (text !== undefined) {
            text = text.replace(new RegExp(beautyFoxVersion, 'g'), 'Beta 4.5.8');
        }

        const IEVersion = '%IEVersion';
        if (text !== undefined) {
            if (IsIE11Appearance) {
                text = text.replace(new RegExp(IEVersion, 'g'), '11');
            } else if (IsIE10Appearance) {
                text = text.replace(new RegExp(IEVersion, 'g'), '10');
            } else if (IsIE10ReleasePreviewAppearance) {
                text = text.replace(new RegExp(IEVersion, 'g'), '10 Release Preview');
            } else if (IsIE10ConsumerPreviewAppearance) {
                text = text.replace(new RegExp(IEVersion, 'g'), '10 Consumer Preview');
            } else if (IsIE10DeveloperPreviewAppearance) {
                text = text.replace(new RegExp(IEVersion, 'g'), '10 Developer Preview');
            } else if (IsIE9PreReleaseAppearance) {
                text = text.replace(new RegExp(IEVersion, 'g'), '9 Pre-Release');
            } else {
                text = text.replace(new RegExp(IEVersion, 'g'), '9');
            }
        }

        if (element.tagName.toLowerCase() === 'window') {
            // Set localized string to title attribute for these elements
            element.setAttribute('title', text);
        } else if ( element.tagName.toLowerCase() === 'checkbox' ||
                    element.tagName.toLowerCase() === 'menuitem' ||
                    element.tagName.toLowerCase() === 'toolbarbutton' ||
                    element.tagName.toLowerCase() === 'menuitem' ||
                    element.tagName.toLowerCase() === 'menu') {
            // Set localized string to label attribute for these elements
            element.setAttribute('label', text);
        } else {
            // Set localized string to textContent for other elements
            element.textContent = text;
        }
    });
}

loadLocale();

const mainWindowConfig = { attributes: true, attributeFilter: ['lang'] };
const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {  
            loadLocale();
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(mainWindow, mainWindowConfig);