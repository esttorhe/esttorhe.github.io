---
type: post
title: "Swift 2.0 - throws tip"
date: 2015-06-14 17:39:51 +0000
comments: true
categories:
- tips
- swift
tags:
- swift2
- swift
- cocoa
- tips
author: Esteban Torres
issueNumber: 36
---

# Quick `Swift 2.0` `throws` tip:

There's been __*a lot*__ of «heated» debates regarding the `throws` approach added to `Swift 2.0` in favor of `Either<T,U>`.

---
Some examples:

{{< tweet 609841773284724737 >}}

<!-- more -->

---

{{< tweet 608066730250924032 >}}

---

That being said, I'm not going to convince you to use it or avoid it. That's entirely up to you, the app / framework you are working on and wether or not you need to do async calls with `throws` (which is a «fun» thing to accomplish).

<br/>

If you end up using the `throws` approach though there's a big issue along the lines of «What is this function supposed to `throw` at me?»

And while this tip won't «solve» the issue at compile time is sure a nice way to «notify» the consumers of your `API` somehow.

My approach so far was to add the following to the header of the apple doc of my functions:

```swift
  /**
  Do something nice here.

  - parameter dragon: 🐉

  - returns: A rainbow 🌈

  - throws `CustomError`: Thrown when a unicorn is born.
  */
  public func winTheInternet(dragon: Dragon) throws -> Rainbow { …
```

This will turn into something like this:

![](assets/images/post/2015/06/swift-2-dot-0-throws-tip/swif2_throws_documentation.png)


## Take away

As you can see this is not a «perfect» solution but is at least a great way of providing documentation for your callers as part of your internal documentation.

Happy documentation! 😉
