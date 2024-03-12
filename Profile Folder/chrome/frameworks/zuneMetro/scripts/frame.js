document.documentElement.setAttribute("lang", navigator.language);

function zuneClose() {
    document.getElementById("windowAnimation").classList.add("windowClose");

    setTimeout(() => {
        window.close()
    }, 450);
}