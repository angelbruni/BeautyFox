function addEllipsesSearch() {
    if (document.querySelector('.searchbar-textbox')) {
        const searchPlaceholderClass = document.querySelector('.searchbar-textbox')
        const searchPlaceholderText = searchPlaceholderClass.getAttribute('placeholder');
        const SearchPlacegolderTextEllipses = searchPlaceholderText + '...';

        searchPlaceholderClass.setAttribute('placeholder', SearchPlacegolderTextEllipses.toString());
    } 
}