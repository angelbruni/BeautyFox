function setCustomBackgroundColour() {
    document.documentElement.setAttribute("customcolour", false);
    const previousDesiredColourForUIStyle = document.getElementById("desiredColourForUIStyle");
    if (previousDesiredColourForUIStyle) { previousDesiredColourForUIStyle.remove(); }

	const desiredColourForUIStyle = document.createElement("style");
	desiredColourForUIStyle.id = 'desiredColourForUIStyle';
	desiredColourForUIStyle.innerHTML = `
		:root {
			--desiredColourForUI: `+ getCustomColour() + `;
		}
	`;
	document.head.appendChild(desiredColourForUIStyle);
}

function setColourWithTimeout() {
	let timeout;
	if (pref("BeautyFox.option.storedCustomColourMethodForUIChoice").tryGet.int() == 4) {
		timeout = 300;
	} else {
		timeout = 0;
	}
	setTimeout(() => {
		setCustomColourInUI();
	}, timeout);
}


let storedCustomColourMethodForUIChoice = pref("BeautyFox.option.storedCustomColourMethodForUIChoice").tryGet.int();
	
if (document.documentElement.getAttribute(attr) == "IE10Plus" ||
	document.documentElement.getAttribute(attr) == "IE11") {
	setColourWithTimeout();
} else if (document.documentElement.getAttribute(attr) !== "IE97930" &&
		   storedCustomColourMethodForUIChoice >= 1 &&
		   storedCustomColourMethodForUIChoice <= 4) {
	setColourWithTimeout();
}