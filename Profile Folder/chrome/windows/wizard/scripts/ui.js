function updateExtendedTitlebar() {
	let currentPage = parseInt(document.querySelector('.pagesContainer').getAttribute('data-page'));

	let pageDescription = document.getElementById('description');
	let breadcrumbbar = document.querySelector('breadcrumbbar');

	if (currentPage == 1 || isNaN(currentPage)) {
		breadcrumbbar.style.display = 'none';
		pageDescription.style.display = null;
	} else {
		breadcrumbbar.style.display = null;
		pageDescription.style.display = 'none';
	}
}
updateExtendedTitlebar();

var chosenAppearance;
const footer = document.querySelector('.footer');
document.addEventListener("pageChanged", () => {
	updateExtendedTitlebar();

	let currentPage = parseInt(document.querySelector('.pagesContainer').getAttribute('data-page'));

	// #region Update variants page depending on the appearance chosen.
	if (currentPage == 3) {
		document.querySelectorAll('#windowContent > .pagesContainer > #page3 > vbox').forEach(element => { element.style.display = 'none'; });
		document.querySelector('#windowContent > .pagesContainer > #page3 > #appearance'+ chosenAppearance).style.display = null;
	}
	// #endregion

	if (currentPage == 2 ||
		currentPage == 3 ||
		currentPage == 5) {
			footer.style.display = 'none';
	} else { footer.style.display = null; }

	accentGradient.style.animation = null;
	setTimeout(() => { accentGradient.style.animation = 'slideYAccentGradient 2s cubic-bezier(0.22, 1, 0.36, 1)'; }, 100);
});