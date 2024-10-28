// ==UserScript==
// @name        Geckium - Toolbarbutton Creator
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

class gkToolbarButtons {
	static create(params) {
		try {
			CustomizableUI.createWidget({
				id: params.id + "-button",
				removable: params.removable,
				label: params.label,
				tooltiptext: params.tooltip,
				overflows: params.overflows,
				defaultArea: params.area,
		
				onCreated: function (toolbarButton) {
					if (!params.delegatesanchor)
						toolbarButton.removeAttribute("delegatesanchor");
		
					if (!params.tooltip)
						toolbarButton.setAttribute("tooltiptext", params.label);
		
					if (params.onclick)
						toolbarButton.setAttribute("onclick", params.onclick);

					if (params.oncommand)
						toolbarButton.setAttribute("oncommand", params.oncommand);
				},
			})
		} catch (e) {
			if (params.id)
				console.error(e, params.id + "-button already exists.")
		};
	}
}

class gkToolbarMenuButtons {
	static create(params) {
		const alreadyExists = document.getElementById(params.id + "-button");
		let toolbarButton;
		if (alreadyExists) {
			console.log(params.id + "-button already exists. Using it.");

			toolbarButton = alreadyExists;
		} else {
			console.log(params.id + "-button does not exist. Creating a new one.");

			gkToolbarButtons.create({
				id: params.id,
				delegatesanchor: params.delegatesanchor,
				label: params.label,
				tooltip: params.tooltip,
				removable: params.removable,
				overflows: params.overflows,
				area: params.area
			});

			toolbarButton = document.getElementById(params.id + "-button");
		}

		toolbarButton.setAttribute("type", "menu");

		const parentID = "menu_" + params.id + "Popup";
		const menuPopUp = document.createXULElement("menupopup");
		gkSetAttributes(menuPopUp, {
			id: parentID,
			position: params.position
		});

		menuPopUp.addEventListener("popupshowing", () => {
			const gkMenuBundle = Services.strings.createBundle("chrome://geckium/locale/properties/menu.properties");
			menuPopUp.querySelectorAll("[data-l10n-id]").forEach(item => {
				if ((item.tagName == "menuitem" && item.getAttribute("type") !== "checkbox") || item.tagName == "menu" || item.classList.contains("menuitemitems")) {
					item.label = gkMenuBundle.GetStringFromName(item.dataset.l10nId);
					item.querySelector(".menu-text").value = gkMenuBundle.GetStringFromName(item.dataset.l10nId);
				}

				if (item.tagName == "menuitem" && item.getAttribute("type") == "checkbox") {
					item.label = gkMenuBundle.GetStringFromName(item.dataset.l10nId);
					item.querySelector(".menu-iconic-text").value = gkMenuBundle.GetStringFromName(item.dataset.l10nId);
					item.querySelector(".menu-iconic-highlightable-text").value = gkMenuBundle.GetStringFromName(item.dataset.l10nId);
				}
				
				if (item.tagName == "button") {
					item.label = gkMenuBundle.GetStringFromName(item.dataset.l10nId);
					item.querySelector(".button-text").value = gkMenuBundle.GetStringFromName(item.dataset.l10nId);
				}
			});
		});

		toolbarButton.appendChild(menuPopUp);

		gkToolbarMenuButtons.createItemsFromObject(parentID, params.object, params.adjustAccelTextWidth);
	}

	static createItem(params) {
		let menuItem;

		switch (params.type) {
			case "menu":
				menuItem = document.createXULElement("menu");
				menuItem.id = params.id + "-menu";
				break;
			case "menuitem":
				if (document.getElementById(params.parentID).tagName == "hbox") {
					menuItem = document.createXULElement("button");
					menuItem.classList.add("menuitem-button");
					menuItem.style.listStyleImage = "none";
				} else {
					menuItem = document.createXULElement("menuitem");
				}

				menuItem.id = "menu_" + params.id;
				break;
			case "menuseparator":
				if (document.getElementById(params.parentID).tagName == "hbox")
					menuItem = document.createXULElement("separator");
				else
					menuItem = document.createXULElement("menuseparator");
				break;
			case "menuitemitems":
				menuItem = document.createXULElement("hbox");
				menuItem.classList.add("menuitemitems");
				menuItem.id = "menu_" + params.id;
				menuItem.style.alignItems = "center";

				const menuItemLabel = document.createXULElement("label");
				menuItemLabel.classList.add("menu-text");
				menuItemLabel.setAttribute("value", params.label);
				menuItem.appendChild(menuItemLabel);

				const menuItemRightItems = document.createXULElement("hbox");
				menuItemRightItems.classList.add("menuitem-right-items", "menu-accel");
				menuItem.appendChild(menuItemRightItems);
				break;
			default:
				console.error("Element of type", params.type, "is not supported.");
				return;
		}

		const parent = document.getElementById(params.parentID);

		if (params.type == "menuitem" || params.type == "menu" || params.type == "menuitemitems") {	
			if (params.checkbox) {
				menuItem.setAttribute("type", "checkbox");
				params.icon = false;
			}

			if (params.icon) {
				switch (params.type) {
					case "menuitem":
						menuItem.classList.add("menuitem-iconic");
						break;
					case "menu":
						menuItem.classList.add("menu-iconic");
						break;
				}
			}

			if (params.label)
				menuItem.setAttribute("label", params.label);

			if (params.l10nid)
				menuItem.setAttribute("data-l10n-id", params.l10nid);

			if (params.accesskey)
				menuItem.setAttribute("accesskey", params.accesskey);

			if (params.type == "menuitem") {
				if (!params.oncommand && !params.click && !params.command)
					menuItem.disabled = true;
			}

			if (params.click)
				menuItem.setAttribute("onclick", params.click);

			if (params.command) {
				if (typeof params.command === "string")
					menuItem.setAttribute("command", params.command);
				else
					menuItem.addEventListener("command", params.command);
			}

			if (params.oncommand) {
				if (typeof params.oncommand === "string")
					menuItem.setAttribute("oncommand", params.oncommand);
				else
					menuItem.addEventListener("oncommand", params.oncommand);
			}

			if (params.key)
				menuItem.setAttribute("key", params.key);
			else if (params.acceltext)
				menuItem.setAttribute("acceltext", params.acceltext);
		}

		if (
			params.type == "menuitem" ||
			params.type == "menu" ||
			params.type == "menuseparator" ||
			params.type == "menuitemitems"
		) {
			if (parent.tagName == "menupopup") {
				parent.appendChild(menuItem);
			} else if (parent.tagName == "menu") {
				if (parent.querySelector("menupopup")) {
					parent.querySelector("menupopup").appendChild(menuItem);
				} else {
					const menuPopUp = document.createXULElement("menupopup");
					parent.appendChild(menuPopUp);
					menuPopUp.appendChild(menuItem);
				}
			} else if (parent.tagName == "hbox") {
				parent.querySelector(".menuitem-right-items").appendChild(menuItem);
			}
		}
	}

	static createItemsFromObject(parentID, object, adjustAccelTextWidth) {
		const parent = document.getElementById(parentID);
		const parentOfParent = parent.parentNode;
	
		function adjustAccelText(adjustAccelTextWidth) {
			if (adjustAccelTextWidth) {
				const menuAccelContainers = parent.querySelectorAll(
					"menuitem[acceltext] > .menu-accel-container"
				);
	
				if (
					!parent.querySelector(
						"menuitem[acceltext] > .menu-accel-container[style*='min-width']"
					)
				) {
					let maxWidth = 0;
					menuAccelContainers.forEach((container) => {
						const width = container.clientWidth;
						maxWidth = Math.max(maxWidth, width);
						container.style.minWidth = `${maxWidth}px`;
						container.style.justifyContent = "end";
					});
				}
			}
		}

		if (object.properties) {
			if (object.properties.onmouseover)
				parentOfParent.setAttribute("onmouseover", object.properties.onmouseover)
			
			if (object.properties.onpopup) {
				if (parent.tagName == "menupopup") {
					parent.addEventListener("popupshowing", adjustAccelText);
					
					gkSetAttributes(parent, {
						onpopupshowing: object.properties.onpopup,
						onpopuphidden: object.properties.onpopup,
					});
				}
			}
		}
	
		for (let key in object) {
			if (key !== "properties") {
				if (
					Object.keys(object[key]).length === 0 &&
					object[key].constructor === Object
				) {
					// If the item is empty, create a menu separator.
					gkToolbarMenuButtons.createItem({
						parentID: parentID,
						type: "menuseparator",
					});
				} else if (object[key].hasOwnProperty("subItems")) {
					// If it has "subItems", it's a submenu.
					gkToolbarMenuButtons.createItem({
						parentID: parentID,
						type: "menu",
						id: object[key].id,
						icon: object[key].icon,
						checkbox: object[key].checkbox,
						onclick: object[key].click,
						command: object[key].command,
						label: object[key].label,
						l10nid: object[key].l10nid,
						accesskey: object[key].accesskey,
						key: object[key].key,
						acceltext: object[key].acceltext	
					});
	
					for (let subItem of object[key].subItems) {
						gkToolbarMenuButtons.createItemsFromObject(
							object[key].id + "-menu",
							subItem,
							adjustAccelTextWidth
						);
					}
				} else if (object[key].hasOwnProperty("items")) {
					// If it has "items", it's a menuitem with buttons.
					gkToolbarMenuButtons.createItem({
						parentID: parentID,
						type: "menuitemitems",
						id: object[key].id,
						icon: object[key].icon,
						checkbox: object[key].checkbox,
						click: object[key].click,
						command: object[key].command,
						label: object[key].label,
						l10nid: object[key].l10nid,
						accesskey: object[key].accesskey,
						key: object[key].key,
						acceltext: object[key].acceltext
					});
					for (let item of object[key].items) {
						gkToolbarMenuButtons.createItemsFromObject(
							"menu_" + object[key].id,
							item,
							false
						);
					}
				} else {
					// Default: create a regular menu item.
					gkToolbarMenuButtons.createItem({
						parentID: parentID,
						type: "menuitem",
						id: object[key].id,
						icon: object[key].icon,
						checkbox: object[key].checkbox,
						click: object[key].click,
						command: object[key].command,
						label: object[key].label,
						l10nid: object[key].l10nid,
						accesskey: object[key].accesskey,
						key: object[key].key,
						acceltext: object[key].acceltext
					});
				}
			}
		}
	}
}

window.addEventListener("load", function () {
	gkToolbarButtons.create({
		id: "bf-close-current-tab",
		label: "Close Current Tab",
		removable: true,
		overflows: false,
		area: CustomizableUI.AREA_TABSTRIP,
		oncommand: "bfTabs.closeCurrent()",
	});
});