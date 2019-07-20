window.addEventListener("load", (event) => {

    let favicon = new Favico({
        bgColor: '#ffffff',
        textColor: '#000000',
        animation: 'none'
    });

    function update_unread() {
        let currVal = 0;
        let highlightedElements = document.getElementsByTagName('span');
        for (let i = 0; i < highlightedElements.length; i++) {
            let child = highlightedElements[i].firstChild;
            if (child && child.nodeType === 3) {
                let text = child.data.trim();
                if (text.length > 0 && !Number.isNaN(Number(text))) {
                    currVal = Number(text);
                    break;
                }
            }
        }
        favicon.reset();
        favicon.badge(currVal);
    }

    console.log("Starting unread count for Outlook extension");

    // Not sure when the page will be ready after initial loading :(
    setTimeout(update_unread, 2000);
    setTimeout(update_unread, 5000);
    setTimeout(update_unread, 10000);

    // At least we should be notified when a new message arrives
    let observer = new MutationObserver(update_unread);
    observer.observe(document.body, {characterData: true, subtree: true});
});
