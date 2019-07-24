window.addEventListener("load", (event) => {

    let favicon = new Favico({
        bgColor: '#ffffff',
        textColor: '#000000',
        animation: 'none'
    });

    function update_unread() {
		console.log("update_unread");
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
	
	function deferred_update_unread() {
		console.log("deferred_update_unread");
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
