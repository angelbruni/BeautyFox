// Define your language resources
let translations; // Variable to store translations

// Load translations asynchronously
fetch('chrome://userchrome/content/locale.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        setLocaleText();
    })
    .catch(error => {
        console.error('Error loading translations:', error);
    });

// Function to set text based on locale
function setLocaleText() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
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
            // If element is a window, set localized string to title attribute
            element.setAttribute('title', text);
        } else if (element.tagName.toLowerCase() === 'checkbox'){
            // If element is a checkbox, set localized string to label attribute
            element.setAttribute('label', text);
        }
        else {
            // For other elements, set localized string to textContent
            element.textContent = text;
        }
    });
}

// Call the function to set initial text
setLocaleText();