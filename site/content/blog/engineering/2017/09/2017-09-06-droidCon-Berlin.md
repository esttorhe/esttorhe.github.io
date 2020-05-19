---
title: droidCon Berlin
type: post
date: 2017-09-06 08:55:10
tags:
- droidcon
- android
- berlin
categories:
- conferences
issueNumber: 29
---

# #iOSGutAtDroidcon
Last week fellow speaker and good friend Jorge Ortiz-Fuentes[^1] wrote me on `Twitter` to tell me he had an extra ticket for `droidcon` Berlin[^2] since he'll be speaking (Now, as you might know I do `iOS` and know close to **NOTHING** about `Android` development) and since I have always been curious about `Android` development I said _YES_ and embarked on what would be my first ever **droidCon**.

<!--more-->

As many other conferences it started with a party on Saturday (which I missed) and then on Sunday they opened for badge pickups and workshops (I thought about attending but then figured out that I wouldn't be doing much given my lack of knowledge in the topic, and perhaps I would have been taking the spot from someone that might get more benefit out of it; so I passed) which I didn't attend and thus I «skipped» the «1st» day of the conference.

## Kick-off!
Monday came and I jumped on the `S42` and then on to the `S5` (this place turned out to be fairly far away from my place) and after 35-45 minutes I reached `CityCube` Berlin[^3].

The keynote was more of a «soft» talk than a technical one and because of that there were a lot of parallels and interesting points exposed by Chiu-Ki Chan[^4] that could easily be applied to `iOS` and any other «community» for that matter.

## Failing but keep trying
Once the keynote was done I tried to attend a talk about `Google`'s new persistence framework `Room`[^5] by Florina Muntunescu[^6]; sadly almost everybody else had the same idea and I couldn't get past the door.

Instead got to listen to Marco Cova[^7] from `Facebook` explain with many details how their scale is insane and how their problems are usually non-documented and they end up being the first to actually deal and solve them (like the `DEX` file[^8] limit problem for example).

## Learning about `Dagger` 2
Garima Jain[^9] talked about the new and shiny `Dagger` 2 as a resource to help overcome the dependency injection hell and how this version differs from the 1st incarnation of it.
Unfortunately for me, although the topic was **SUPER** interesting, I felt it was too knee-deep for someone with **_ZERO_** knowledge of `Android` development, and thus, couldn't follow all the nitty-gritty benefits; but the gist of it sounded like a really useful and interesting tool.

## Day 1; coming to an end
As the day drew to an end, Xavier F. Gouchet[^10] talked about an interesting topic (at least really interesting to me) regarding how test coverage doesn't necessarily means you are really testing your code appropiately (or even covering correctly your cases). 
He presented a «tool» (specifically a `Gradle` plugin[^11]) that «mutates» sentences in your code (not your source code) to verify that variation in the sentences are actually catched in your tests; simply put, you «test your tests» by changing different operations (sentences) and verifying that your tests are actually detecting; if not then a «mutation» is flagged and you then can properly add a test to cover this scenario.
With this approach you can be sure that your tests are properly testing all possible paths and variations.
To me this was a really interesting talk, probably my favorite of the whole conference.

## Day 2; here we go again
The next day had one of the talks I was really interested in attending, `Kotlin` Coroutines by Svetlana Isakova[^12].
I've been hearing so much about `Kotlin` that I wanted to finally see some of its power.
`Coroutines` (at least from what I grasped during this talk) could somehow have a parallelism with `NSBlockOperations`[^13].
Not 100% equivalence but they do have some sort of mechanism to «dispatch» them, they do have some sort of «suspend» mechanism (which actually sets the entry point for a function to be «suspended» and not halting the executing of the app) and get to deliver results at their own times.

## Or maybe not…
Even though the day was beginning I couldn't find a talk that catched my attention (if you keep in mind that I was selecting them based solely on the small description and most of them didn't even begin to make sense to me) I went to roam around the booths and also visited the `IFA`[^14] where I got to see some pretty interesting appliances, tried `Samsung`'s `VR` system and collected an insane amount of freebies that everyone was giving away.

## Thoughts?
From my experience (and that of some of other attendeeds I talked with) there is some room for improvement regarding the organization of the conference.
Some quick rundown of the ones I can remember
1. Some of the rooms felt totally disconnected from the conference
2. The Q&A after each session was not properly handled and due to the «multi track» style of the conference most attendees got up and started leaving while the questions were being asked and the speakers were answering; to me this feels a little bit disrespecful to the speaker and even to the people asking questions
3. Sharing space and time with `IFA`. Even though it was nice for me because I could disconnect every now and then and relax from a conference related to something I don't do this caused a lot of «noise», lots of people not related to the conference coming and going through `droidCon` (literally walking through it) which felt weird; also this might have been detrimental to the attendance of some talks (I noticed a few attendees leaving `droidCon` to visit `IFA`)

All in all I enjoyed `droidCon` Berlin, and who knows; might not be my last.
I have plans of start dabbling a little on `Kotlin` so perhaps this is the perfect excuse and initial push for me.

[^1]: https://twitter.com/jdortiz
[^2]: http://droidcon.de/en/program/schedule
[^3]: http://www.messe-berlin.de/de/Veranstalter/UnsereLocations/CityCubeBerlin/
[^4]: http://blog.sqisland.com/
[^5]: https://developer.android.com/topic/libraries/architecture/room.html
[^6]: https://medium.com/@florina.muntenescu
[^7]: http://droidcon.de/en/users/marco-cova#profile-speaker
[^8]: https://developer.android.com/studio/build/multidex.html
[^9]: https://medium.com/@ragdroid
[^10]: https://twitter.com/xgouchet
[^11]: https://docs.gradle.org/current/userguide/plugins.html
[^12]: http://droidcon.de/en/%40sveta_isakova
[^13]: https://developer.apple.com/documentation/foundation/blockoperation
[^14]: http://b2b.ifa-berlin.com/
