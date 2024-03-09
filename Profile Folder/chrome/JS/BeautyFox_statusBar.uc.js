// ==UserScript==
// @name        BeautyFox - Status Bar
// @description Adds a bunch of elements such as buttons, menus, etc... related to status bar.
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createStatusbar() {
	if (!document.getElementById('statusbarContainer')) {
		var statusbarContainer = document.createElement('div');
		statusbarContainer.id = 'statusbarContainer';
		document.getElementById('browser').parentNode.appendChild(statusbarContainer);

		var statusbarBackground = document.createElement('div');
		statusbarBackground.id = 'statusbarBackground';
		statusbarContainer.appendChild(statusbarBackground);

		var statusBarStatusLabel = document.createElement('p');
		statusBarStatusLabel.id = 'statusBarStatusLabel';

		var statusPanel = document.getElementById('statuspanel');
		const statuspanelLabel = document.getElementById('statuspanel-label');
		const statuspanelLabelConfig = { attributes: true };
		const statuspanelLabelCallback = function (mutationsList, observer) {
			for (const mutation of mutationsList) {
				if (mutation.type === 'attributes') {
					if (!statusPanel.getAttribute('inactive'))
						statusBarStatusLabel.textContent = mutation.target.value;
					else
						statusBarStatusLabel.textContent = '';
				}
			}
		};
		const observer = new MutationObserver(statuspanelLabelCallback);
		observer.observe(statuspanelLabel, statuspanelLabelConfig);
		statusbarContainer.appendChild(statusBarStatusLabel);

		var statusbarInternetProtectionModeContainer = document.createElement('div');
		statusbarInternetProtectionModeContainer.id = 'statusbarInternetProtectionModeContainer';
		var statusbarInternetProtectionMode = document.createElement('p');
		statusbarInternetProtectionMode.id = 'statusbarInternetProtectionMode';

		statusbarInternetProtectionModeContainer.appendChild(statusbarInternetProtectionMode);
		statusbarContainer.appendChild(statusbarInternetProtectionModeContainer);

		var addonsBarLabel = 'Add-on Bar';
		var addonsBar = document.createXULElement('toolbar');
		setAttributes(addonsBar, {
			'id':               'addonsBar',
			'collapsed':        false,
			'toolbarname':      addonsBarLabel,
			'defaultset':		'spring,spring',
			'customizable':     true,
			'mode':             'icons',
			'iconsize':         'small',
			'context':          'toolbar-context-menu',
			'lockiconssize':    true,
			'class':            'toolbar-primary chromeclass-toolbar browser-toolbar customization-target'
		})
		statusbarContainer.appendChild(addonsBar);
		CustomizableUI.registerArea('addonsBar', { legacy: true });
		CustomizableUI.registerToolbarNode(addonsBar);

		var gripper = document.createElement('img');
		setAttributes(gripper, {
			'id':       'gripper',
			'width':    '16',
			'height':   '16',
			'src':		'chrome://userchrome/content/resources/aero.msstyles/Toolbars, Headers & Rebar/Toolbars & Headers/Status/Gripper/BottomRight.ico',
		})
		statusbarContainer.appendChild(gripper);
	}
}

function toggleStatusBar() {
	if (pref('BeautyFox.option.bShowStatusBar').tryGet.bool()) {
		pref('BeautyFox.option.bShowStatusBar').set.bool(false)
		document.getElementById('statusbarContainer').style.display = 'none';
	} else {
		pref('BeautyFox.option.bShowStatusBar').set.bool(true)
		document.getElementById('statusbarContainer').style.display = 'flex';
	}
}

function updateStatusbarAppearance() {
	document.documentElement.toggleAttribute('statusbar', pref('BeautyFox.option.bShowStatusBar').tryGet.bool());

	const statusbarInternetProtectionModeContainer = document.getElementById('statusbarInternetProtectionModeContainer');
	const statusbarInternetProtectionMode = document.getElementById('statusbarInternetProtectionMode');

	switch (pref('BeautyFox.option.storedFakeInternetProtectedLabelChoice').tryGet.int()) {
		case 1:
			statusbarInternetProtectionModeContainer.style.display = 'flex';
			statusbarInternetProtectionMode.setAttribute('locale', 'internetProtected');
			break;
		case 2:
			statusbarInternetProtectionModeContainer.style.display = 'flex';
			statusbarInternetProtectionMode.setAttribute('locale', 'internetProtectedOn');
			break;
		case 3:
			statusbarInternetProtectionModeContainer.style.display = 'flex';
			statusbarInternetProtectionMode.setAttribute('locale', 'internetProtectedOff');
			break;
		default:
			statusbarInternetProtectionModeContainer.style.display = null;
			statusbarInternetProtectionModeContainer.removeAttribute('protectionlabel');
			break;
	}
}