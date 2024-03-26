// ==UserScript==
// @name        BeautyFox - Menu Creator
// @author      AngelBruni
// @loadorder   1
// ==/UserScript==

// ATTENTION: Most of this code is TERRIBLE, no worries, Geckium will bring a better one.

function createMenu(menuData) {
	try {
		var externalBtn = document.createXULElement('toolbarbutton');
		externalBtn.id = menuData.id + 'Button';
		if (!menuData.locale == "") { externalBtn.setAttribute('locale', menuData.locale); }
		externalBtn.style.listStyleImage = menuData.image;
		setAttributes(externalBtn, {
			'label': menuData.name,
			'onclick':'event.preventDefault();event.stopPropagation();',
			'type':'menu',
			'removable':true
		})
		if (menuData.classes) {
			if (Array.isArray(menuData.classes)) { externalBtn.classList.add(...menuData.classes); }
			else { externalBtn.classList.add(menuData.classes); }
		}
		externalBtn.addEventListener('click', (event) => {
			if (event.target === externalBtn) {
				if (event.shiftKey) {
					menuData._externalAppPopup.querySelectorAll('[special="true"]').forEach((item) => {
						item.style.display = 'flex';
					});
				} else {
					menuData._externalAppPopup.querySelectorAll('[special="true"]').forEach((item) => {
						item.style.display = 'none';
					});
				}
			}
		});

		document.getElementById('nav-bar-customization-target').appendChild(externalBtn);

		var externalPopup = document.createXULElement('menupopup');
		setAttributes(externalPopup, {
			'id':       menuData.id + 'PopUp',
			'position': 'bottomright topright'
		})
		externalBtn.appendChild(externalPopup);
		for (var i = 0; i < menuData.items.length; i++) { createMenuItem(externalPopup, menuData.items[i]); }

		menuData._externalAppPopup = externalPopup;
		menuData._isready = false;
		menuData.handleRelativePath = (items) => {
			const { Classes } = Components;
			const { Ci } = Components.interfaces;

			items.forEach((item, i) => {
				if (item.path) {
					item.path = item.path.replace(/\//g, '\\').toLocaleLowerCase();
					const ffdir = Classes['@mozilla.org/file/directory_service;1']
						.getService(Ci.nsIProperties)
						.get('ProfD', Ci.nsIFile).path;
					if (/^(\\)/.test(item.path)) { item.path = ffdir + item.path; }
				}
			})
		};
		menuData.init = function () {
			menuData.handleRelativePath(menuData.getAllApps());
			menuData.onpopupshowing();
		};
		menuData.onpopupshowing = () => {
			if (menuData._isready) return;
			if (menuData._externalAppPopup === null) return;
			// FIXME: Clear existing items before adding them again because this code is being a bitch and adding the entries in the menu twice???
			while (menuData._externalAppPopup.hasChildNodes()) { menuData._externalAppPopup.removeChild(menuData._externalAppPopup.firstChild); }
			menuData.items.forEach((item) => createMenuItem(menuData._externalAppPopup, item));
			menuData._isready = true;
		};
		menuData.getAllApps = function () {
			var apps = [];
			for (var i = 0; i < menuData.items.length; i++) {
				if (menuData.items[i].type === 'app') { apps.push(menuData.items[i]); }
				else if (menuData.items[i].type === 'subdir') { apps = apps.concat(menuData.items[i].items.filter(item => item.type === 'app')); }
			}
			return apps;
		};
		return menuData;
	} catch (e) { console.error(e); }
}

function createMenuItem(parent, item) {
	if (item.type === 'subdir') {
		var subDirItem = parent.appendChild(document.createXULElement('menu'));
		if (!item.locale == "") { subDirItem.setAttribute('locale', item.locale); }
		setAttributes(subDirItem, {
			'class':	'menu-iconic',
			'id':		item.id,
			'label':	item.name,
			'image':	item.image
		})
		if (item.special) { subDirItem.setAttribute('special', item.special); subDirItem.style.display = 'none'; }

		var subDirPopup = document.createXULElement('menupopup');
		for (var j = 0; j < item.items.length; j++) { createMenuItem(subDirPopup, item.items[j]); }
		subDirItem.appendChild(subDirPopup);
	} else if (item.type === 'app') {
		var appsItems = document.createXULElement('menuitem');
		setAttributes(appsItems, {
			'class':		'menuitem-iconic',
			'id':			item.id,
			'label':		item.name,
			'image':		item.image,
			'oncommand':	item.command
		})
		if (item.special) {
			appsItems.setAttribute('special', item.special);
			appsItems.style.display = 'none';
		}
		if (!item.locale == "") { appsItems.setAttribute('locale', item.locale); }
		if (item.accelText) { appsItems.setAttribute('acceltext', item.accelText); }
		parent.appendChild(appsItems);
	} else if (item.type === 'separator') {
		var separator = document.createXULElement('menuseparator');
		parent.appendChild(separator);

		if (item.special) {
			separator.setAttribute('special', item.special);
			separator.style.display = 'none';
		}
	}
}