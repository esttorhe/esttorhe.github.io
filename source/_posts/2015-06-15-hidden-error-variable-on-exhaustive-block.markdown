---
layout: post
title: "Hidden error variable on exhaustive block"
date: 2015-06-15 22:15:03 -0600
comments: true
categories:
- bug
- radar
- swift2
tags:
- swift2
- coding
- radar
- bug
author: Esteban Torres
image:
    feature: https://developer.apple.com/assets/elements/icons/128x128/swift_2x.png
---

On my [previous post][throwDoc] I tried to help «solve» in a way the problem with non-typed `throws` by documenting them on the internal docs as lists with `markdown`.

Based on that you can rightfully assume that I'm migrating all my `Result<T,U>` code to support `throws` instead, on my `2.0` branches.

As you might know (or not) whenever you do a `do`/`catch` block the `catch` block needs to be exhaustive; just like a `switch` and «catch» *all* possible paths.

It doesn't mean you __necessarily__ need to specify each and every single error type in your `catch` block (even though ideally you should react differently for each type of error) but you can add an exhaustive `catch` that will represent «every single error».

<!--more-->

# The Problem

Apparently `Swift` internally «reserves» the `error` variable on the exhaustive `catch` block without documenting it anywhere on the book.

To provide context copy and paste the following code in an empty `Playground` on `Xcode 7` and see how the compiler complains with the message:
> Cannot assign to 'let' value 'error'

```swift
enum TestError: ErrorType {
  case HiddenErrorVariable
}

func throwingFunction() throws -> () {
  throw TestError.HiddenErrorVariable
}

let error: TestError
do {
  try throwingFunction()
} catch {
  error = TestError.HiddenErrorVariable

  print(error)
}

print(error)
```

___
Keep in mind that this is an oversimplified and reduced code to demonstrate the issue; I'm well aware that without that compile complain it will still complain about using `error` without being initialized.
___

# What now?

For now the workaround is simple; avoid using a `let error` near an exhaustive `catch` block. Although that's not quite a solution but a patch; hopefully `Apple` will eventually fix this issue; `Swift 2.0` its still a ß and can contain a fix for this (or at least document it somewhere other than this blog post) by the time it hits production.

In the meantime I filed a radar [`rdar://21396321`][radar] explaining the issue and also asked [Joe Groff][jckarter] (he works on `Swift` compiler at `Apple`) about this and will update when (if) he answers:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/jckarter">@jckarter</a> is the `error` reservation on exhaustive `catch` documented anywhere - <a href="http://t.co/qgGm1tlX4i">http://t.co/qgGm1tlX4i</a> ? Or a bug?</p>&mdash; ᴡᴀᴛᴄʜ Torres (@esttorhe) <a href="https://twitter.com/esttorhe/status/610667900421152768">June 16, 2015</a></blockquote>

<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Update

Well; [Joe][jckarter] answered quicker than expected:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/esttorhe">@esttorhe</a> It intentionally implicitly binds an &quot;error&quot; variable if you specified none.</p>&mdash; Joe Groff (@jckarter) <a href="https://twitter.com/jckarter/status/610668658105413633">June 16, 2015</a></blockquote>

<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>

Apparently it is intentional (which is good) but is not documented anywhere.

I suggested adding it to the book/docs and he agreed; perhaps we will see a fix for it before it hits production.

[throwDoc]:http://www.estebantorr.es/blog/2015/06/14/swift-2-dot-0-throws-tip/
[radar]:http://openradar.appspot.com/21396321
[jckarter]:https://twitter.com/jckarter
