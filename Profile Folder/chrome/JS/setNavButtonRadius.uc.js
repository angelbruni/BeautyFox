function setnavButtonsRadius() {
    var navButtonsRadiusStyle = document.createElement('style');
    var navButtonsRadius;

    try {
        navButtonsRadius = Services.prefs.getIntPref('BeautyFox.option.navButtonsRadius');

        if (Services.prefs.getIntPref('BeautyFox.option.navButtonsRadius') < 50) {
            var navButtonsTravelBackgroundStyle = document.createElement('style');
            navButtonsTravelBackgroundStyle.innerHTML = `
                #main-window #nav-bar::before {
                    content: unset !important;
                }
            `
            document.head.appendChild(navButtonsTravelBackgroundStyle);
        }
    } catch {
        navButtonsRadius = 50;
    }

    navButtonsRadiusStyle.innerHTML = `
        :root {
            --navButtons-radius: `+ navButtonsRadius +`%;
        }
    `

    document.head.appendChild(navButtonsRadiusStyle);
    
}