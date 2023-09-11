function moveTabs() {
    var refreshBtn = document.getElementById('stop-reload-button');
    var Tabs = document.getElementById('TabsToolbar');
    
    if (getComputedStyle(document.documentElement).getPropertyValue('--option_tabsOnNavRow') == 1) {
        refreshBtn.parentNode.insertBefore(Tabs, refreshBtn.nextSibling);
    }
}
