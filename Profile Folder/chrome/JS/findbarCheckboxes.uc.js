function convertCheckboxesToNativeLook() {
    const config = { childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode.nodeName.toLowerCase() === 'findbar') {
                        var findbarHighlight = addedNode.querySelector('[anonid="highlight"]');
                        var findbarCaseSensitive = addedNode.querySelector('[anonid="find-case-sensitive"]');
                        var findbarMatchDiacritics = addedNode.querySelector('[anonid="find-match-diacritics"]');
                        var findbarEntireWord = addedNode.querySelector('[anonid="find-entire-word"]');

                        findbarHighlight.setAttribute('native', 'true');
                        findbarCaseSensitive.setAttribute('native', 'true');
                        findbarMatchDiacritics.setAttribute('native', 'true');
                        findbarEntireWord.setAttribute('native', 'true');
                    }
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);
}