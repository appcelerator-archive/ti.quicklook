var Quicklook = require('ti.quicklook');

var window = Ti.UI.createWindow({ backgroundColor: '#fff' });

var docs = [
    'http://appc.me/Content/appceleratorHat.jpg',
    'http://assets.appcelerator.com.s3.amazonaws.com/docs/Appcelerator-IDC-Q1-2011-Mobile-Developer-Report.pdf',
    'http://appc.me/Content/appceleratorHat.jpg' // that's right, we use the same image twice in this example
];

if (!Quicklook.isSupported()) {
    window.add(Ti.UI.createLabel({ text: 'iOS 4.0 or greater is required for Quicklook.' }));
}
// IMPORTANT! Always check if items can be previewed, or a generic error will be displayed to your users!
else if (!Quicklook.canPreviewItem(docs[0]) || !Quicklook.canPreviewItem(docs[1])) {
    window.add(Ti.UI.createLabel({ text: 'The document specified cannot be previewed with Quicklook!' }));
}
else {
    var quickView = Quicklook.createView({
        data: docs,
        top: 50, bottom: 50
    });
    window.add(quickView);

    // Whenever the index changes, the following event fires...
    quickView.addEventListener('indexChanged', function(evt) {
        // Note: if we wanted, we could use the evt.url property to see what the current preview's URL is
        next.opacity = back.opacity = 1;
        back.enabled = next.enabled = true;
        if (evt.index == 0) {
            back.opacity = 0.5;
            back.enabled = false;
        }
        else {
            back.title = quickView.index;
        }
        if (evt.index == docs.length - 1) {
            next.opacity = 0.5;
            next.enabled = false;
        }
        else {
            next.title = quickView.index + 2;
        }
    });

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

    // Add navigation buttons to let the user view different documents
    var back = Ti.UI.createButton({
        textAlign: 'center',
        bottom: 0, left: 0, width: '50%', height: 50
    });
    var next = Ti.UI.createButton({
        textAlign: 'center',
        bottom: 0, right: 0, width: '50%', height: 50
    });
    back.addEventListener('click', function() {
        if (quickView.index > 0) {
            quickView.index -= 1;
        }
    });
    next.addEventListener('click', function() {
        if (quickView.index < docs.length - 1) {
            quickView.index += 1;
        }
    });
    window.add(back);
    window.add(next);

}

window.open();