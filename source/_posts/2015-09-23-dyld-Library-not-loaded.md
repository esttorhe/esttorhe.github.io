title: 'dyld: Library not loaded'
date: 2015-09-23 15:14:17
categories:
- cocoapods
- tools
- errors
tags: 
- swift2
- cocoapods
- rpath
- error
author: Esteban Torres

---

This morning I woke up to a not so great ✉ from a `PR` I submitted the day before; it read something like this:
> I can build in the simulator perfectly fine but trying to get a build onto a device this morning was not happening at all

And with that I started my day trying to figure out what was going on.

<!--more-->

# The culprit

It wasn't hard to determine what was the issue given that the console was spitting the following message:
```console
dyld: Library not loaded: @rpath/AFNetworking.framework/AFNetworking
  Referenced from: /var/mobile/Containers/Bundle/Application/6C4D36F9-6481-434C-8713-18EC38A0FBF6/<appname>.app/<appname>
  Reason: image not found
(lldb) 
```

It was pretty straight forward, `@rpath` was borked.

## `@rpath` errors

If you've had the delight of actually play around with `Swift` and `Dyanmic Frameworks` you've more than likely came across at least one `@rpath` error.

What this means basically is that either your runtime path(s) are borked or that your frameworks are not getting copied/embedded into the `Frameworks` «section» of your application (let's leave it like this for simplicity's sake).

# «Fixing» the issue

![](http://i0.kym-cdn.com/photos/images/newsfeed/000/962/640/658.png)

I went on to check the runtime paths and sure as hell everything was correct, without much to worry about I turned to check if my frameworks were being copied/embedded to their respective places and sure they were…

I was starting to worry and also running out of ideas so I decided to check my `CocoaPods` definition and I noticied a couple of things with how the `Podfile` was structured.

I decided that this was a chance as good as any to refactor the `Podfile` and also fix the issue. And with this in mind I separated the pods by `target` and also created some «shared pods» definition; added some `:exlusive => true` decorations here and there and voilá!! I was ready for the test.

```ruby
pod install
```

Compile and 💥 … did not work…

# Turning to almighty and wise internet

After *successfully* failling at fixing the issue I turned to old and wise internet just to bump my head against a wall multiple times…

![](http://rs1322.pbsrc.com/albums/u572/SpamMe06/headbang_zps2ac29901.gif~c200)

# Pre, During and Post Frustration

Closing to 7 or so hours I decided to do what I think I should have done from the beginning… created a new empty project; bare bones with only the `Podfile` being an exact replica of the failing project.

```console
pod install
```

And lo and behold… the project compiles and runs on my device as expected…

That was equal parts promising and infuriating… Since I didn't want to move everything to a new clean project (and more so I shouldn't need to do that) I decided to check for differences between `@rpath` in both projects.

After some time both projects looked the same and I even added some «missing» build phases (run scripts from `CocoaPods`) to my original project and some missing header paths.

Everything was looking nice 🌅… until I decided to run on my device and faced the same issue…

# Solution

After checking the error it looked like the same but slightly different… so minuscule that it was actually key to find the answer…

The current error was the following:
```console
dyld: Library not loaded: @rpath/Pods.framework/Pods
```

While in theory it was the same; it actually conveyed a totally different meaning.

Looking at `CocoaPods` issues I came accross [this one][cocoapodsissue] that suggest the following:
>Okay, fixed. The issue was the Pods.framework was set to required and not optional. It wasn't being copied to device by the .sh script and so the app crashed. Setting this to optional fixed the issue.
>![https://cloud.githubusercontent.com/assets/1169297/7726958/9156c376-fefd-11e4-90c8-2412f67f52c2.png](https://cloud.githubusercontent.com/assets/1169297/7726958/9156c376-fefd-11e4-90c8-2412f67f52c2.png)

Withouth giving it much thought I went to my original project… marked `Pods.framework` as «Optional»… compile… run… 🎉

The application was running smoothly on my 📱…

# Take Aways

This issue turned out to be a terrible waste of time but also helped me rearrange my list of steps to follow when debugging errors that should be «obvious» from experience.

If after failing to due what experience tolds me is the answer; try to replicate the issue on a clean slate (or as clean as possible).

If you succeed in reproducing you are unto something new; if not then your project is borked and you now have a clean and functional project to compare and take bits from here and there.

🙇

[cocoapodsissue]:https://github.com/CocoaPods/CocoaPods/issues/3586
