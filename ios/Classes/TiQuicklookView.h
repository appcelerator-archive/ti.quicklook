/**
 * Ti.Quicklook Module
 * Copyright (c) 2010-2013 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE included with this distribution for details.
 */

#import <Foundation/Foundation.h>
#import <QuickLook/QuickLook.h>
#import "TiUIView.h"

@interface TiQuicklookView : TiUIView <QLPreviewControllerDataSource, QLPreviewControllerDelegate>
{
    NSArray* documents;
    QLPreviewController* previewer;
}

-(void)createView;
-(void)refresh:(id)args;

@end
