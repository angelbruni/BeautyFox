// ==UserScript==
// @name        BeautyFox - Tabs Fixer
// @description Fixes tabs in tabsOnNavRow by moving them to a new container.
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createNewAndEndToolbar() {
    var navigatorToolbox = document.getElementById('navigator-toolbox');
    var personalToolbar = document.getElementById('PersonalToolbar');

    var newToolbar = document.createElement('hbox');
    newToolbar.id = 'newToolbar';
    navigatorToolbox.insertBefore(newToolbar, personalToolbar);

    var navBar = document.getElementById('nav-bar');
    newToolbar.appendChild(navBar)

    var endToolbarLabel = 'End Toolbar';
    var endToolbar = document.createXULElement('toolbar');

    setAttributes(endToolbar, {
        'id':           'endToolbar',
        'collapsed':    false,
        'toolbarname':  endToolbarLabel,
        'defaultset':   'spring,spring',
        'customizable': true,
        'mode':         'icons',
        'iconsize':     'small',
        'context':      'toolbar-context-menu',
        'lockiconsize': true,
        'class':        'toolbar-primary chromeclass-toolbar browser-toolbar customization-target'
    })
    newToolbar.appendChild(endToolbar);		
    CustomizableUI.registerArea('endToolbar', {legacy: true});
    CustomizableUI.registerToolbarNode(endToolbar);
}

function fixTabs() {
    var newToolbar = document.getElementById('newToolbar');
    var titlebar = document.getElementById('titlebar');
    var endToolbar = document.getElementById('endToolbar');
    var tabsToolbar = document.getElementById('TabsToolbar');

    if (pref('BeautyFox.option.bTabsOnNavRow').tryGet.bool()) {
        newToolbar.insertBefore(tabsToolbar, endToolbar);
        document.documentElement.setAttribute('tabsOnNavRow', true);
    } else {
        titlebar.appendChild(tabsToolbar);
        document.documentElement.removeAttribute('tabsOnNavRow');
    }

    tabsToolbar.style.height = '0px';
    setTimeout(() => { tabsToolbar.style.height = null; }, 1000);
}