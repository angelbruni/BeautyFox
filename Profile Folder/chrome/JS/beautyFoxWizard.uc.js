function openBeautyFoxWizardWindow(verifyFirstRun) {
    if (verifyFirstRun) {
        let isBeautyFoxFirstRunFinished = false;
        try {
            isBeautyFoxFirstRunFinished = Services.prefs.getBoolPref("BeautyFox.parameter.isFirstRunFinished");
        } catch (error) {}
        
        if (!isBeautyFoxFirstRunFinished) {
            Services.prefs.setBoolPref('BeautyFox.parameter.isFirstRunFinished', false)

            launchBeautyFoxWizard();
        }
    } else {
        launchBeautyFoxWizard();
    }
}

function launchBeautyFoxWizard() {
    var features = "chrome,centerscreen,resizeable=no,dependent,modal";
    window.openDialog('chrome://userchrome/content/windows/beautyFoxWizard/beautyFoxWizard.xhtml', "BeautyFox Wizard", features); 
}