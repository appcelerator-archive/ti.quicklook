/**
 * Ti.Quicklook Module
 * Copyright (c) 2010-2013 by Appcelerator, Inc. All Rights Reserved.
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiQuicklookView.h"
#import "TiUtils.h"

@implementation TiQuicklookView

-(id)init
{
    if ((self = [super init])) {
        previewer = [[QLPreviewController alloc] init];
        previewer.dataSource = self;
        previewer.delegate = self;
    }
    return self;
}

-(void)frameSizeChanged:(CGRect)frame bounds:(CGRect)bounds
{
    [TiUtils setView:previewer.view positionRect:bounds];
}

-(void)dealloc
{
    RELEASE_TO_NIL(documents);
    RELEASE_TO_NIL(previewer);
    [super dealloc];
}

-(void)setData_:(id)args
{
    ENSURE_TYPE_OR_NIL(args, NSArray);
    
    RELEASE_TO_NIL(documents);
    documents = [args retain];
    [previewer reloadData];
}

-(NSInteger)index_
{
    return previewer.currentPreviewItemIndex;
}

-(void)setIndex_:(id)value
{
    NSInteger index = [TiUtils intValue:value];
    if (index < 0 || documents == nil || index >= [documents count]) {
        NSLog(@"[ERROR] Attempted to set index out of bounds! Ignoring...");
    } else {
        previewer.currentPreviewItemIndex = index;
    }
}

-(void)createView
{
    [self addSubview:[previewer view]];
}

-(void)refresh:(id)args
{
    [previewer refreshCurrentPreviewItem];
}

-(NSInteger)numberOfPreviewItemsInPreviewController:(QLPreviewController *)controller 
{
    return documents != nil ? [documents count] : 0;
}

-(id <QLPreviewItem>)previewController: (QLPreviewController *)controller previewItemAtIndex:(NSInteger)index 
{
    if (documents == nil) {
        return nil;
    }
    
    NSString* item = [documents objectAtIndex:index];

    return [TiUtils toURL:item
                    proxy:self.proxy];
}

/*!
 * @abstract Invoked by the preview controller before trying to open an URL tapped in the preview.
 * @result Returns NO to prevent the preview controller from calling -[UIApplication openURL:] on url.
 * @discussion If not implemented, defaults is YES.
 */
-(BOOL)previewController:(QLPreviewController *)controller shouldOpenURL:(NSURL *)url forPreviewItem:(id <QLPreviewItem>)item
{
    if (documents == nil) {
        return NO;
    }
    
    NSURL *currentUrl = [TiUtils toURL:[documents objectAtIndex:previewer.currentPreviewItemIndex]
                                 proxy:self.proxy];
    if ([[currentUrl path] caseInsensitiveCompare:[url path]] == NSOrderedSame) {
        return NO;
    }
    
    if ([[self proxy] _hasListeners:@"click"]) {
        [self.proxy fireEvent:@"click"
                   withObject:[NSDictionary dictionaryWithObjectsAndKeys:
                               [url absoluteString], @"url",
                               nil]];
        return NO;
    } else {
        return YES;
    }
}

@end
