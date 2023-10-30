function openFakeIEAbout() {
    var features = "chrome,centerscreen,dependent";

    window.openDialog('chrome://userchrome/content/windows/aboutIE/aboutIE.xhtml', '', features); 
}