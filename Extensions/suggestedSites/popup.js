// popup.js

document.addEventListener('contextmenu', event => event.preventDefault());

const suggestionsList = document.getElementById("suggestions");
const body = document.body;

document.addEventListener("DOMContentLoaded", function () {
	// Send a message to the background script requesting tab information
	browser.runtime.sendMessage({ action: "getTabInfo" });
});

// Listen for messages from the background script
browser.runtime.onMessage.addListener(function (message) {
	// Get the localized title
    const localizedTitle = browser.i18n.getMessage("extensionName");

    // Send a message to the background script requesting tab information
    browser.runtime.sendMessage({ action: "getTabInfo" });

    // Set the localized title as the default_title
    browser.browserAction.setTitle({ title: localizedTitle });
	
	if (message.action === "updateTabInfo") {
		const url = message.url;
		const title = message.title;

		// Use the URL and title as needed
		console.log("URL:", url);
		console.log("Title:", title);

		// Update your popup.html with the received data
		document.getElementById("pageTitle").textContent = title;

		// Use the received URL to get suggestions from your JSON object
		const suggestions = getSuggestionsForUrl(url);

		// Update your popup.html with the suggestions
		updateSuggestions(suggestions);
	}
});

function getSuggestionsForUrl(url) {
	// Replace this object with your actual JSON data
	const suggestionsData = {

		//#region JSONData

		//Search Engines
		"https://www.google.com": [
			{
				url: "https://www.bing.com",
				title: "Bing",
				favicon: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg-png.png"
			},
			{
				url: "https://www.ecosia.org",
				title: "Ecosia",
				favicon: "https://cdn-static.ecosia.org/static/icons/favicon.ico"
			},
			{
				url: "https://search.brave.com",
				title: "Brave Search",
				favicon: "https://cdn.search.brave.com/serp/v2/_app/immutable/assets/favicon-16x16.341beadf.png"
			},
			{
				url: "https://www.startpage.com",
				title: "Startpage",
				favicon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
			}
		],

		"https://www.bing.com": [
			{
				url: "https://www.google.com",
				title: "Google",
				favicon: "https://www.google.com/favicon.ico"
			},
			{
				url: "https://www.ecosia.org",
				title: "Ecosia",
				favicon: "https://cdn-static.ecosia.org/static/icons/favicon.ico"
			},
			{
				url: "https://search.brave.com",
				title: "Brave Search",
				favicon: "https://cdn.search.brave.com/serp/v2/_app/immutable/assets/favicon-16x16.341beadf.png"
			},
			{
				url: "https://www.startpage.com",
				title: "Startpage",
				favicon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
			}
		],
		"https://www.ecosia.org": [
			{
				url: "https://www.google.com",
				title: "Google",
				favicon: "https://www.google.com/favicon.ico"
			},
			{
				url: "https://www.bing.com",
				title: "Bing",
				favicon: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg-png.png"
			},
			{
				url: "https://search.brave.com",
				title: "Brave Search",
				favicon: "https://cdn.search.brave.com/serp/v2/_app/immutable/assets/favicon-16x16.341beadf.png"
			},
			{
				url: "https://www.startpage.com",
				title: "Startpage",
				favicon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
			}
		],
		"https://search.brave.com": [
			{
				url: "https://www.google.com",
				title: "Google",
				favicon: "https://www.google.com/favicon.ico"
			},
			{
				url: "https://www.bing.com",
				title: "Bing",
				favicon: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg-png.png"
			},
			{
				url: "https://www.ecosia.org",
				title: "Ecosia",
				favicon: "https://cdn-static.ecosia.org/static/icons/favicon.ico"
			},
			{
				url: "https://www.startpage.com",
				title: "Startpage",
				favicon: "https://www.startpage.com/sp/cdn/favicons/favicon-16x16--default.png"
			}
		],
		"https://www.startpage.com": [
			{
				url: "https://www.google.com",
				title: "Google",
				favicon: "https://www.google.com/favicon.ico"
			},
			{
				url: "https://www.bing.com",
				title: "Bing",
				favicon: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg-png.png"
			},
			{
				url: "https://www.ecosia.org",
				title: "Ecosia",
				favicon: "https://cdn-static.ecosia.org/static/icons/favicon.ico"
			},
			{
				url: "https://search.brave.com",
				title: "Brave Search",
				favicon: "https://cdn.search.brave.com/serp/v2/_app/immutable/assets/favicon-16x16.341beadf.png"
			}
		],

		//Video Platorms
		"https://www.youtube.com": [
			{
				url: "https://www.imdb.com",
				title: "IMDB",
				favicon: "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png"
			},
			{
				url: "https://www.netflix.com",
				title: "Netflix",
				favicon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico"
			},
			{
				url: "https://www.hulu.com",
				title: "Hulu",
				favicon: "https://assetshuluimcom-a.akamaihd.net/h3o/icons/favicon.ico.png"
			},
			{
				url: "https://www.twitch.tv",
				title: "Twitch",
				favicon: "https://static.twitchcdn.net/assets/favicon-16-52e571ffea063af7a7f4.png"
			}
		],
		"https://www.imdb.com": [
			{
				url: "https://www.youtube.com",
				title: "YouTube",
				favicon: "https://www.youtube.com/favicon.ico"
			},
			{
				url: "https://www.netflix.com",
				title: "Netflix",
				favicon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico"
			},
			{
				url: "https://www.hulu.com",
				title: "Hulu",
				favicon: "https://assetshuluimcom-a.akamaihd.net/h3o/icons/favicon.ico.png"
			},
			{
				url: "https://www.twitch.tv",
				title: "Twitch",
				favicon: "https://static.twitchcdn.net/assets/favicon-16-52e571ffea063af7a7f4.png"
			}
		],
		"https://www.netflix.com": [
			{
				url: "https://www.youtube.com",
				title: "YouTube",
				favicon: "https://www.youtube.com/favicon.ico"
			},
			{
				url: "https://www.imdb.com",
				title: "IMDB",
				favicon: "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png"
			},
			{
				url: "https://www.hulu.com",
				title: "Hulu",
				favicon: "https://assetshuluimcom-a.akamaihd.net/h3o/icons/favicon.ico.png"
			},
			{
				url: "https://www.twitch.tv",
				title: "Twitch",
				favicon: "https://static.twitchcdn.net/assets/favicon-16-52e571ffea063af7a7f4.png"
			}
		],
		"https://www.hulu.com": [
			{
				url: "https://www.youtube.com",
				title: "YouTube",
				favicon: "https://www.youtube.com/favicon.ico"
			},
			{
				url: "https://www.imdb.com",
				title: "IMDB",
				favicon: "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png"
			},
			{
				url: "https://www.netflix.com",
				title: "Netflix",
				favicon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico"
			},
			{
				url: "https://www.twitch.tv",
				title: "Twitch",
				favicon: "https://static.twitchcdn.net/assets/favicon-16-52e571ffea063af7a7f4.png"
			}
		],
		"https://www.twitch.tv": [
			{
				url: "https://www.youtube.com",
				title: "YouTube",
				favicon: "https://www.youtube.com/favicon.ico"
			},
			{
				url: "https://www.imdb.com",
				title: "IMDB",
				favicon: "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png"
			},
			{
				url: "https://www.netflix.com",
				title: "Netflix",
				favicon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico"
			},
			{
				url: "https://www.hulu.com",
				title: "Hulu",
				favicon: "https://assetshuluimcom-a.akamaihd.net/h3o/icons/favicon.ico.png"
			}
		],
		"https://www.disneyplus.com": [
			{
				url: "https://www.youtube.com",
				title: "YouTube",
				favicon: "https://www.youtube.com/favicon.ico"
			},
			{
				url: "https://www.netflix.com",
				title: "Netflix",
				favicon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico"
			},
			{
				url: "https://www.hulu.com",
				title: "Hulu",
				favicon: "https://assetshuluimcom-a.akamaihd.net/h3o/icons/favicon.ico.png"
			},
			{
				url: "https://www.twitch.tv",
				title: "Twitch",
				favicon: "https://static.twitchcdn.net/assets/favicon-16-52e571ffea063af7a7f4.png"
			}
		],

		//Social Media
		"https://twitter.com": [
			{
				url: "https://www.instagram.com",
				title: "Instagram",
				favicon: "https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico"
			},
			{
				url: "https://www.facebook.com",
				title: "Facebook",
				favicon: "https://static.xx.fbcdn.net/rsrc.php/yb/r/hLRJ1GG_y0J.ico"
			},
			{
				url: "https://www.reddit.com",
				title: "Reddit",
				favicon: "https://www.redditstatic.com/shreddit/assets/favicon/64x64.png"
			},
			{
				url: "https://www.tiktok.com",
				title: "TikTok",
				favicon: "https://www.tiktok.com/favicon.ico"
			}
		],
		"https://www.instagram.com": [
			{
				url: "https://twitter.com",
				title: "Twitter",
				favicon: "https://abs.twimg.com/favicons/twitter.ico"
			},
			{
				url: "https://www.facebook.com",
				title: "Facebook",
				favicon: "https://static.xx.fbcdn.net/rsrc.php/yb/r/hLRJ1GG_y0J.ico"
			},
			{
				url: "https://www.reddit.com",
				title: "Reddit",
				favicon: "https://www.redditstatic.com/shreddit/assets/favicon/64x64.png"
			},
			{
				url: "https://www.tiktok.com",
				title: "TikTok",
				favicon: "https://www.tiktok.com/favicon.ico"
			}
		],
		"https://www.facebook.com": [
			{
				url: "https://twitter.com",
				title: "Twitter",
				favicon: "https://abs.twimg.com/favicons/twitter.ico"
			},
			{
				url: "https://www.instagram.com",
				title: "Instagram",
				favicon: "https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico"
			},
			{
				url: "https://www.reddit.com",
				title: "Reddit",
				favicon: "https://www.redditstatic.com/shreddit/assets/favicon/64x64.png"
			},
			{
				url: "https://www.tiktok.com",
				title: "TikTok",
				favicon: "https://www.tiktok.com/favicon.ico"
			}
		],
		"https://www.reddit.com": [
			{
				url: "https://twitter.com",
				title: "Twitter",
				favicon: "https://abs.twimg.com/favicons/twitter.ico"
			},
			{
				url: "https://www.instagram.com",
				title: "Instagram",
				favicon: "https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico"
			},
			{
				url: "https://www.facebook.com",
				title: "Facebook",
				favicon: "https://static.xx.fbcdn.net/rsrc.php/yb/r/hLRJ1GG_y0J.ico"
			},
			{
				url: "https://www.tiktok.com",
				title: "TikTok",
				favicon: "https://www.tiktok.com/favicon.ico"
			}
		],
		"https://www.tiktok.com": [
			{
				url: "https://twitter.com",
				title: "Twitter",
				favicon: "https://abs.twimg.com/favicons/twitter.ico"
			},
			{
				url: "https://www.instagram.com",
				title: "Instagram",
				favicon: "https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico"
			},
			{
				url: "https://www.facebook.com",
				title: "Facebook",
				favicon: "https://static.xx.fbcdn.net/rsrc.php/yb/r/hLRJ1GG_y0J.ico"
			},
			{
				url: "https://www.reddit.com",
				title: "Reddit",
				favicon: "https://www.redditstatic.com/shreddit/assets/favicon/64x64.png"
			}
		],

		//Code Repositories
		"https://github.com": [
			{
				url: "https://stackoverflow.com",
				title: "Stack Overflow",
				favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
			},
			{
				url: "https://sourceforge.net",
				title: "SourceForge",
				favicon: "https://a.fsdn.com/con/img/sandiego/svg/originals/sf-icon-orange-no_sf.svg"
			},
			{
				url: "https://bitbucket.org",
				title: "Bitbucket",
				favicon: "https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-16x16.png"
			},
			{
				url: "https://pypi.org",
				title: "PyPI",
				favicon: "https://pypi.org/static/images/favicon.35549fe8.ico"
			}
		],
		"https://stackoverflow.com": [
			{
				url: "https://github.com",
				title: "GitHub",
				favicon: "https://github.githubassets.com/favicons/favicon.png"
			},
			{
				url: "https://sourceforge.net",
				title: "SourceForge",
				favicon: "https://a.fsdn.com/con/img/sandiego/svg/originals/sf-icon-orange-no_sf.svg"
			},
			{
				url: "https://bitbucket.org",
				title: "Bitbucket",
				favicon: "https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-16x16.png"
			},
			{
				url: "https://pypi.org",
				title: "PyPI",
				favicon: "https://pypi.org/static/images/favicon.35549fe8.ico"
			}
		],
		"https://sourceforge.net": [
			{
				url: "https://github.com",
				title: "GitHub",
				favicon: "https://github.githubassets.com/favicons/favicon.png"
			},
			{
				url: "https://stackoverflow.com",
				title: "Stack Overflow",
				favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
			},
			{
				url: "https://bitbucket.org",
				title: "Bitbucket",
				favicon: "https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-16x16.png"
			},
			{
				url: "https://pypi.org",
				title: "PyPI",
				favicon: "https://pypi.org/static/images/favicon.35549fe8.ico"
			}
		],
		"https://sourceforge.net": [
			{
				url: "https://github.com",
				title: "GitHub",
				favicon: "https://github.githubassets.com/favicons/favicon.png"
			},
			{
				url: "https://stackoverflow.com",
				title: "Stack Overflow",
				favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
			},
			{
				url: "https://bitbucket.org",
				title: "Bitbucket",
				favicon: "https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-16x16.png"
			},
			{
				url: "https://pypi.org",
				title: "PyPI",
				favicon: "https://pypi.org/static/images/favicon.35549fe8.ico"
			}
		],
		"https://bitbucket.org": [
			{
				url: "https://github.com",
				title: "GitHub",
				favicon: "https://github.githubassets.com/favicons/favicon.png"
			},
			{
				url: "https://stackoverflow.com",
				title: "Stack Overflow",
				favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
			},
			{
				url: "https://sourceforge.net",
				title: "SourceForge",
				favicon: "https://a.fsdn.com/con/img/sandiego/svg/originals/sf-icon-orange-no_sf.svg"
			},
			{
				url: "https://pypi.org",
				title: "PyPI",
				favicon: "https://pypi.org/static/images/favicon.35549fe8.ico"
			}
		],
		"https://pypi.org": [
			{
				url: "https://github.com",
				title: "GitHub",
				favicon: "https://github.githubassets.com/favicons/favicon.png"
			},
			{
				url: "https://stackoverflow.com",
				title: "Stack Overflow",
				favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
			},
			{
				url: "https://sourceforge.net",
				title: "SourceForge",
				favicon: "https://a.fsdn.com/con/img/sandiego/svg/originals/sf-icon-orange-no_sf.svg"
			},
			{
				url: "https://bitbucket.org",
				title: "Bitbucket",
				favicon: "https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-16x16.png"
			}
		],

		// Music Platforms
		"https://soundcloud.com": [
			{
				url: "https://www.discogs.com/",
				title: "Discogs",
				favicon: "https://st.discogs.com/e615c2f5df3f4aa851c1dcd651de2bae991e86e3/images/favicon-16x16.png"
			},
			{
				url: "https://www.beatport.com",
				title: "Beatport",
				favicon: "https://www.beatport.com/images/favicon-16x16.png"
			},
			{
				url: "https://www.last.fm",
				title: "Last.fm",
				favicon: "https://cdn.last.fm/favicon.ico"
			},
			{
				url: "https://bandcamp.com",
				title: "Bandcamp",
				favicon: "https://s4.bcbits.com/img/favicon/favicon-16x16.png"
			}
		],
		"https://www.discogs.com/": [
			{
				url: "https://soundcloud.com",
				title: "SoundCloud",
				favicon: "https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico"
			},
			{
				url: "https://www.beatport.com",
				title: "Beatport",
				favicon: "https://www.beatport.com/images/favicon-16x16.png"
			},
			{
				url: "https://www.last.fm",
				title: "Last.fm",
				favicon: "https://cdn.last.fm/favicon.ico"
			},
			{
				url: "https://bandcamp.com",
				title: "Bandcamp",
				favicon: "https://s4.bcbits.com/img/favicon/favicon-16x16.png"
			}
		],
		"https://www.beatport.com": [
			{
				url: "https://soundcloud.com",
				title: "SoundCloud",
				favicon: "https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico"
			},
			{
				url: "https://www.discogs.com/",
				title: "Discogs",
				favicon: "https://st.discogs.com/e615c2f5df3f4aa851c1dcd651de2bae991e86e3/images/favicon-16x16.png"
			},
			{
				url: "https://www.last.fm",
				title: "Last.fm",
				favicon: "https://cdn.last.fm/favicon.ico"
			},
			{
				url: "https://bandcamp.com",
				title: "Bandcamp",
				favicon: "https://s4.bcbits.com/img/favicon/favicon-16x16.png"
			}
		],
		"https://www.last.fm": [
			{
				url: "https://soundcloud.com",
				title: "SoundCloud",
				favicon: "https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico"
			},
			{
				url: "https://www.discogs.com/",
				title: "Discogs",
				favicon: "https://st.discogs.com/e615c2f5df3f4aa851c1dcd651de2bae991e86e3/images/favicon-16x16.png"
			},
			{
				url: "https://www.beatport.com",
				title: "Beatport",
				favicon: "https://www.beatport.com/images/favicon-16x16.png"
			},
			{
				url: "https://bandcamp.com",
				title: "Bandcamp",
				favicon: "https://s4.bcbits.com/img/favicon/favicon-16x16.png"
			}
		],
		"https://bandcamp.com": [
			{
				url: "https://soundcloud.com",
				title: "SoundCloud",
				favicon: "https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico"
			},
			{
				url: "https://www.discogs.com/",
				title: "Discogs",
				favicon: "https://st.discogs.com/e615c2f5df3f4aa851c1dcd651de2bae991e86e3/images/favicon-16x16.png"
			},
			{
				url: "https://www.beatport.com",
				title: "Beatport",
				favicon: "https://www.beatport.com/images/favicon-16x16.png"
			},
			{
				url: "https://www.last.fm",
				title: "Last.fm",
				favicon: "https://cdn.last.fm/favicon.ico"
			}
		],


		//#endregion
	};

	return suggestionsData[url] || [];
}

async function updateSuggestions(suggestions) {
	// Clear previous suggestions
	suggestionsList.innerHTML = "";

	// Check if there are suggestions available
	if (suggestions.length === 0) {
		// If no suggestions are available, add "noSuggestions" class to body
		body.classList.add("noSuggestions");
	} else {
		// If suggestions are available, remove "noSuggestions" class from body
		body.classList.remove("noSuggestions");

		// Add new suggestions to the list
		suggestions.forEach(function (suggestion, index) {
			const { url, title, favicon } = suggestion;

			// Create list item and link
			const listItem = document.createElement("li");

			const link = document.createElement("a");
			link.href = url;
			link.target = "_blank"; // Open the link in a new tab
			link.id = `suggested${index + 1}`; // Assign id to the "a" element

			// Add click event listener to the link
			link.addEventListener("click", function (event) {
				setTimeout(() => {
					window.close();
				}, 1);
			});

			const icon = document.createElement("img");
			icon.height = 16;
			icon.width = 16;
			icon.src = favicon;
			icon.alt = 'icon';

			const name = document.createElement("p");
			name.textContent = title;

			listItem.appendChild(link);
			link.appendChild(icon);
			link.appendChild(name);
			suggestionsList.appendChild(listItem);
		});
	}
}