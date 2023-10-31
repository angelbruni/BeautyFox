var addStatusbar = {
  init: function() {
	if (location != 'chrome://browser/content/browser.xhtml')
		return;
	  
	// Blank Tab Workaround
	try {
		if(gBrowser.selectedBrowser.getAttribute('blank')) gBrowser.selectedBrowser.removeAttribute('blank');
	} catch(e) {}

	try {
		if (document.getElementById('statusbarContainer') == null) {
			var statusbarContainer = document.createElement('div');
			statusbarContainer.id = 'statusbarContainer';
			document.getElementById('browser').parentNode.appendChild(statusbarContainer);

			var statusbarBackground = document.createElement('div');
			statusbarBackground.id = 'statusbarBackground';
			statusbarContainer.appendChild(statusbarBackground);

			var statusbarInternetProtectionModeContainer = document.createElement('div');
			statusbarInternetProtectionModeContainer.id = 'statusbarInternetProtectionModeContainer';
			var statusbarInternetProtectionMode = document.createElement('p');
			statusbarInternetProtectionMode.id = 'statusbarInternetProtectionMode';
			statusbarInternetProtectionMode.textContent = 'Internet';
			statusbarInternetProtectionModeContainer.appendChild(statusbarInternetProtectionMode);
			statusbarContainer.appendChild(statusbarInternetProtectionModeContainer);
			
			var addonsBarLabel = 'Add-on Bar';
			var addonsBar = document.createXULElement('toolbar');
			addonsBar.setAttribute('id','addonsBar');
			addonsBar.setAttribute('collapsed', 'false');
			addonsBar.setAttribute('toolbarname', addonsBarLabel);
			addonsBar.setAttribute('defaultset','spring,spring'); 
			addonsBar.setAttribute('customizable','true');
			addonsBar.setAttribute('mode','icons');
			addonsBar.setAttribute('iconsize','small');
			addonsBar.setAttribute('context','toolbar-context-menu');
			addonsBar.setAttribute('lockiconsize','true');
			addonsBar.setAttribute('class','toolbar-primary chromeclass-toolbar browser-toolbar customization-target');
			statusbarContainer.appendChild(addonsBar);		
			CustomizableUI.registerArea('addonsBar', {legacy: true});
			CustomizableUI.registerToolbarNode(addonsBar);

			var gripper = document.createElement('img');
			gripper.id = 'gripper';
			gripper.height = 16;
			gripper.width = 16;
			gripper.src = 'chrome://userchrome/content/images/Status_Gripper_BottomRight.ico';
			statusbarContainer.appendChild(gripper);
		}
	} catch(e) {}
  }
}

/* initialization delay workaround */
document.addEventListener('DOMContentLoaded', addStatusbar.init(), false);