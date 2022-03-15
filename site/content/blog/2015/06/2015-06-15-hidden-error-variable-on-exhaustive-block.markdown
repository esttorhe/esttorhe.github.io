---
type: post
title: "Hidden error variable on exhaustive block"
date: 2015-06-15 22:15:03 -0600
comments: true
categories:
- iOS Engineering
- Engineering
tags:
- swift2
- swift
- radar
- bug
author: Esteban Torres
featured_image: https://www.appfutura.com/uploads/blog/2015/09/Apple-Swift-2.0-1024x640.jpg
issueNumber: 35
---

On my [previous post][throwDoc] I tried to help «solve» in a way the problem with non-typed `throws` by documenting them on the internal docs as lists with `markdown`.

Based on that you can rightfully assume that I'm migrating all my `Result<T,U>` code to support `throws` instead, on my `2.0` branches.

As you might know (or not) whenever you do a `do`/`catch` block the `catch` block needs to be exhaustive; just like a `switch` and «catch» *all* possible paths.

It doesn't mean you __necessarily__ need to specify every single error type in your `catch` block (even though ideally you should react differently for each type of error) but you can add an exhaustive `catch` that will represent «every single error».

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

For now the workaround is simple; avoid using a `let error` near an exhaustive `catch` block. Although that's not quite a solution but a patch; with some luck `Apple` will eventually fix this issue; `Swift 2.0` its still a ß and can contain a fix for this (or at least document it somewhere other than this blog post) by the time it hits production.

In the meantime I filed a radar [`rdar://21396321`][radar] explaining the issue and also asked [Joe Groff][jckarter] (he works on `Swift` compiler at `Apple`) about this and will update when (if) he answers:

{{< tweet 610667900421152768 >}}

## Update

Well; [Joe][jckarter] answered quicker than expected:

{{< tweet 610668658105413633 >}}

Apparently it is intentional (which is good) but is not documented anywhere.

I suggested adding it to the book/docs and he agreed; perhaps we will see a fix for it before it hits production.

[throwDoc]: /2015/06/swift-2.0-throws-tip/
[radar]:http://openradar.appspot.com/21396321
[jckarter]:https://twitter.com/jckarter
