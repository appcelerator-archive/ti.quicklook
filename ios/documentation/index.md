# Ti.Quicklook Module

## Description

Lets you preview documents without leaving your app. The following items are supported:

* iWork documents
* Microsoft Office documents (Office '97 and newer)
* Rich Text Format (RTF) documents
* PDF files
* Images
* Text files whose uniform type identifier (UTI) conforms to the public.text type
* Comma-separated value (csv) files

## Getting Started

View the [Using Titanium Modules](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_Titanium_Modules) document for instructions on getting
started with using this module in your application.

## Accessing the Ti.Quicklook Module

To access this module from JavaScript, you would do the following:

<pre>var Quicklook = require('ti.quicklook');</pre>

## Functions

### Ti.Quicklook.isSupported()

Returns true if the current device supports Quicklook. This will be true on any device with iOS >= 4.0.

### Ti.Quicklook.canPreviewItem(string url)

Returns true if Quicklook supports the specified URL.

#### Arguments

Takes one argument, a string URL to a document. This can be internal or external.

### Ti.Quicklook.createView({...})

Creates a [Ti.Quicklook.View][].

#### Arguments

Takes one argument, a dictionary with any of the properties from [Ti.Quicklook.View][].

## Usage

See example.

## Author

Dawson Toth

## Module History

View the [change log](changelog.html) for this module.

## Feedback and Support

Please direct all questions, feedback, and concerns to [info@appcelerator.com](mailto:info@appcelerator.com?subject=iOS%20Quicklook%20Module).

## License

Copyright(c) 2010-2013 by Appcelerator, Inc. All Rights Reserved. Please see the LICENSE file included in the distribution for further details.

[Ti.Quicklook.View]: view.html