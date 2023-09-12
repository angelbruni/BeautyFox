function urlbarContainerBackgroundOnMouseAttrs() {
    var refreshBtn = document.getElementById('stop-reload-button');
    refreshBtn.setAttribute('onmouseenter', 'urlbarBackgroundEnter()');
    refreshBtn.setAttribute('onmouseleave', 'urlbarBackgroundLeave()');
}

const urlbarContainer = document.getElementById('urlbar-container');

function urlbarBackgroundEnter() {
    urlbarContainer.classList.add('toolbar-hover-fix');
}

function urlbarBackgroundLeave() {
    urlbarContainer.classList.remove('toolbar-hover-fix');
}