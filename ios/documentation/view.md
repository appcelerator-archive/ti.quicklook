# Ti.Quicklook.View

## Description

Displays a preview of a document to the user. A document could be any of the following:

* iWork documents
* Microsoft Office documents (Office '97 and newer)
* Rich Text Format (RTF) documents
* PDF files
* Images
* Text files whose uniform type identifier (UTI) conforms to the public.text type
* Comma-separated value (csv) files

## Functions

### refresh()

Refreshes the currently displayed item's preview.

## Properties

### data[array of string URLs]

An array of URLs to the documents that should be previewed. If you add more than one URL to this array, use the "index"
property to change the visible document. A UI to let the user control which is visible is up to you.

### index[int]

The index of the currently visible document. Note that this is a zero-based index.

## Events

### click

Fired when a URL is clicked in one of the previewed documents. If you do not register for this click event, the default
action will be taken when the URL is clicked (the operating system will open the URL).

One property is available in the first argument passed to any handlers:

* url [string] The URL that was clicked