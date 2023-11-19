function openWhatsNewIE() {
    var whatsNewURL = null;

    if (IsIE11Appearance) {
        whatsNewURL = 'https://betawiki.net/wiki/Internet_Explorer_11';
    }
    else if (IsIE10DeveloperPreviewAppearance || IsIE10ConsumerPreviewAppearance || IsIE10ReleasePreviewAppearance || IsIE10Appearance) {
        whatsNewURL = 'https://betawiki.net/wiki/Internet_Explorer_10';
    }
    else {
        whatsNewURL = 'https://betawiki.net/wiki/Internet_Explorer_9';
    }

    _ucUtils.loadURI(window,{url: whatsNewURL, where: 'tab'})
}