var refreshBtn = document.getElementById('stop-reload-button');
var Tabs = document.getElementById('TabsToolbar');

var moveTabs = {
    init: function() {
        try {
            if (getComputedStyle(document.documentElement).getPropertyValue('--option_tabsOnNavRow') == 1) {
                setTimeout(() => {
                    refreshBtn.parentNode.insertBefore(Tabs, refreshBtn.nextSibling);
                }, 100);
            }
        } catch(e) {}
    }
};

document.addEventListener("DOMContentLoaded", moveTabs.init(), false);
