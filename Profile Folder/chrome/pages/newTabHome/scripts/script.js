let { NewTabUtils } = ChromeUtils.importESModule("resource://gre/modules/NewTabUtils.sys.mjs");
let topFrecentSites;

function retrieveFrequentSites() {
    const desiredRows = pref('browser.newtabpage.activity-stream.topSitesRows').tryGet.int();
    const numTiles = desiredRows * 5;

    NewTabUtils.activityStreamProvider.getTopFrecentSites({ numItems: numTiles })
    .then(result => {
        // Filter out websites with no icon or no title
        topFrecentSites = result.filter(website => website.favicon && website.title && website.title.trim() !== "");

        // Sort the topFrecentSites array by frecency in descending order
        topFrecentSites.sort((a, b) => b.frecency - a.frecency);

        populateRecentSitesGrid();
    })
    .catch(error => {
        console.error('Error occurred when retrieving the top recent sites:', error);
    });
}
retrieveFrequentSites();

function createTile(website) {
    try {
        // Calculate the highest and lowest frecency values
        let maxFrecency = Math.max(...topFrecentSites.map(website => website.frecency));
        let minFrecency = Math.min(...topFrecentSites.map(website => website.frecency));

        const scaledMaxFrecency = Math.log(maxFrecency - minFrecency + 1);
        const maxLogFrecency = scaledMaxFrecency;

        topFrecentSites.forEach(website => {
            let scaledFrecency = Math.log(website.frecency - minFrecency + 1);
            let normalizedFrecency = (scaledFrecency / maxLogFrecency) * 0.8 + 0.2;
            website.frecencyPercentage = normalizedFrecency * 100;
        });

        const tileContainer = document.createElement('div');
        tileContainer.classList.add('tileContainer');

        const tile = document.createElement('a');
        tile.classList.add('tile');
        tileContainer.appendChild(tile);

        if (website) {
            tile.href = website.url;

            const topHbox = document.createXULElement('hbox');
            tile.appendChild(topHbox);

            const icon = document.createElement('div');
            icon.classList.add('icon');
            icon.style.backgroundImage = 'url(' + website.favicon + ')';
            topHbox.appendChild(icon);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            setAttributes(deleteButton, {
                'onclick': 'NewTabUtils.activityStreamLinks.deleteHistoryEntry("' + website.url + '"); setTimeout(() => { retrieveFrequentSites(); }, 20);',
                'title': 'Remove this page'
            })
            tileContainer.appendChild(deleteButton);

            const title = document.createElement('p');
            title.classList.add('title');
            title.textContent = website.title;
            tile.appendChild(title);

            const activity = document.createElement('div');
            activity.classList.add('activity');
            activity.style.width = website.frecencyPercentage+'%';

            var activityColour;
            if (website.url.includes('google')) {
                activityColour = 'rgb(65,133,243)';
            } else if (website.url.includes('youtube')) {
                activityColour = 'rgb(255,1,1)';
            } else if (website.url.includes('winclassic')) {
                activityColour = 'rgb(3,28,145)';
            } else if (website.url.includes('github')) {
                activityColour = 'rgb(33,39,44)';
            } else if (website.url.includes('instagram')) {
                activityColour = 'rgb(253,20,123)';
            } else if (website.url.includes('deviantart')) {
                activityColour = 'rgb(0,226,153)';
            } else if (website.url.includes('mega')) {
                activityColour = 'rgb(236,13,19)';
            } else if (website.url.includes('deepl')) {
                activityColour = 'rgb(15,42,70)';
            } else if (website.url.includes('gitlab') || website.url.includes('gitgud')) {
                activityColour = 'rgb(225,66,40)';
            } else if (website.url.includes('betawiki')) {
                activityColour = 'rgb(233,55,55)';
            } else if (website.url.includes('archive.org')) {
                activityColour = 'rgb(8,8,8)';
            } else if (website.url.includes('microsoft')) {
                activityColour = 'rgb(0,163,239)';
            } else if (website.url.includes('obsproject')) {
                activityColour = 'rgb(34,32,35)';
            } else if (website.url.includes('last.fm')) {
                activityColour = 'rgb(185,2,2)';
            } else if (website.url.includes('reddit')) {
                activityColour = 'rgb(254,67,0)';
            } else if (website.url.includes('ftp.mozilla')) {
                activityColour = 'rgb(239,4,1)';
            } else if (website.url.includes('steam')) {
                activityColour = 'rgb(7,26,67)';
            } else if (website.url.includes('carl.gg')) {
                activityColour = 'rgb(120,130,63)';
            } else if (website.url.includes('discord')) {
                activityColour = 'rgb(89,103,242)';
            } else if (website.url.includes('sync-tube')) {
                activityColour = 'rgb(208,73,73)';
            } else if (website.url.includes('riotgames')) {
                activityColour = 'rgb(7,7,7)';
            } else if (website.url.includes('win7gadgets')) {
                activityColour = 'rgb(232,134,42)';
            } else if (website.url.includes('twitch')) {
                activityColour = 'rgb(144,69,255)';
            } else if (website.url.includes('proton.me')) {
                activityColour = 'rgb(126,106,248)';
            } else if (website.url.includes('cssgradient')) {
                activityColour = 'rgb(6,52,118)';
            } else if (website.url.includes('gamebanana')) {
                activityColour = 'rgb(248,198,35)';
            } else if (website.url.includes('dropbox')) {
                activityColour = 'rgb(2,97,253)';
            } else if (website.url.includes('css-mask-generator')) {
                activityColour = 'rgb(21,21,21)';
            } else if (website.url.includes('twitter') || website.url.includes('x.com')) {
                activityColour = 'rgb(27,159,241)';
            } else if (website.url.includes('wikipedia')) {
                activityColour = 'rgb(12,12,12)';
            } else if (website.url.includes('windowswallpaper')) {
                activityColour = 'rgb(139,131,48)';
            } else if (website.url.includes('searchfox')) {
                activityColour = 'rgb(226,49,78)';
            } else if (website.url.includes('unitconverters')) {
                activityColour = 'rgb(0,102,51)';
            } else if (website.url.includes('trello')) {
                activityColour = 'rgb(0,132,209)';
            } else if (website.url.includes('curseforge')) {
                activityColour = 'rgb(239,98,52)';
            } else if (website.url.includes('stackoverflow')) {
                activityColour = 'rgb(241,126,32)';
            } else if (website.url.includes('adoptium')) {
                activityColour = 'rgb(217,19,98)';
            } else if (website.url.includes('vencord')) {
                activityColour = 'rgb(239,190,190)';
            } else if (website.url.includes('minecraftforum')) {
                activityColour = 'rgb(107,183,56)';
            } else if (website.url.includes('glovo')) {
                activityColour = 'rgb(252,191,89)';
            } else if (website.url.includes('w3schools')) {
                activityColour = 'rgb(0,152,102)';
            } else if (website.url.includes('soundcloud')) {
                activityColour = 'rgb(255,46,0)';
            } else if (website.url.includes('onedrive')) {
                activityColour = 'rgb(18,137,215)';
            } else if (website.url.includes('jsdelivr')) {
                activityColour = 'rgb(208,73,58)';
            } else if (website.url.includes('realityripple')) {
                activityColour = 'rgb(6,7,7)';
            } else if (website.url.includes('mozilla')) {
                activityColour = 'rgb(1,1,1)';
            } else if (website.url.includes('windhawk')) {
                activityColour = 'rgb(51,51,51)';
            } else if (website.url.includes('tracker.gg')) {
                activityColour = 'rgb(213,61,31)';
            } else if (website.url.includes('modrinth')) {
                activityColour = 'rgb(0,174,91)';
            } else if (website.url.includes('bing')) {
                activityColour = 'rgb(14,108,188)';
            } else if (website.url.includes('duckduckgo')) {
                activityColour = 'rgb(22,90,52)';
            } else if (website.url.includes('searx')) {
                activityColour = 'rgb(11,11,11)';
            } else {
                activityColour = 'rgb(14,108,188)';
            }
            activity.style.setProperty('--websiteColour', activityColour);
            tile.appendChild(activity);

            const activityLabel = document.createElement('p');
            activityLabel.classList.add('activityLabel')
            if (website.frecencyPercentage <= 20) {
                activityLabel.textContent = "Less active";
            } else if (website.frecencyPercentage <= 85) {
                activityLabel.textContent = "Active";
            } else if (website.frecencyPercentage <= 100) {
                activityLabel.textContent = "Very active";
            }
            tile.appendChild(activityLabel);
        }

        return tileContainer;
    } catch (error) {
        console.error(error);
    }
}

function removeSites() {
    document.querySelectorAll('.tileContainer').forEach(element => {
        element.remove();
    })
}

const toggleSitesButton = document.getElementById('toggleSites');
if (!pref('browser.newtabpage.activity-stream.feeds.topsites').tryGet.bool()) {
	toggleSitesButton.setAttribute('locale', 'showSites');
} else {
	toggleSitesButton.setAttribute('locale', 'hideSites')
}

function toggleSites() {
    if (!pref('browser.newtabpage.activity-stream.feeds.topsites').tryGet.bool()) {
        pref('browser.newtabpage.activity-stream.feeds.topsites').set.bool(true)
		toggleSitesButton.setAttribute('locale', 'hideSites')
    } else {
        pref('browser.newtabpage.activity-stream.feeds.topsites').set.bool(false)
		toggleSitesButton.setAttribute('locale', 'showSites');
    }

    retrieveFrequentSites();
	loadLocale();
}

function populateRecentSitesGrid() {
    removeSites();

    const desiredRows = pref('browser.newtabpage.activity-stream.topSitesRows').tryGet.int();

    if (topFrecentSites) {
        const recentSitesContainer = document.querySelector('.recentSitesContainer');
        const numTiles = Math.min(topFrecentSites.length, desiredRows * 5);

        if (pref('browser.newtabpage.activity-stream.feeds.topsites').tryGet.bool()) {
            for (let i = 0; i < numTiles; i++) {
                const tile = createTile(topFrecentSites[i]);
                recentSitesContainer.appendChild(tile);
            }
            const remainingSlots = desiredRows * 5 - numTiles;
            for (let i = 0; i < remainingSlots; i++) {
                const placeholderTile = createTile(null);
                recentSitesContainer.appendChild(placeholderTile);
            }
        } else {
            for (let i = 0; i < desiredRows * 5; i++) {
                const placeholderTile = createTile(null);
                recentSitesContainer.appendChild(placeholderTile);
            }
        }
    }
}

var prefObserver = { observe: function (subject, topic, data) { if (topic == 'nsPref:changed') { retrieveFrequentSites(); } } };
Services.prefs.addObserver('browser.newtabpage.activity-stream.topSitesRows', prefObserver, false)

const { SessionStore } = Components.utils.import("resource:///modules/sessionstore/SessionStore.jsm", {});