---
title: Small Tip for Debugging Autolayout issues
date: 2016-01-13 16:11:38
tags:
- ios
- xcode
- debugging
- ide
categories:
- tips
- ide

---

This is quite a small post and probably not worth writing it but I know that this will come in handy in the future and will totally forget about it.

The other day I was trying to figure out an Autolayout crash on the app I was working on and trying to make head of tails from the console log with stuff like this:

<!-- more -->

```
<NSAutoresizingMaskLayoutConstraint:0x175086220 h=-&- v=-&- UIView:0x147533250.height == UIView:0x14760b4a0.height>
```

Imagine that but with many interacting `UIViews` at play; most of the time you can actually figure what's going on based on the `constant` value or if you are well versed you can see the `Matrix` from source code a la Neo; but let's be honest; more times than none you are left wondering which view is which…

## `accessibilityLabel` to the rescue

Looking around how to set debug names for views/constraints I found out that setting the `accessibilityLabel` of `UIView`s will appear in the console log next to the horrible mess that I showed above in this post making things more «human readable».

Basically «abusing» `accessibilityLabel` and `accessibilityIdentifier` we can help us figure out those pesky autolayout crashes.

We use `Storyboard`s in our projects; like I've said before:

{% blockquote Esteban Torres https://estebantorr.es/blog/2014/12/17/show-adaptative-segue-error/ Show Adaptative Segue Error %}
…yes, we use storyboards, we are drinking Apple’s “Kool-Aid”…
{% endblockquote %}

Which makes it really easy to set that `accessibilityLabel` and `accessibilityIdentifier` directly from `InterfaceBuilder`; sadly this time the issue was happening while generating some `UI` via code.
This doesn't make this any less useful; those traits can be set via code as well 🎉

That way at least you can infer something like this:

```
loginTextView tail constraint of 10 with logoImageView leading

logoImageView top constraint of 15 to topLayout
```

<br />
That's obviously pseudocode but you get the idea; knowing which views are actually interacting with the crash helps figure out why and how to fix them.
