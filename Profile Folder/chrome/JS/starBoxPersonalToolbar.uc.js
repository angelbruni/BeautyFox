document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        var personalToolbarEmpty = document.getElementById('personal-toolbar-empty');
        var starBtn = document.getElementById('star-button-box');

        personalToolbarEmpty.parentNode.insertBefore(starBtn, personalToolbarEmpty.nextSibling);
    }, 10);
});