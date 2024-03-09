let { NewTabUtils } = ChromeUtils.importESModule("resource://gre/modules/NewTabUtils.sys.mjs");
let topFrecentSites;

const websiteColors = {
	'google': 'rgb(65,133,243)',
	'youtube': 'rgb(255,1,1)',
	'winclassic': 'rgb(3,28,145)',
	'github': 'rgb(33,39,44)',
	'instagram': 'rgb(253,20,123)',
	'deviantart': 'rgb(0,226,153)',
	'mega': 'rgb(236,13,19)',
	'deepl': 'rgb(15,42,70)',
	'gitlab': 'rgb(225,66,40)',
	'gitgud': 'rgb(225,66,40)',
	'betawiki': 'rgb(233,55,55)',
	'archive.org': 'rgb(8,8,8)',
	'microsoft': 'rgb(0,163,239)',
	'obsproject': 'rgb(34,32,35)',
	'last.fm': 'rgb(185,2,2)',
	'reddit': 'rgb(254,67,0)',
	'ftp.mozilla': 'rgb(239,4,1)',
	'steam': 'rgb(7,26,67)',
	'carl.gg': 'rgb(120,130,63)',
	'discord': 'rgb(89,103,242)',
	'sync-tube': 'rgb(208,73,73)',
	'riotgames': 'rgb(7,7,7)',
	'win7gadgets': 'rgb(232,134,42)',
	'twitch': 'rgb(144,69,255)',
	'proton.me': 'rgb(126,106,248)',
	'cssgradient': 'rgb(6,52,118)',
	'gamebanana': 'rgb(248,198,35)',
	'dropbox': 'rgb(2,97,253)',
	'css-mask-generator': 'rgb(21,21,21)',
	'twitter': 'rgb(27,159,241)',
	'x.com': 'rgb(27,159,241)',
	'wikipedia': 'rgb(12,12,12)',
	'windowswallpaper': 'rgb(139,131,48)',
	'searchfox': 'rgb(226,49,78)',
	'unitconverters': 'rgb(0,102,51)',
	'trello': 'rgb(0,132,209)',
	'curseforge': 'rgb(239,98,52)',
	'stackoverflow': 'rgb(241,126,32)',
	'adoptium': 'rgb(217,19,98)',
	'vencord': 'rgb(239,190,190)',
	'minecraftforum': 'rgb(107,183,56)',
	'glovo': 'rgb(252,191,89)',
	'w3schools': 'rgb(0,152,102)',
	'soundcloud': 'rgb(255,46,0)',
	'onedrive': 'rgb(18,137,215)',
	'jsdelivr': 'rgb(208,73,58)',
	'realityripple': 'rgb(6,7,7)',
	'mozilla': 'rgb(1,1,1)',
	'windhawk': 'rgb(51,51,51)',
	'tracker.gg': 'rgb(213,61,31)',
	'modrinth': 'rgb(0,174,91)',
	'bing': 'rgb(14,108,188)',
	'duckduckgo': 'rgb(22,90,52)',
	'searx': 'rgb(11,11,11)'
};

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

            const websiteURL = website.url.toLowerCase();
			const defaultColor = 'rgb(14,108,188)'; // Default color
			let activityColour = defaultColor;

			for (const key in websiteColors) {
				if (websiteURL.includes(key)) {
					activityColour = websiteColors[key];
					break;
				}
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