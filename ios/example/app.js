var Quicklook = require('ti.quicklook');

var error = null;
var docs = [
    '/appceleratorHat.jpg',
    '/Pages1-2.pdf',
    '/appceleratorHat.jpg'
];

// Confirm that Quicklook is supported on this device
if (!Quicklook.isSupported()) {
    error = 'iOS 4.0 or greater is required for Quicklook.';
} else {
    // IMPORTANT! Always check if items can be previewed, or a generic error will be displayed to your users!
    for (var i = 0; i < docs.length; i++) {
        if (!Quicklook.canPreviewItem(docs[i])) {
            error =  'The document "' + docs[i] + '" cannot be previewed with Quicklook!';
            break;
        }
    }
}

if (error) {
    alert(error);
} else {
    var window = Ti.UI.createWindow({ backgroundColor: '#fff' });

    var quickView = Quicklook.createView({
        data: docs,
        top: 50, bottom: 50
    });
    window.add(quickView);

    quickView.addEventListener('click', function(evt) {
        if (evt.url) {
            alert('You clicked ' + evt.url);
        }
    });

    // Add refresh and reload buttons
    var refresh = Ti.UI.createButton({
        title: 'Refresh Current', textAlign: 'center',
        top: 0, left: 0, width: '50%', height: 50
    });
    var reload = Ti.UI.createButton({
        title: 'Reload Previewer', textAlign: 'center',
        top: 0, right: 0, width: '50%', height: 50
    });
    refresh.addEventListener('click', function() {
        quickView.refresh();
    });
    reload.addEventListener('click', function() {
        quickView.data = docs;
    });
    window.add(refresh);
    window.add(reload);

    // Navigation Management
    function updateIndex(index) {
        back.enabled = index > 0;
        back.opacity = back.enabled ? 1 : 0.5;
        next.enabled = index < (docs.length - 1);
        next.opacity = next.enabled ? 1 : 0.5;

        quickView.index = index;
    }

    // Add navigation buttons to let the user view different documents
    var back = Ti.UI.createButton({
        title: 'Previous',
        textAlign: 'center',
        bottom: 0, left: 0, width: '50%', height: 50
    });
    var next = Ti.UI.createButton({
        title: 'Next',
        textAlign: 'center',
        bottom: 0, right: 0, width: '50%', height: 50
    });
    back.addEventListener('click', function() {
        updateIndex(Math.max(0, quickView.index - 1));
    });
    next.addEventListener('click', function() {
        updateIndex(Math.min(docs.length - 1, quickView.index + 1));
    });
    window.add(back);
    window.add(next);

    updateIndex(0);

    window.open();
}