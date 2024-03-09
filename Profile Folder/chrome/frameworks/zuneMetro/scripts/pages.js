let pagesContainer = document.querySelectorAll('.pagesContainer');
pagesContainer.forEach(element => {
	if (element.getAttribute('data-page') == '') {
		element.setAttribute('data-page', 1);
	}
})

function page(groupId) {
	let pagesContainer = document.querySelectorAll('.pagesContainer[data-group="'+ groupId +'"]');

	return {
		seekPages: function(direction) {
			pagesContainer.forEach(element => {
				if (direction == 'backwards' && element.getAttribute('data-page') !== 0) {
					element.setAttribute('data-page', +element.getAttribute('data-page') - 1);
				} else if (direction == 'forwards' || direction == null) {
					element.setAttribute('data-page', +element.getAttribute('data-page') + 1);
				}
	
				updateInfo(groupId);
			})
		},

		skipTo: function(pageId) {
			pagesContainer.forEach(element => {
				element.setAttribute('data-page', pageId)

				updateInfo(groupId);
			})
		}
	}
}

const pageChanged = new CustomEvent("pageChanged");
function showCorrectPage(groupId) {
	let pagesContainer = document.querySelectorAll('.pagesContainer[data-group="'+ groupId +'"]');

	pagesContainer.forEach(element => {
		try {
			document.querySelectorAll('.pagesContainer[data-group="'+ groupId +'"] > :not(#page' + element.getAttribute('data-page') +')').forEach(element => {
				element.style.display = null
			});
	
			document.querySelectorAll('.pagesContainer[data-group="'+ groupId +'"] > #page' + element.getAttribute('data-page')).forEach(element => {
				element.style.display = 'flex'
			});
	
			document.dispatchEvent(pageChanged);
		} catch (e) { console.error(e) }
	})
}

function updateNavButtonsStates(groupId) {
	let pagesContainer = document.querySelectorAll('.pagesContainer[data-group="'+ groupId +'"]');
	let navButton = '[data-functiontype="navigation"]';
	let navButtonBack = document.querySelectorAll(navButton+'[data-navtype="back"]');
	let navButtonNext = document.querySelectorAll(navButton+'[data-navtype="next"]');

	pagesContainer.forEach(element => {
		if (navButtonBack) {
			navButtonBack.forEach(navButton => {
				const previousPageExists = document.querySelectorAll(`.pagesContainer > #page${+element.getAttribute('data-page') - 1}`).length !== 0;
				navButton.setAttribute('disabled', !previousPageExists);
			});
		}
		if (navButtonBack) {
			navButtonNext.forEach(navButton => {
				const nextPageExists = document.querySelectorAll(`.pagesContainer > #page${+element.getAttribute('data-page') + 1}`).length !== 0;
				navButton.setAttribute('disabled', !nextPageExists);
			});
		}
	})
}

function updateBreadcrumbPath() {
	let breadcrumb = document.querySelector('breadcrumbbar');

	if (breadcrumb) {
		pagesContainer.forEach(element => {
			let dataPage = document.querySelector('.pagesContainer > #page'+ element.getAttribute('data-page'));
			let dataStep = dataPage.getAttribute('data-step');

			let breadcrumbStep = document.querySelectorAll('breadcrumbbar > item');
			let breadcrumbCurrentStep = document.querySelector('breadcrumbbar > item[data-path="'+ dataStep +'"]');

			let nextSibling = breadcrumbCurrentStep.nextSibling;
			while (nextSibling !== null) {
				nextSibling.style.display = 'none';
				nextSibling = nextSibling.nextSibling;
			}

			breadcrumbCurrentStep.style.display = 'flex';
			breadcrumbStep.forEach(element => {
				element.classList.remove('active')
			})
			breadcrumbCurrentStep.classList.add('active');
		})
	}
}

function updateTabstrip(groupId) {
	try {
		if (document.querySelector('tabstrip')) {
			if (typeof groupId !== 'undefined') {
				let pagesContainer = document.querySelectorAll('.pagesContainer[data-group="'+ groupId +'"]');
				pagesContainer.forEach(element => {
					let currentPage = document.querySelector('.pagesContainer[data-group="'+ groupId +'"] > #page'+ element.getAttribute('data-page'));
					let currentStep = currentPage.getAttribute('data-step');
			
					let tabstripItem = document.querySelectorAll('tabstrip[data-group="'+ groupId +'"] > tabviewitem');
					tabstripItem.forEach(item => {
						item.classList.remove('active')
					})
					let tabstripCurrentTab = document.querySelector('tabstrip[data-group="'+ groupId +'"] > tabviewitem[data-path="'+ currentStep +'"]');
					tabstripCurrentTab.classList.add('active');
				})
			} else {
				let tabstripCurrentTab = document.querySelectorAll('tabstrip > tabviewitem:first-of-type');
				tabstripCurrentTab.forEach(element => {
					element.classList.add('active');
				})
			}
		}
	} catch (e) { console.error(e) }
}

function updateInfo(groupId) {
	try {
		updateNavButtonsStates(groupId);
		updateBreadcrumbPath();
		updateTabstrip(groupId)
		showCorrectPage(groupId);
	} catch (e) { console.error(e) }
}
updateInfo();