// ==UserScript==
// @name        BeautyFox - Downloads Button
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function downloadsButton() {
    const downloadsButton = document.getElementById('downloads-button');
    setAttributes(downloadsButton, {
        'onmousedown':  '',
        'oncommand':    'BrowserDownloadsUI();'
    })

	if (pref('BeautyFox.option.bShowDownloadProgress').tryGet.bool())
		downloadsButton.setAttribute('downloadprogress', true);
	else
		downloadsButton.removeAttribute('downloadprogress');
}