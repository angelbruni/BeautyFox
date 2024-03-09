const searchBox = document.getElementById('searchBox');
searchBox.value = null;
function searchTheWeb() { location.href = 'https://' + Services.search.defaultEngine.searchUrlDomain + '/search?q=' + searchBox.value; }

/*if (Services.search.defaultEngine.searchUrlDomain !== 'www.bing.com') {
	document.getElementById('searchLogo').style.display = 'none';
}*/

const searchLogo = document.getElementById('searchLogo');
var logoSrc = 'chrome://userchrome/content/pages/newTabHome/resources/' + Services.search.defaultEngine.name.toLowerCase() + '.svg';
fetch(logoSrc)
	.then(function() { searchLogo.firstElementChild.src = logoSrc; })
	.catch(error => { document.getElementById('searchLogo').style.display = 'none'; });


searchForm.addEventListener('submit', event => {
	event.preventDefault();
	searchTheWeb();
});