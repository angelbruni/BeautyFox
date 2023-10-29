function openBeautyFoxWizardWindow() {
    var features = "chrome,centerscreen,resizeable=no,dependent";

    window.openDialog('chrome://userchrome/content/windows/firstStartup/firstStartup.xhtml', "First startup", features); 
}