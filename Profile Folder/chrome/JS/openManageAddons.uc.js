function openManageAddons() {
    var features = "chrome,dialog,resizable=yes,width=784,height=532,centerscreen";

    window.openDialog('about:addons', '', features); 
}