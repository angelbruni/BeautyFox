

var moveStar = {
    init: function() {
        while(true) {
            try {
                setTimeout(() => {
                    var personalToolbarEmpty = document.getElementById('personal-toolbar-empty');
                    var starBtn = document.getElementById('star-button-box');

                    personalToolbarEmpty.parentNode.insertBefore(starBtn, personalToolbarEmpty.nextSibling);
                }, 200);

                break;
            } catch(error) {}
        }
    }
};

document.addEventListener("DOMContentLoaded", moveStar.init(), false);
