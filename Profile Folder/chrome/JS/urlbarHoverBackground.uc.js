function urlbarContainerBackgroundOnMouseAttrs() {
    var stopReloadBtn = document.getElementById('stop-reload-button');
    var urlbarContainer = document.getElementById('urlbar-container');

    stopReloadBtn.addEventListener('mouseenter', function() {
        urlbarContainer.classList.add('toolbar-hover-fix');
    })

    stopReloadBtn.addEventListener('mouseleave', function() {
        urlbarContainer.classList.remove('toolbar-hover-fix');
    })

    urlbarContainer.addEventListener('mouseenter', function() {
        stopReloadBtn.classList.add('toolbar-hover-fix');
    })

    urlbarContainer.addEventListener('mouseleave', function() {
        stopReloadBtn.classList.remove('toolbar-hover-fix');
    })
}