---
layout: post
title: "'Show' Adaptative Segue Error"
date: 2014-12-16 18:43:03 +0000
author: Esteban Torres
comments: true
categories: iOS radar bug segue
tags: iOS, radar, bug, segue
image:
    feature: /images/posts/segue.png
---
[Apple](http://developer.apple.com) introduced the new "adaptative segues" which in theory handles the uses of segues depending on device, size classes and context.
All of this means that depending on where we are running our code the adaptive segue will adapt (hence its name) and will present or push depending on the capabilities of the current container.

With that said here's the detail of each of this new segues:

| Name | Interface Builder Symbol | Description | 
| --- |: --- :| --- |
| `Show` | ![](https://developer.apple.com/library/ios/recipes/xcode_help-IB_storyboard/art/SB_H_segue_push_2x.png =30x30) | Present the content in the detail or master area depending on the content of the screen. If the app is displaying a master and detail view, the content is pushed onto the detail area. If the app is only displaying the master or the detail, the content is pushed on top of the current view controller stack. |
| `Show Detail` | ![](https://developer.apple.com/library/ios/recipes/xcode_help-IB_storyboard/art/SB_H_segue_push_2x.png =30x30) | Present the content in the detail area. If the app is displaying a master and detail view, the new content replaces the current detail. If the app is only displaying the master or the detail, the content replaces the top of the current view controller stack. |
| `Present Modally` | ![](https://developer.apple.com/library/ios/recipes/xcode_help-IB_storyboard/art/SB_H_segue_modal_2x.png =30x30) | Present the content modally. There are options to choose a presentation style (UIModalPresentationStyle) and a transition style (UIModalTransitionStyle). |
| `Present as Popover` | ![](https://developer.apple.com/library/ios/recipes/xcode_help-IB_storyboard/art/SB_H_segue_popover_2x.png =30x30) | Present the content as a popover anchored to an existing view. There is an option to specify the possible directions of the arrow shown on one edge of the popover view (UIPopoverArrowDirection). There is also an option to specify the anchor view. |

*From Apple's Documentation: [https://developer.apple.com/library/ios/recipes/xcode_help-IB_storyboard/chapters/StoryboardSegue.html](https://developer.apple.com/library/ios/recipes/xcode_help-IB_storyboard/chapters/StoryboardSegue.html)*

From the documentation we can take that during a "regular" usage of the `Show` segue on an `iPhone` app that's not showing a master/detail the segue will behave as a now deprecated `Push` segue.

If we open `Xcode` and create a new project; connect one `UIViewController` to another with a segue from a `UIButton` and selecting `Show` segue everything will work as expected.
The app will show a `UIViewController` with a `UIButton`; and upon preseeing said button a child view controller will be pushed on the controller stack.

If we switch to `iOS 7.1` and run the project everything works as advertised.

So far so good.

#Problem
