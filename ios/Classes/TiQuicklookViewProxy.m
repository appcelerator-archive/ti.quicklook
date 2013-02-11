/**
 * Ti.Quicklook Module
 * Copyright (c) 2010-2013 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiQuicklookViewProxy.h"
#import "TiQuicklookView.h"

@implementation TiQuicklookViewProxy

#pragma mark Public API

-(void)viewDidAttach
{
    [(TiQuicklookView*)[self view] createView];
}

-(void)refresh:(id)args
{
    [[self view] performSelectorOnMainThread:@selector(refresh:) withObject:args waitUntilDone:NO];
}

DEFINE_DEF_NULL_PROP(data);
DEFINE_DEF_INT_PROP(index, 0);

@end
