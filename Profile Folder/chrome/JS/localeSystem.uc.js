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