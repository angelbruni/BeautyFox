// background.js

function updateTabInfo() {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        if (activeTab && activeTab.url) {
            try {
                const parsedUrl = new URL(activeTab.url);
                const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
                const tabTitle = activeTab.title;

                browser.runtime.sendMessage({
                    action: "updateTabInfo",
                    url: baseUrl,
                    title: tabTitle
                });
            } catch (error) {
                console.error("Error processing tab URL:", error);
            }
        } else {
            console.warn("Active tab or URL is undefined.");
        }
    });
}

// Listen for messages from the popup script
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getTabInfo") {
        // Respond with the tab information when requested by the popup
        updateTabInfo();
    }
});
