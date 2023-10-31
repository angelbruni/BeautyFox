function createFeedbackButton() {
    try {
        var button_label = "Feedback";
    
        CustomizableUI.createWidget({
            id: "feedbackButton",
            defaultArea: CustomizableUI.AREA_NAVBAR,
            removable: true,
            label: button_label,
            tooltiptext: button_label,
            onClick: function() {
                _ucUtils.loadURI(window,{
                    url: 'chrome://userchrome/content/temppages/discord-invite.html',
                    where: "tab"
                });
            },
            onCreated: function(button) {
                return button;
            },
        });
    }
    catch (e) {
        Components.utils.reportError(e);
    }
}