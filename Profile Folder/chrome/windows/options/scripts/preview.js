const windowStyling = document.getElementById("windowStyling");
const appearanceComboboxContainer = document.getElementById("appearanceComboboxContainer");
const previewContainer = document.getElementById("previewContainer");
const accentGradient = document.getElementById("accentGradient");

document.addEventListener("pageChanged", () => {
    var currentMainGroupPage = document.querySelector(".pagesContainer[data-group='main']").getAttribute("data-page");
	var currentAboutPage = document.querySelector(".pagesContainer[data-group='about']").getAttribute("data-page");

    if (currentMainGroupPage == 7 && currentAboutPage == 2 || currentMainGroupPage == 7 && currentAboutPage == 3) {
		previewContainer.style.display = 'none';
		windowStyling.style.minWidth = '800px';
        windowStyling.style.maxWidth = '800px';
    } else if (currentMainGroupPage == 7) {
        previewContainer.style.display = 'none';
        windowStyling.style.minWidth = '945px';
        windowStyling.style.maxWidth = '945px';
	} else {
        previewContainer.style.display = null;
        previewContainer.style.marginRight = null;
        windowStyling.style.minWidth = null;
        windowStyling.style.maxWidth = null;
    }

    accentGradient.style.animation = null;
    setTimeout(() => {
        accentGradient.style.animation = 'slideYAccentGradient 2s cubic-bezier(0.22, 1, 0.36, 1)';
    }, 100);
});