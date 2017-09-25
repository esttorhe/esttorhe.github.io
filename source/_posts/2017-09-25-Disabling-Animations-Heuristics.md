title: Disabling Animations Heuristics
date: 2017-09-25 13:19:44
tags:
- animations
- heuristics
- ios

---

Checking `Twitter` the other day I stumble this tweets from [Sash Zats][sash] addressing some heuristics for enabling/disabling intensive animations in `iOS` apps:

---

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">**[1/4]** When performing intensive animations or other auxiliary work consider creating a helper checking following (in no particular order):</p>&mdash; Sash Zats (@zats) <a href="https://twitter.com/zats/status/910125012157214721">September 19, 2017</a></blockquote>

<!--more-->

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">**[2/4]**<br>• `NSProcessInfo thermalState` - is device already working hard<br>• `NSProcessInfo isLowPowerModeEnabled` - is user trying to safe battery</p>&mdash; Sash Zats (@zats) <a href="https://twitter.com/zats/status/910125072764960773">September 19, 2017</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">**[3/4]**<br>• `UIAccessibilityIsReduceMotionEnabled` - is user sensitive to motion</p>&mdash; Sash Zats (@zats) <a href="https://twitter.com/zats/status/910125128385650694">September 19, 2017</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">**[4/4]**<br>• `UIDevice batteryState` &amp; `batteryLevel` - to know when device is not charging and low on battery<br>Any other heuristics that I&#39;m missing?</p>&mdash; Sash Zats (@zats) <a href="https://twitter.com/zats/status/910125225622224896">September 19, 2017</a></blockquote>
<div align="right">
_Note: Emphasis added_
</div>

---

That definitely resonated in me and made me realised with horror that I have never «bothered» to even consider any of this things before performing intensive blocks of animation.

Below on the thread [Marin Todorov][marin] provided a link to this checks added to `RxAnimated` (Here's the link to the specific line of code: [shouldDisableAnimationsViaDefaultHeuristics][code]).

{% github RxSwiftCommunity RxAnimated ac3e33b5aa5334f13d930a52c3fc3f341b66e13f %}

---

From now on this is something that I'll definitely be doing on my apps and would probably keep updating it as more I find more heuristics to be applied to this check.

[sash]:https://twitter.com/zats
[marin]:https://twitter.com/icanzilb
[code]:https://github.com/RxSwiftCommunity/RxAnimated/blob/master/RxAnimated/Core/RxAnimated.swift#L95