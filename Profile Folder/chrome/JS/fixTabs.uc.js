function fixTabs() {
    // Create a new element
    var newToolbar = document.createElement('hbox');
    newToolbar.id = 'newToolbar';

    // Get the #navigator-toolbox element
    var navigatorToolbox = document.getElementById('navigator-toolbox');

    // Get the #PersonalToolbar element
    var personalToolbar = document.getElementById('PersonalToolbar');

    // Insert the new element before the #PersonalToolbar children
    navigatorToolbox.insertBefore(newToolbar, personalToolbar);

    var navBar = document.getElementById('nav-bar');
    newToolbar.appendChild(navBar)

    if (getComputedStyle(document.documentElement).getPropertyValue('--option_tabsOnNavRow') == 1) {
        var tabsToolbar = document.getElementById('TabsToolbar');
        newToolbar.appendChild(tabsToolbar);
    }

    var endToolbarLabel = 'End Toolbar';
    var endToolbar = document.createXULElement('toolbar');
    endToolbar.setAttribute('id','endToolbar');
    endToolbar.setAttribute('collapsed', 'false');
    endToolbar.setAttribute('toolbarname', endToolbarLabel);
    endToolbar.setAttribute('defaultset','spring,spring'); 
    endToolbar.setAttribute('customizable','true');
    endToolbar.setAttribute('mode','icons');
    endToolbar.setAttribute('iconsize','small');
    endToolbar.setAttribute('context','toolbar-context-menu');
    endToolbar.setAttribute('lockiconsize','true');
    endToolbar.setAttribute('class','toolbar-primary chromeclass-toolbar browser-toolbar customization-target');
    newToolbar.appendChild(endToolbar);		
    CustomizableUI.registerArea('endToolbar', {legacy: true});
    CustomizableUI.registerToolbarNode(endToolbar);
}