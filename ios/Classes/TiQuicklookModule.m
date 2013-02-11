/**
 * Ti.Quicklook Module
 * Copyright (c) 2010-2013 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiQuicklookModule.h"

@implementation TiQuicklookModule

#pragma mark Internal

// this is generated for your module, please do not change it
-(id)moduleGUID
{
	return @"4a6a96d0-50c8-455d-9e2f-af81b77704e5";
}

// this is generated for your module, please do not change it
-(NSString*)moduleId
{
	return @"ti.quicklook";
}


#pragma mark Lifecycle

-(void)startup
{
	[super startup];
}

-(void)shutdown:(id)sender
{
	[super shutdown:sender];
}

#pragma mark Cleanup 

-(void)dealloc
{
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	[super didReceiveMemoryWarning:notification];
}

#pragma Public APIs

-(BOOL)isSupported:(id)args
{
    // is iOS 4.0 or greater...
    return [UIView instancesRespondToSelector:@selector(contentScaleFactor)];
}

-(BOOL)canPreviewItem:(id)rawURL
{
	ENSURE_SINGLE_ARG(rawURL,NSString);

    NSURL* url = [TiUtils toURL:rawURL proxy:self];
    if (url==nil) {
        NSLog(@"[ERROR] canPreviewItem called without passing in a valid string URL!");
        return NO;
    }

    return [QLPreviewController canPreviewItem:url];
}

@end
