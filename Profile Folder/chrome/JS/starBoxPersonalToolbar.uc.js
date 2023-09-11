function addClonedStarBox() {
    const personalToolbar = document.getElementById('PersonalToolbar');
    const starBtn = document.getElementById('star-button-box');
    
    setTimeout(() => {
        const clonedStarBtn = starBtn.cloneNode(true);
        clonedStarBtn.classList.add("star-button-box_cloned");
        personalToolbar.insertBefore(clonedStarBtn, personalToolbar.firstChild);
        starBtn.remove();
    }, 100);
}