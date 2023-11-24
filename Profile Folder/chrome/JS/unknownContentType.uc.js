// ==UserScript==
// @include			chrome://mozapps/content/downloads/unknownContentType.xhtml
// ==/UserScript==

(function () {
	var style = document.createElement('style');
	style.innerHTML = `
    #unknownContentTypeWindow {
        min-width: 398px !important;
      }
      #unknownContentType {
        padding-top: 14px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 39px;
        border-bottom: 1px solid rgb(160, 160, 160);
      }
      #container {
        position: relative;
      }
      #contentTypeImage {
        height: 32px;
        width: 32px;
        margin-top: 2px;
      }
      #intro {
        font-weight: bold;
        margin-inline: 0;
        margin-block: 0;
        margin-bottom: 17px;
      }
      #location::after,
      #whichIs,
      #from,
      #source {
        margin: 0;
        margin-bottom: 3px;
        margin-right: 9px;
        width: 65px;
        text-align: right;
      }
      .plain:not(#location) {
        margin-bottom: 3px !important;
      }
      #from {
        text-transform: capitalize;
      }
      #location {
        display: flex;
        flex-direction: row-reverse;
        justify-content: start;
        font-weight: normal;
      }
      #location::before {
        width: -moz-fit-content;
        width: fit-content;
      }
      #location::after {
        content: "Name:";
      }
      #source {
        font-weight: bold;
      }
      separator,
      .header,
      #basicBox {
        display: none;
      }
      #normalBox {
        margin-top: 16px;
      }
      radio,
      checkbox {
        margin-left: 0;
        padding-left: 0;
      }
      #rememberChoice {
        position: absolute;
        bottom: -63px;
      }
      menulist {
        margin-left: 0;
      }
      .small-indent {
        margin-inline: 0;
      }
      button {
        height: 23px !important;
        min-height: 0 !important;
      }
      #riskWarningContainer {
        display: flex;
        padding: 17px 15px;
        align-items: center;
        border-top: 1px solid white;
      }
      #riskWarningTextContainer {
        width: 370px;
      }
      #riskWarningIcon {
        margin-right: 14px;
      }
    `

	document.getElementById('unknownContentType').appendChild(style);

	document.getElementById('intro').textContent = 'Do you want to run or save this file?';
	document.getElementById('whichIs').textContent = 'Type:';

	document.getElementById('normalBox').removeAttribute('flex');

	var riskWarningContainer = document.createElement('hbox');
	riskWarningContainer.id = 'riskWarningContainer';
	document.getElementById('unknownContentTypeWindow').appendChild(riskWarningContainer);
	var riskWarningIcon = document.createElement('img');
	riskWarningIcon.id = 'riskWarningIcon';
	riskWarningIcon.src = 'chrome://userchrome/content/resources/ieframe.dll/Icon Group/36870.ico';
	riskWarningIcon.width = 32;
	riskWarningIcon.height = 32;
	riskWarningContainer.appendChild(riskWarningIcon);

	var riskWarningTextContainer = document.createElement('div');
	riskWarningTextContainer.id = 'riskWarningTextContainer';
	riskWarningContainer.appendChild(riskWarningTextContainer);

	var riskWarningText = document.createElement('label');
	riskWarningText.textContent = 'While files from the internet can be useful, this file type can potentially harm your computer. If you do not trust the source, do not run or save this software. '
	riskWarningTextContainer.appendChild(riskWarningText);

	var riskWarningLink = document.createElement('a');
	riskWarningLink.textContent = "What's the risk?";
	riskWarningTextContainer.appendChild(riskWarningLink);

	function replaceIcon() {
		var icon = document.getElementById('contentTypeImage');

		if (icon) {
			var iconSrc = icon.src;

			if (iconSrc.includes("size=16")) {
				let icon32 = iconSrc.replace("size=16", "size=32");
				icon.src = icon32;
			}
		}
	}

	setTimeout(() => {
		replaceIcon();
	}, 50);
})();