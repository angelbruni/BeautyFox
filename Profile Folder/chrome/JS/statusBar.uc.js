var addStatusbar = {
  init: function() {

	if (location != 'chrome://browser/content/browser.xhtml')
      return;
	  
	/* blank tab workaround */
	try {
	  if(gBrowser.selectedBrowser.getAttribute('blank')) gBrowser.selectedBrowser.removeAttribute('blank');
	} catch(e) {}
	
	try {
	  Services.prefs.getDefaultBranch('browser.statusbar.').setBoolPref('enabled',true);
	} catch(e) {}

	var statusbar_label = 'Add-on Bar';

	// toolbar
	try {
	  if(document.getElementById('statusbarContainer') == null) {
		var statusbarContainer = document.createElement('div');
		statusbarContainer.id = 'statusbarContainer';
		document.getElementById('browser').parentNode.appendChild(statusbarContainer);

		var statusbarTextContainer = document.createElement('div');
		statusbarTextContainer.id = 'statusbarTextContainer';
		var statusbarText = document.createElement('p');
		statusbarText.id = 'statusbarText';
		statusbarText.textContent = 'Done';
		statusbarTextContainer.appendChild(statusbarText);
		statusbarContainer.appendChild(statusbarTextContainer);

		var statusbarInternetProtectionModeContainer = document.createElement('div');
		statusbarInternetProtectionModeContainer.id = 'statusbarInternetProtectionModeContainer';
		var statusbarInternetProtectionMode = document.createElement('p');
		statusbarInternetProtectionMode.id = 'statusbarInternetProtectionMode';
		statusbarInternetProtectionMode.textContent = 'Internet | Protected Mode: On';
		statusbarInternetProtectionModeContainer.appendChild(statusbarInternetProtectionMode);
		statusbarContainer.appendChild(statusbarInternetProtectionModeContainer);

		var tb_statusbar = document.createXULElement('toolbar');
		tb_statusbar.setAttribute('id','statusbar');
		tb_statusbar.setAttribute('collapsed', 'false');
		tb_statusbar.setAttribute('toolbarname', statusbar_label);
		tb_statusbar.setAttribute('defaultset','spring,spring'); 
		tb_statusbar.setAttribute('customizable','true');
		tb_statusbar.setAttribute('mode','icons');
		tb_statusbar.setAttribute('iconsize','small');
		tb_statusbar.setAttribute('context','toolbar-context-menu');
		tb_statusbar.setAttribute('lockiconsize','true');
		tb_statusbar.setAttribute('class','toolbar-primary chromeclass-toolbar browser-toolbar customization-target');
		statusbarContainer.appendChild(tb_statusbar);
		

		//var statusbarZoomContainer = document.createElement('div');
		//statusbarZoomContainer.id = 'statusbarZoomContainer';
		//var statusbarZoom = document.createXULElement('toolbarbutton');
		//statusbarZoom.id = 'statusbarZoom';
		//statusbarZoom.textContent = '100%' + zoomLevel;
		//statusbarZoomContainer.appendChild(statusbarZoom);
		//statusbarContainer.appendChild(statusbarZoomContainer);
		//statusbarZoom.addEventListener('click', () => {
		//	FullZoom.enlarge();
		//});

		
		
		CustomizableUI.registerArea('statusbar', {legacy: true});
	  
		CustomizableUI.registerToolbarNode(tb_statusbar);
		
		// 'Ctr + /' on Windows/Linux or 'Cmd + /' on macOS to toggle add-on bar
		var key = document.createXULElement('key');
		key.id = 'key_toggleStatusBar';
		key.setAttribute('key', '/');
		key.setAttribute('modifiers', 'accel');
		key.setAttribute('oncommand',`
			var newStatusBar = document.getElementById('statusbar');
			setToolbarVisibility(newStatusBar, newStatusBar.collapsed);
			Services.prefs.getBranch('browser.statusbar.').setBoolPref('enabled',!newStatusBar.collapsed);
		  `);
		document.getElementById('mainKeyset').appendChild(key);
		
		
		try {
		  setToolbarVisibility(document.getElementById('statusbar'), Services.prefs.getBranch('browser.statusbar.').getBoolPref('enabled'));
		} catch(e) {}
	  
	  }
	} catch(e) {}

  }

}

/* initialization delay workaround */
document.addEventListener('DOMContentLoaded', addStatusbar.init(), false);