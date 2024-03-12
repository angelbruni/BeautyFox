function showRestartModal() {
	bDoNotRunWizardInNextStart ? modal("restartModal").show() : zuneClose();
}

if (isWindowsClassicThemeEnabled) {
	document.querySelectorAll(".disableClassicTheme").forEach(function(element) {
		element.setAttribute("disabled", true);
	});
}
if (!isWindowsCompositorEnabled) {
	document.querySelectorAll(".disableBasicTheme").forEach(function(element) {
		element.setAttribute("disabled", true);
	});
}

if (!checkRegKeyExistence("SOFTWARE\\AWM")) 
	document.querySelector("#customColourMethodForUISelector [value='3']").style.display = 'none';

if (OSName == "Windows NT 6.0") 
	document.querySelector("#customColourMethodForUISelector [value='2']").style.display = 'none';

if (OSName !== "Windows NT 10.0") {
	document.querySelector("#iForceAeroSupport").style.display = 'none';
	document.querySelector("#customColourMethodForUISelector [value='3']").style.display = 'none';
	document.querySelector("#customColourMethodForUISelector [value='4']").style.display = 'none';
}

function updateTitlebarAppearance() {
	document.documentElement.removeAttribute("appearance");
	document.documentElement.setAttribute("appearance", parseInt(document.getElementById("appearanceSelector").getAttribute("value")));
}
updateTitlebarAppearance()

function updateCustomColourMethodSection() {
	document.getElementById("customColourMethodSection").setAttribute("method", parseInt(document.getElementById("customColourMethodForUISelector").getAttribute("value")));
}
updateCustomColourMethodSection();