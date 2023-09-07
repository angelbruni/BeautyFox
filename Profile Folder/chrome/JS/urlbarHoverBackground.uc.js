refreshBtn.setAttribute('onmouseenter', 'urlbarBackgroundEnter()');
refreshBtn.setAttribute('onmouseleave', 'urlbarBackgroundLeave()');

const urlbarContainer = document.getElementById('urlbar-container');

function urlbarBackgroundEnter() {
    urlbarContainer.setAttribute('style', '--urlbar-container-height: 24.00px; background-color: rgba(255, 255, 255, 0.8) !important')
}

function urlbarBackgroundLeave() {
    urlbarContainer.setAttribute('style', '--urlbar-container-height: 24.00px;')
}