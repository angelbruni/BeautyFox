// ==UserScript==
// @name        BeautyFox - Titlebar
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createFakeTitlebarSpace() {
    if (!navigator.userAgent.includes("Macintosh")) {
        var fakeTitlebarSpace = document.createXULElement("vbox");
        fakeTitlebarSpace.id = "fakeTitlebarSpace";

        var parentElement = document.querySelector("#navigator-toolbox-background");
        parentElement.parentNode.insertBefore(fakeTitlebarSpace, parentElement);

        var titlebarButtonboxContainers = document.querySelectorAll(".titlebar-buttonbox-container");

        titlebarButtonboxContainers.forEach(function(element) { fakeTitlebarSpace.appendChild(element); });
    }
}