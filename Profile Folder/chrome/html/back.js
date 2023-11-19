var cbDisabledState = document.getElementById('toggleDisabledState');
var cbCustomColour = document.getElementById('toggleCustomColour');
var rangeCustomColour = document.getElementById('sliderCustomColour');
var backButton = document.getElementById('BackButton');

function resetSettings() {
    cbCustomColour.checked = false;
    cbDisabledState.checked = false;

    rangeCustomColour.value = 0;
    rangeCustomColour.setAttribute('disabled', true);
}

resetSettings();

function toggleCustomColour() {
    if (rangeCustomColour.getAttribute('disabled')) {
        rangeCustomColour.removeAttribute('disabled');

        createCustomColourStyle();

    } else {
        rangeCustomColour.value = 0;
        rangeCustomColour.setAttribute('disabled', true);

        removeCustomColourStyle();
    }
}

function toggleDisabledState() {
    if (!backButton.getAttribute('disabled')) {
        backButton.setAttribute('disabled', true);
    } else {
        backButton.removeAttribute('disabled');
    }
}

var customColourStyle = document.createElement('style');

function createCustomColourStyle() {
    document.head.appendChild(customColourStyle);

    setCustomColour();
}

function setCustomColour() {
    var customColourHue = rangeCustomColour.value;

    customColourStyle.innerHTML = `
        :root {
            --background-1gradient: hsl(`+ customColourHue +`, 59%, 40%);
            --background-2gradient: hsl(`+ customColourHue +`, 98%, 19%);
            --background-3gradient: hsl(`+ customColourHue +`, 69%, 40%);
            --background-4gradient: hsl(`+ customColourHue +`, 57%, 53%);

            --topglow-color: hsl(273, 48%, 72%);
            
            --bottomglow-1gradient: hsl(`+ customColourHue +`, 100%, 74%);
            --bottomglow-2gradient: hsl(`+ customColourHue +`, 95%, 46%);
            --bottomglow-3gradient: hsl(`+ customColourHue +`, 99%, 36%);
        }
    
    `
}

function removeCustomColourStyle() {
    customColourStyle.remove();
}

addEventListener("mousedown", function() {
    setTimeout(() => {
        setCustomColour();
    }, 0);
});

addEventListener("mousemove", function() {
    setCustomColour();
});