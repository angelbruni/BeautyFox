// ==UserScript==
// @name        BeautyFox - Locale System
// @description Custom locale system until we figure out .properties.
// @author      AngelBruni
// @loadOrder   3
// ==/UserScript==

// FIXME: INTL not working properly or... SWITCH TO .properties AND DITCH THIS WHOLE SYSTEM.
var userLanguageI, userLanguageT;

if (document.getElementById('main-window')) {
    var mainWindow = document.getElementById('main-window');
    userLanguageI = (mainWindow.getAttribute('lang')).split('-');
    userLanguageT = mainWindow.getAttribute('lang');
} else {
    userLanguageI = navigator.language.split('-');
    userLanguageT = navigator.language;
}

var IsIE9PreReleaseAppearance = pref("BeautyFox.appearance.IE9PreRelease").tryGet.bool();
var IsIE10DeveloperPreviewAppearance = pref("BeautyFox.appearance.IE10DeveloperPreview").tryGet.bool();
var IsIE10ConsumerPreviewAppearance = pref("BeautyFox.appearance.IE10ConsumerPreview").tryGet.bool();
var IsIE10ReleasePreviewAppearance = pref("BeautyFox.appearance.IE10ReleasePreview").tryGet.bool();
var IsIE10Appearance = pref("BeautyFox.appearance.IE10").tryGet.bool();
var IsIE11Appearance = pref("BeautyFox.appearance.IE11").tryGet.bool();

var translations = {}; // Object to store translations

// Load translations asynchronously based on user's language
function loadTranslations(lang, region) {
    return fetch(`chrome://userchrome/content/jsonLocale/${lang}/${region}.json`)
        .then(response => response.json())
        .then(data => {
            if (!translations[lang]) { translations[lang] = {}; }
            translations[lang][region] = data;
        })
        .catch(error => { console.error(`Error loading translations for chrome://userscripts/contentonLocale/${lang}/${region}.json:`, error); });
}

// Load translations for user's language and fallback to 'en' for missing keys
async function loadLocale() {
    var userLanguageI;
    /*try { userLanguageI = pref('intl.locale.requested').tryGet.string().split(',')[0].split('-'); }
    catch (e) {
        console.warn('userLanguageI Error: ' + e + '. User probably has only one language in Firefox, checking navigator.language & userLanguage instead.')
        userLanguageI = navigator.language.split('-');
    }*/

    userLanguageI = navigator.language.split('-');

    const lang = userLanguageI[0], region = userLanguageI[1];
    try {
        // Load 'en/fallback.json' for missing keys
        await loadTranslations('en', 'fallback');

        // Load user language with fallback for missing keys
        await loadTranslations(lang, 'fallback');

        // Load translations for user's language and region
        await loadTranslations(lang, region);

        // Call applyTranslations inside the promise to ensure translations are loaded before processing
        applyTranslations();

        setTimeout(() => { applyTranslations(); }, 200);
    } catch (e) { 
        console.error("ERROR: " + lang + " " + region);
        console.error("Error loading translations: " + e); 
    }
}

// Apply translations to the document
function applyTranslations() {
    //var userLanguageT = pref('intl.locale.requested').tryGet.string().split(',')[0];;
    var userLanguageT = navigator.language;
    /*if (!userLanguageT) {
        console.warn('userLanguageT Error: ' + e + '. User probably has only one language in Firefox, checking navigator.language & userLanguage instead.')
        userLanguageT = navigator.language;
    }*/

    const elements = document.querySelectorAll('[locale]');
    elements.forEach(element => {
        const lang = userLanguageT.split('-')[0], region = userLanguageT.split('-')[1];
        const key = element.getAttribute('locale');
        let text = "";
        // Use specific language and region translation if available
        if (translations[lang] &&
            translations[lang][region] &&
            translations[lang][region][key]) {
            text = translations[lang][region][key];
        }
        // Use language fallback if available
        else if (translations[lang] &&
            translations[lang]['fallback'] &&
            translations[lang]['fallback'][key]) {
            text = translations[lang]['fallback'][key];
        }
        // Fallback to English if no translation is found
        else { text = translations['en']['fallback'][key]; }

        // Replace the placeholder with the actual version
        const beautyFoxVersion = '%beautyFoxVersion';
        if (text !== undefined) { text = text.replace(new RegExp(beautyFoxVersion, 'g'), 'Release Candidate 4 - 1.0.2'); }

        const IEVersion = '%IEVersion';
        if (text !== undefined) {
            if (IsIE11Appearance) { text = text.replace(new RegExp(IEVersion, 'g'), '11'); }
            else if (IsIE10Appearance) { text = text.replace(new RegExp(IEVersion, 'g'), '10'); }
            else if (IsIE10ReleasePreviewAppearance) { text = text.replace(new RegExp(IEVersion, 'g'), '10 Release Preview'); }
            else if (IsIE10ConsumerPreviewAppearance) { text = text.replace(new RegExp(IEVersion, 'g'), '10 Consumer Preview'); }
            else if (IsIE10DeveloperPreviewAppearance) { text = text.replace(new RegExp(IEVersion, 'g'), '10 Developer Preview'); }
            else if (IsIE9PreReleaseAppearance) { text = text.replace(new RegExp(IEVersion, 'g'), '9 Pre-Release'); }
            else { text = text.replace(new RegExp(IEVersion, 'g'), '9'); }
        }

        if (element.tagName.toLowerCase() === 'window') {
            // Set localized string to title attribute for these elements
            element.setAttribute('title', text);
        } else if (element.tagName.toLowerCase() === 'checkbox' ||
                   element.tagName.toLowerCase() === 'menuitem' ||
                   element.tagName.toLowerCase() === 'menu') {
            element.setAttribute('label', text);
        } else if (element.tagName.toLowerCase() === 'toolbarbutton') {
            setAttributes(element, {
                'label':        text,
                'tooltiptext':  text
            })
        } else {
            // Set localized string to textContent for other elements
            element.textContent = text;
        }
    });
    console.log('Applying locale for: ' + userLanguageT);
}
loadLocale();

var prefObserver = { observe: function (subject, topic, data) { if (topic == 'nsPref:changed') { loadLocale(); } } };
Services.prefs.addObserver('intl.locale.requested', prefObserver, false)