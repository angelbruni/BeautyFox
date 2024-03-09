let titlebar = document.getElementById('customTitlebar');

let extendedTitlebarArea = document.getElementById('extendedTitlebarArea');

let firstTitle = document.querySelector('.firstTitle');
let firstPage = document.querySelectorAll('.firstPage');

if (document.querySelector('window').hasAttribute('hassplashscreen') == true) {
    setTimeout(() => {
        extendedTitlebarArea.style.display = 'flex';
        firstTitle.style.display = 'flex';
    }, 4500)
    
    setTimeout(() => {
        titlebar.classList.add('show');
        windowContent.classList.add('show');
    }, 4700);
    
    setTimeout(() => {
        firstPage.forEach(element => {
            element.style.display = 'flex';
        })
    }, 4740)

    let splashLabel = document.getElementById('splashLabel');
    let mapWelcome = [
        'Bienvenidos a BeautyFox',
        'Bem-vindos ao BeautyFox',
        'BeautyFoxへようこそ',
        "BeautyFox'a Hoş Geldiniz"
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    mapWelcome = shuffle(mapWelcome);
    mapWelcome = mapWelcome.slice(0, 3);
    mapWelcome.push('Welcome to BeautyFox');

    mapWelcome.forEach((string, index) => {
        setTimeout(() => {
            if (index === 3) {
                const randomIndex = Math.floor(Math.random() * 4);
                mapWelcome[randomIndex] = 'Welcome to BeautyFox';
            }
            splashLabel.textContent = string;
            console.log(string);
        }, 1000 * index);
    });
} else {
    titlebar.classList.add('show');
    windowContent.classList.add('show');
    extendedTitlebarArea.style.display = 'flex';
    firstTitle.style.display = 'flex';
    firstPage.forEach(element => {
        element.style.display = 'flex';
    })
}

// Tile code
const tiles = document.querySelectorAll('.tileArt');

function removeStylesFromTiles() {
    tiles.forEach(tile => {
        tile.style.transform = null;
        tile.style.transitionTimingFunction = null;
    });
}

document.addEventListener('mouseup', (event) => {
    const isTile = event.target.classList.contains('tileArt');
    if (!isTile) {
        removeStylesFromTiles();
    }
});


const tiltRegionAreaSize = 6;

tiles.forEach(tile => {
    tile.addEventListener('mousedown', (event) => {
        const currentTarget = event.currentTarget;
        const rect = currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;

        const cellWidth = width / tiltRegionAreaSize;
        const cellHeight = height / tiltRegionAreaSize;

        if (x < cellWidth) {
            if (y < cellHeight) {
                // top left
                currentTarget.style.transformOrigin = 'bottom right';
                currentTarget.style.transform = "rotateX(3deg) rotateY(-3deg)"
            } else if (y > (tiltRegionAreaSize - 1) * cellHeight) {
                // bottom left
                currentTarget.style.transformOrigin = 'top right';
                currentTarget.style.transform = "rotateX(-3deg) rotateY(-3deg)"
            } else {
                // left
                currentTarget.style.transformOrigin = 'right center';
                currentTarget.style.transform =" rotateY(-3deg) scaleX(.97)"
            }
        } else if (x > (tiltRegionAreaSize - 1) * cellWidth) {
            if (y < cellHeight) {
                //top right
                currentTarget.style.transformOrigin = 'bottom left';
                currentTarget.style.transform = "rotateX(3deg) rotateY(3deg)"
            } else if (y > (tiltRegionAreaSize - 1) * cellHeight) {
                // bottom right
                currentTarget.style.transformOrigin = 'top left';
                currentTarget.style.transform = "rotateX(-3deg) rotateY(3deg)"
            } else {
                // right
                currentTarget.style.transformOrigin = 'left center';
                currentTarget.style.transform = "rotateY(3deg) scaleX(.97)"
            }
        } else {
            if (y < cellHeight) {
                // top
                currentTarget.style.transformOrigin = 'bottom center';
                currentTarget.style.transform ="rotateX(3deg) scaleY(.97)"
            } else if (y > (tiltRegionAreaSize - 1) * cellHeight) {
                // bottom
                currentTarget.style.transformOrigin = 'top center';
                currentTarget.style.transform ="rotateX(-3deg) scaleY(.97)"
            } else {
                // center
                currentTarget.style.transformOrigin = 'center';
                currentTarget.style.transform ="scale(.95)"
            }
        }

        currentTarget.style.transitionTimingFunction = 'linear';
    }); 

    tile.addEventListener('mouseup', () => {
        removeStylesFromTiles();
    });

    tile.addEventListener('mousemove', (event) => {
        const currentTarget = event.currentTarget;
        const rect = currentTarget.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const glare = currentTarget.firstElementChild;

        glare.style.top = y+'px';
        glare.style.left = x+'px';
    });
});
