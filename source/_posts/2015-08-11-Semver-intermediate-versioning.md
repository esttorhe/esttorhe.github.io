title: Semver intermediate versioning
date: 2015-08-11 14:07:36
tags:
- tips
- programming
- semver
- versioning
---
Lately I've come across multiple tweets and talks about people avoiding jumping over the dreaded `1.0.0` of their `frameworks`, tools, etc.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">If semver defined some simple criteria for what constitutes a 1.x release would that help alleviate the fear?</p>&mdash; Colin Eberhardt (@ColinEberhardt) <a href="https://twitter.com/ColinEberhardt/status/631152832490643457">August 11, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Why do so many open source projects fear making a 1.x releases? My projects depend on numerous 0.x versions - should that worry me!</p>&mdash; Colin Eberhardt (@ColinEberhardt) <a href="https://twitter.com/ColinEberhardt/status/631152342826663936">August 11, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

---

Sadly that's the current state of «our world» as developers.

<!--more-->

## What is `semver`?
[semver][semver] stands for `Semantic Versioning`; here's a excerpt from the website:

```, Semver Org, http://semver.org/

Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards-compatible manner, and
PATCH version when you make backwards-compatible bug fixes.
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
```
As you can see [semver][semver] specifies a series of numbers (3) to correctly determine the versions of your frameworks.

Notice that its based off of `MAJOR`.`MINOR`.`PATCH` where `MAJOR` should change when you introduce breaking changes (make incompatible changes to the `API` basically).

## What I propose! 🎉
Given the fact that most package managers work using [semver][semver] as their «tagging» base and that most «consumers» of your work will most likely update to whichever version you release as long as is not `MAJOR` without having to do much refactoring (e.g. using [CocoaPods][cocoapods] you can specify something like `~> 1.5` which roughly translates to => «update to every new version above 1.5 as long as its < 2.0.0»)

I propose that everyone maintaining public facing frameworks should support an «intermediate» version right before their `MAJOR` release.

### Why?
Simply put most modern languages let us mark methods as deprecated; and depending on the language and the compiling flags we can treat this as `warnings` ⚠ or `errors` ⛔ and the compiler will shout at us when a method is marked as deprecated.

I'm proposing we should release a `MINOR` or `PATCH` release right before the `MAJOR` marking all the methods that will either disappear or change drastically on the next `MAJOR` release. This way the consumers will get a warning on their latest automated update and will be prepared what will change on the next `MAJOR`.

With this they can know what to expect instead of trying to update to the latest `MAJOR` and facing a bunch of breaking changes.

To me this seems like a more «friendly» way to alert consumers of what will definitely change/break; also having the compiler warnings there will help some consumers be prepared and start thinking about how to use the new methods BEFORE even having to actually start work to support the latest version of your frameworks.

## 👋
And that's it; nothing too fancy or too techie but worth a blog post and maybe let the ball rolling.

Perhaps someone else will share this vision of things and consumers will start getting «warning» releases before every `MAJOR` one.

[semver]:http://semver.org/
[cocoapods]:https://cocoapods.org
