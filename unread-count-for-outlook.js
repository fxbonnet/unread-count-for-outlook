window.addEventListener("load", (event) => {

    let favicon = new Favico({
        bgColor: '#ffffff',
        textColor: '#000000',
        animation: 'none'
    });

    function update_unread() {
        favicon.reset();
        // Try to find the unread count close to <i data-icon-name="Inbox"
        let iElements = document.getElementsByTagName('i');
        for (let i = 0; i < iElements.length; i++) {
            let iElement = iElements[i];
            if (iElement.attributes['data-icon-name'] && iElement.attributes['data-icon-name'].value === 'Inbox') {
                let numericValue = findSpanWithNumber(iElement.parentElement.parentElement);
                if (numericValue)
                    favicon.badge(numericValue);
                return;
            }
        }
        // If we did not find the icon, fallback to any <span containing a number
        let numericValue = findSpanWithNumber(document);
        if (numericValue)
            favicon.badge(numericValue);
    }

    function findSpanWithNumber(element) {
        let spanElements = element.getElementsByTagName('span');
        for (let i = 0; i < spanElements.length; i++) {
            let child = spanElements[i].firstChild;
            if (child && child.nodeType === 3) {
                let text = child.data.trim();
                if (text.length > 0 && !Number.isNaN(Number(text))) {
                    return Number(text);
                }
            }
        }
    }

    function deferred_update_unread() {
        setTimeout(update_unread, 1000);
    }

    console.log("Starting unread count for Outlook extension");

    // Not sure when the page will be ready after initial loading :(
    setTimeout(update_unread, 2000);

    // Backup mode if events don't work
    setInterval(update_unread, 10000);

    // At least we should be notified when a new message arrives
    let observer = new MutationObserver(deferred_update_unread);
    observer.observe(document.body, {characterData: true, subtree: true});
});
