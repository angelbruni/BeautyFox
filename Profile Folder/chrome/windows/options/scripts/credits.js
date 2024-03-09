const creditsPeople = {
    1: {
        name: 'AngelBruni',
        role: {
            'aboutThemeDeveloper': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/48385307'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/angelbruni'
            }
        }
    },
    2: {
        name: 'travis',
        role: {
            'aboutInspiration': true,
            'aboutConceptArt': true,
            'aboutBranding': true,
            'changeTitlebarText.uc.js': false,
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/94665268'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/travy-patty'
            }
        }
    },
    3: {
        name: 'MrOtherGuy',
        role: {
            'fx-autoconfig': false
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/31620503'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/MrOtherGuy'
            }
        }
    },
    4: {
        name: 'Aris-t2',
        role: {
            'favicon_in_urlbar.uc.js': false
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/6013569'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/Aris-t2'
            }
        }
    },
    5: {
        name: 'the mice nest',
        role: {
            'aboutTrailer': true
        },
        picture: {
            src: 'https://micenest.xyz/assets/mn-thumb.webp'
        },
        links: {
            "Website": {
                url: 'https://micenest.xyz',
                isLocalised: true
            }
        }
    },
    6: {
        name: 'ephemeralViolette',
        role: {
            'Firefox Native Controls': false
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/28045018'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/ephemeralviolette'
            }
        }
    },
    7: {
        name: 'luisl',
        role: {
            'aboutTesting': true,
            'aboutSpanishTranslation': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/108156867',
            phobiaCensor: true
        },
        links: {
            "GitHub": {
                url:'https://github.com/luisl173'
            }
        }
    },
    8: {
        name: 'MaTe',
        role: {
            'aboutTesting': true,
            'aboutPortugueseBrazillianTranslation': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/140651967'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/MisforMaTe'
            }
        }
    },
    9: {
        name: 'neptuneen',
        role: {
            'aboutTesting': true,
            'aboutPortugueseBrazillianTranslation': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/144282272'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/catneptune'
            }
        }
    },
    10: {
        name: 'ImSwordQueen',
        role: {
            'aboutTesting': true,
            'aboutIdeas': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/52015098'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/ImSwordQueen'
            }
        }
    },
    11: {
        name: 'Brawllux',
        role: {
            'aboutTesting': true,
            'aboutTurkishTranslation': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/64068157'
        },
        links: {
            "GitHub": {
                url: 'https://github.com/EndlessLuck'
            }
        }
    },
    12: {
        name: 'slice',
        role: {
            'aboutOrderer': true,
            'aboutTesting': true,
            'aboutIdeas': true
        },
        picture: {
            src: 'chrome://bfwindows/content/options/resources/defaultUser.jpg'
        }
    },
    13: {
        name: 'aboutTestingTeam',
        isNameLocalised: true,
        role: {
            'aboutTesting': true
        },
        picture: {
            src: 'chrome://bfwindows/content/options/resources/defaultGroup.jpg'
        }
    },
    14: {
        name: 'Microsoft Corporation',
        role: {
            'aboutThanksMicrosoft': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/6154722'
        },
        links: {
            "Website": {
                url: 'https://www.microsoft.com',
                isLocalised: true
            }
        }
    },
    15: {
        name: 'Mozilla',
        role: {
            'aboutThanksMozilla': true
        },
        picture: {
            src: 'https://avatars.githubusercontent.com/u/131524'
        },
        links: {
            "Website": {
                url: 'https://www.mozilla.org',
                isLocalised: true
            }
        }
    }
}
const container = document.getElementById('userTilesContainer');
for (const key in creditsPeople) {
    if (creditsPeople.hasOwnProperty(key)) {
        const person = creditsPeople[key];
        
        // Creating elements
        const userTile = document.createElement('userTile');
        userTile.classList.add('fadeInLeftToRight');
        userTile.setAttribute('animation-order', key);

        // Creating a container for the picture
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('userTileImageContainer');

        const image = document.createXULElement('image');
        image.setAttribute('src', person.picture.src);
        if (person.picture.phobiaCensor) {
            image.classList.add('spoiler');
        }

        // Appending image to the container
        imageContainer.appendChild(image);

        const userTileInfoContainer = document.createXULElement('vbox');
        userTileInfoContainer.classList.add('userTileInfoContainer');

        const nameLabel = document.createXULElement('label');
        nameLabel.classList.add('userTileName');
        person.isNameLocalised ? nameLabel.setAttribute('locale', person.name) : nameLabel.textContent = person.name;

        const roleLabel = document.createXULElement('label');
        roleLabel.classList.add('userTileRole');

        // Adding roles
        for (const descKey in person.role) {
            if (person.role.hasOwnProperty(descKey)) {
                const isLocalized = person.role[descKey];
                const roleSpan = document.createElement('span');
                isLocalized ? roleSpan.setAttribute('locale', descKey) : roleSpan.textContent = descKey;
                roleLabel.appendChild(roleSpan);
            }
        }

        const socialsContainer = document.createXULElement('hbox');
        socialsContainer.classList.add('userTileSocials');

		const bDoNotRunWizardInNextStart = pref(BeautyFoxSettingType.option + 'bDoNotRunWizardInNextStart').tryGet.bool();
		if (bDoNotRunWizardInNextStart !== false) {
			// Adding links
			for (const linkName in person.links) {
				if (person.links.hasOwnProperty(linkName)) {
					const link = person.links[linkName];
					const linkLabel = document.createXULElement('label');
					linkLabel.classList.add('zuneLink');
					if (link.isLocalised) {
						linkLabel.setAttribute('locale', linkName);
					} else {
						linkLabel.textContent = linkName;
						linkLabel.addEventListener('click', function() {
							openLink(link.url);
						});
					}
					socialsContainer.appendChild(linkLabel);
				}
			}
		}

        // Appending elements
        userTile.appendChild(imageContainer); // Append image container instead of image directly
        userTileInfoContainer.appendChild(nameLabel);
        userTileInfoContainer.appendChild(roleLabel);
        userTile.appendChild(userTileInfoContainer);
        userTile.appendChild(socialsContainer);
        
        // Appending user tile to container
        container.appendChild(userTile);
    }
}