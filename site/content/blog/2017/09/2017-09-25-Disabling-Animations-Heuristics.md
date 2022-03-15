---
title: Disabling Animations Heuristics
type: post
date: 2017-09-25 13:19:44
tags:
- animations
- heuristics
- strategies
- performance 
categories:
- iOS Engineering
- Engineering
issueNumber: 30
---

Checking `Twitter` the other day I stumble this tweets from [Sash Zats][sash] addressing some heuristics for enabling/disabling intensive animations in `iOS` apps:

---

{{< tweet 910125012157214721 >}}

<!--more-->

{{< tweet 910125072764960773 >}}

{{< tweet 910125128385650694 >}}

{{< tweet 910125225622224896 >}}

---

That definitely resonated in me and made me realised with horror that I have never «bothered» to even consider any of this things before performing intensive blocks of animation.

Below on the thread [Marin Todorov][marin] provided a link to this checks added to `RxAnimated` (Here's the link to the specific line of code: [shouldDisableAnimationsViaDefaultHeuristics][code]).

{{< github RxSwiftCommunity RxAnimated ac3e33 >}}

---

From now on this is something that I'll definitely be doing on my apps and would probably keep updating it as more I find more heuristics to be applied to this check.
_Edit: There isn't much to this blog post other than drawing attention to the heuristics and hopefully raising awareness so more developers start to use them._

[sash]:https://twitter.com/zats
[marin]:https://twitter.com/icanzilb
[code]:https://github.com/RxSwiftCommunity/RxAnimated/blob/master/RxAnimated/Core/RxAnimated.swift#L95
