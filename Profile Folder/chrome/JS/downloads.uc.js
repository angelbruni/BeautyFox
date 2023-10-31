// ==UserScript==
// @include			chrome://browser/content/places/places.xhtml
// ==/UserScript==

(function () {
    var labelViewDownloads = getComputedStyle(document.documentElement).getPropertyValue('--label-view-downloads');
    var labelViewNTrackYourDownloads = getComputedStyle(document.documentElement).getPropertyValue('--label-view-n-track-your-downloads');

    window.addEventListener("load", function() {
        setTimeout(() => {
            if (!document.getElementById('downloadsListBox').getAttribute('hidden')) {
                const places = document.getElementById("places");
                places.setAttribute("title", labelViewDownloads + "Windows Internet Explorer");
    
                var style = document.createElement('style');
                style.innerHTML = `
                #places {
                    color-scheme: unset !important;
                  }
                  #places #placesToolbox #placesToolbar {
                    padding: 16px 10px !important;
                    padding-bottom: 17px !important;
                    justify-content: end;
                    background-color: white !important;
                    border-bottom: 1px solid rgb(214, 229, 245) !important;
                    position: relative !important;
                  }
                  #places #placesToolbox #placesToolbar::before {
                    content: attr(data-before);
                    position: absolute;
                    left: 15px;
                    color: rgb(0, 51, 153);
                    font-size: 12pt;
                  }
                  #places #placesToolbox #placesToolbar > *:not(#clearDownloadsButton, search-textbox) {
                    display: none !important;
                  }
                  #places #placesToolbox #placesToolbar #clearDownloadsButton {
                    position: fixed !important;
                    bottom: 7px !important;
                    right: 11px !important;
                    padding: 0 10px !important;
                    width: auto !important;
                    height: 25px !important;
                    border: 1px solid white !important;
                    outline: 1px solid rgb(176, 178, 182) !important;
                    background: linear-gradient(0deg, rgb(231, 231, 231) 0%, rgb(244, 244, 244) 100%) !important;
                    justify-content: center !important;
                    border-radius: 5px !important;
                  }
                  #places #placesToolbox #placesToolbar #clearDownloadsButton:hover {
                    background: linear-gradient(0deg, rgb(185, 214, 252) 0%, rgb(239, 243, 249) 100%) !important;
                  }
                  #places #placesToolbox #placesToolbar #clearDownloadsButton:active, #places #placesToolbox #placesToolbar #clearDownloadsButton[open=true] {
                    background: linear-gradient(0deg, rgb(145, 192, 253) 0%, rgb(229, 236, 246) 100%) !important;
                  }
                  @supports -moz-bool-pref("BeautyFox.appearance.IE10") {
                    #places #placesToolbox #placesToolbar #clearDownloadsButton {
                      outline: none !important;
                      border: 1px solid rgb(172, 172, 172) !important;
                      border-radius: 0 !important;
                      background: linear-gradient(0deg, rgb(229, 229, 229) 0%, rgb(240, 240, 240) 100%) !important;
                    }
                    #places #placesToolbox #placesToolbar #clearDownloadsButton:hover {
                      border: 1px solid rgb(126, 180, 234) !important;
                      background: linear-gradient(0deg, rgb(220, 236, 252) 0%, rgb(236, 244, 252) 100%) !important;
                    }
                    #places #placesToolbox #placesToolbar #clearDownloadsButton:active, #places #placesToolbox #placesToolbar #clearDownloadsButton[open=true] {
                      border: 1px solid rgb(86, 157, 229) !important;
                      background: linear-gradient(0deg, rgb(196, 224, 252) 0%, rgb(218, 236, 252) 100%) !important;
                    }
                  }
                  #places #placesToolbox #placesToolbar search-textbox {
                    -webkit-appearance: textfield !important;
                       -moz-appearance: textfield !important;
                            appearance: textfield !important;
                    max-width: 252px !important;
                    min-height: 22px !important;
                    height: 22px !important;
                    position: relative !important;
                    /*&::after {
                        content: '';
                        height: 20px;
                        width: 24px;
                        background-image: url(images/search7.svg);
                        background-position: center;
                        background-repeat: no-repeat;
                        position: absolute;
                        right: 0;
                    }*/
                    /* Doesn't work yet.
                    input {
                        &::placeholder {
                            font-style: italic !important;
                        }
                    }*/
                  }
                  #places #placesToolbox #placesToolbar search-textbox[focused] {
                    box-shadow: none !important;
                    background-color: inherit !important;
                    border-color: transparent;
                    outline: none !important;
                  }
                  #places #placesView #placesList {
                    min-width: 0 !important;
                    width: 0 !important;
                    max-width: 0 !important;
                  }
                  #places #contentView {
                    background-color: rgb(240, 240, 240) !important;
                  }
                  #places #contentView #placesViewsBox {
                    border-bottom: 1px solid rgb(233, 233, 233) !important;
                    margin-bottom: 39px !important;
                  }
                  #places #contentView #placesViewsBox richlistbox {
                    border: 0 !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox {
                    padding: 25px 9px !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem {
                    min-height: 77px !important;
                    align-items: center !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem:not([selected=true]) {
                    border-bottom: 1px rgb(220, 220, 220) solid !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadMainArea {
                    padding: 14px 29px !important;
                    width: calc(100% - 200px);
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadMainArea .downloadTypeIcon {
                    display: none !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadMainArea .downloadContainer {
                    /* Doesn't work ??
                    .downloadProgress {
                        &::before {
                            content: attr(value) "%";
                        }
                    }*/
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadMainArea .downloadContainer .downloadTarget {
                    font-size: 12pt !important;
                    width: 50% !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton {
                    height: 25px !important;
                    min-width: 85px !important;
                    padding: 0 !important;
                    margin-right: 33px !important;
                    color: black !important;
                    border: 1px solid white !important;
                    outline: 1px solid rgb(176, 178, 182) !important;
                    background: linear-gradient(0deg, rgb(231, 231, 231) 0%, rgb(244, 244, 244) 100%) !important;
                    justify-content: center !important;
                    border-radius: 5px !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:hover {
                    background: linear-gradient(0deg, rgb(185, 214, 252) 0%, rgb(239, 243, 249) 100%) !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:active, #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton[open=true] {
                    background: linear-gradient(0deg, rgb(145, 192, 253) 0%, rgb(229, 236, 246) 100%) !important;
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton::before {
                    content: attr(tooltiptext);
                  }
                  #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton .button-box {
                    display: none !important;
                  }
                  @supports -moz-bool-pref("BeautyFox.appearance.IE10") {
                    #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton {
                      outline: none !important;
                      border: 1px solid rgb(172, 172, 172) !important;
                      border-radius: 0 !important;
                      background: linear-gradient(0deg, rgb(229, 229, 229) 0%, rgb(240, 240, 240) 100%) !important;
                    }
                    #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:hover {
                      border: 1px solid rgb(126, 180, 234) !important;
                      background: linear-gradient(0deg, rgb(220, 236, 252) 0%, rgb(236, 244, 252) 100%) !important;
                    }
                    #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton:active, #places #contentView #placesViewsBox richlistbox#downloadsListBox > richlistitem .downloadButton[open=true] {
                      border: 1px solid rgb(86, 157, 229) !important;
                      background: linear-gradient(0deg, rgb(196, 224, 252) 0%, rgb(218, 236, 252) 100%) !important;
                    }
                  }
                  
                  .textbox-search-icons {
                    display: grid !important;
                    height: 18px !important;
                    width: 18px !important;
                  }
                  .textbox-search-icons .textbox-search-icon {
                    list-style-image: url(images/search7.svg) !important;
                    height: 16px !important;
                    width: 16px !important;
                  }
                  .textbox-search-icons .textbox-search-clear {
                    list-style-image: url(images/clear.svg) !important;
                    height: 18px !important;
                    width: 18px !important;
                    margin-top: -1px !important;
                  }
                  .textbox-search-icons .textbox-search-clear:hover {
                    list-style-image: url(images/clear-hover.svg) !important;
                  }/*# sourceMappingURL=library-window.css.map */
                
                `
                  
                places.appendChild(style);
            
                const placesToolbar = document.getElementById("placesToolbar");
                placesToolbar.setAttribute('data-before', labelViewNTrackYourDownloads);
            }
        }, 0);
    })
    
})();