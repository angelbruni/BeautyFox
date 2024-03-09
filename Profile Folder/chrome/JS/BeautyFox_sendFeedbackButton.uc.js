// ==UserScript==
// @name        BeautyFox - Feedback Button
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createFeedbackButton() {
    try {
        const button_label = "Feedback";

        CustomizableUI.createWidget({
            id: "feedbackButton",
            defaultArea: CustomizableUI.AREA_NAVBAR,
            removable: true,
            label: button_label,
            tooltiptext: button_label,
            onClick: function () { sendFeedbackLink(); },
            onCreated: function (button) { return button; },
        });
    }
    catch (e) { Components.utils.reportError(e); }
}

function sendFeedbackLink() {
    _ucUtils.loadURI(window, {
        url: 'chrome://userchrome/content/temppages/discord-invite.html',
        where: "tab"
    });
}