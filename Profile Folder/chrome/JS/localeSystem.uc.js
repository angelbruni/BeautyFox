var translations; // Variable to store translations

// Load translations asynchronously
fetch('chrome://userchrome/content/locale.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        loadLocale();
    })
    .catch(error => {
        console.error('Error loading translations:', error);
    });

// Function to set text based on locale
function loadLocale() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const elements = document.querySelectorAll('[locale]');
    
    elements.forEach(element => {
        const key = element.getAttribute('locale');
        let text = "";

        const lang = userLanguage.split('-')[0];
        const region = userLanguage.split('-')[1];

        if (translations[lang] && translations[lang][region] && translations[lang][region][key]) {
            // Use specific language and region translation if available
            text = translations[lang][region][key];
        } else if (translations[lang] && translations[lang].fallback && translations[lang].fallback[key]) {
            // Use language fallback if available
            text = translations[lang].fallback[key];
        } else {
            // Fallback to English if no translation is found
            text = translations.en.fallback[key];
        }

        // Replace the placeholder with the actual version
        const beautyFoxVersion = '%beautyFoxVersion';
        text = text.replace(new RegExp(beautyFoxVersion, 'g'), 'Beta 4.3');
        
        const IEVersion = '%IEVersion';
        if (IsIE11Appearance) {
            text = text.replace(new RegExp(IEVersion, 'g'), '11');
        }
        else if (IsIE10Appearance) {
            text = text.replace(new RegExp(IEVersion, 'g'), '10');
        }
        else if (IsIE10ReleasePreviewAppearance) {
            text = text.replace(new RegExp(IEVersion, 'g'), '10 Release Preview');
        }
        else if (IsIE10ConsumerPreviewAppearance) {
            text = text.replace(new RegExp(IEVersion, 'g'), '10 Consumer Preview');
        }
        else if (IsIE10DeveloperPreviewAppearance) {
            text = text.replace(new RegExp(IEVersion, 'g'), '10 Developer Preview');
        }
        else if (IsIE9PreReleaseAppearance) {
            text = text.replace(new RegExp(IEVersion, 'g'), '9 Pre-Release');
        }
        else {
            text = text.replace(new RegExp(IEVersion, 'g'), '9');
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

loadLocale();