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
    try {
        favicon.badge(currVal);
    } catch (e) {
        console.log(e.message);
        favicon.reset();
    }
}

console.log("Starting unread count for Outlook extension");
window.setInterval(update_unread, 1000);
