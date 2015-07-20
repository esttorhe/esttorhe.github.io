title: Xcode Plugins I use
date: 2015-07-20 11:23:40
tags:
- Xcode
- plugins
- ide
- developer tools
---

# Environments
Everyone of us have our own set of niks & tricks to better find our ways around our everyday activities.

For us developers that means tweaking our environment to quickly achieve what we want with the least amount of key strokes and (at the least for the most of us) without having to actually use the mouse/trackpad.

# `Xcode` Plugins
For those out there that are familiar with plugins; go ahead and jump over to the next section, for the rest of you welcome to heaven.

Plugins are 3rd Party pieces of code that can be «injected» into Xcode's life cycle and can extend its functionalities or even add new ones.

There's plenty of plugins and many different ways to load/install them but my go-to way is always [`Alcatraz`][alcatraz].
<!--more-->

## [Alcatraz][alcatraz]
![](http://alcatraz.io/images/screenshot@2x.png)

From their website:
>Alcatraz is an open-source package manager for Xcode. It lets you discover and install plugins, templates and color schemes without the need for manually cloning or copying files. It installs itself as a part of Xcode and it feels like home.

Think of it as the «AppStore» for `Xcode` Plugins.

You can easily search through a bunch of plugins and with a single click «install» them to your `Xcode` instance to better improve your coding experience.

# My current set
The other day talking with some people on [`CocoaHeads CR`][cocoaheadscr] I was asked if I knew about some good plugins for `Xcode`… and boy… did I 💣💥 the channel with a bunch.

And while doing so I thought about writing a blog post with my current plugin set and why I do have/use them.

Without further ado here's my list of plugins:

| _Plugin Name_ | ![github](github_logo.png)|
|:-----------|:-------------------------:|
|[BBUDebuggerTuckAway](#BBUDebuggerTuckAway) | [Source][BBUDebuggerTuckAway]|
| [RSImageOptimPlugin](#RSImageOptimPlugin) | [Source][RSImageOptimPlugin]|
| [CodePilot](#CodePilot) | [Source][codepilot]|
| [DerivedData Exterminator](#DerivedData_Exterminator)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [Source][ddexterminator]|
| [Polychromatic](#Polychromatic) | [Source][polychromatic]|
| [SCXcodeSwitchExpander](#SCXcodeSwitchExpander) | [Source][switchexpander]|
| [Snapshots](#Snapshots) | [Source][snapshots]|
| [VVDocumenter-Xcode](#VVDocumenter-Xcode) | [Source][vvdocumenter]|
| [XAlign](#XAlign) | [Source][xalign]|
| [XcodeColors](#XcodeColors) | [Source][xcodecolors]|
| [XcodeExplorer](#XcodeExplorer) | [Source][xplorer]|
| [XVim](#XVim) | [Source][xvim]|
| [ColorSense-for-Xcode](#ColorSense-for-Xcode) | [Source][colorsense]|
| [Fuzzy Autocomplete](#Fuzzy_Autocomplete) | [Source][fuzzy]|

---

## BBUDebuggerTuckAway 
![](https://github.com/neonichu/BBUDebuggerTuckAway/raw/master/plugin.gif)

>BBUDebuggerTuckAway - Xcode plugin for auto-hiding the debugger once you start typing in the source code editor.

Pretty self explanatory. Before I started using «behavior» on `Xcode` having to show/hide the debugger between runs and debugging sessions was a PITA and this plugin came in like sent from the heaven.

Now I barely take advantage of it due to the behaviors but is sill on my top 10.

---

## [RSImageOptimPlugin][RSImageOptimPlugin]
![](https://raw.githubusercontent.com/yeahdongcn/RSImageOptimPlugin/master/RSImageOptimPlugin-screenshot@2x.png)
>Xcode plugin to optimize images using [`ImageOptim`][imageoptim].

This plugin allows you to automatically (or manually if you are some sort of caveman… jk) optimize your image assets via [`ImageOptim`][imageoptim] helping you reduce your app's bundle size.

---

## CodePilot
![](https://github.com/macoscope/CodePilot/raw/master/Screenshots/CodePilot_01.png)
>Code Pilot is a plugin for Xcode 5 & 6 that allows you to quickly find files, methods and symbols within your project without the need for your mouse. It uses fuzzy query matching to compute a list of results sorted by their relevancy. With just a few keystrokes you can jump to the method you're looking for.

I don't think there's much to add to the story. Since I started using it, it became a *MAJOR* part of my everyday development.

I can quickly navigate through HUGE codebases without effort or actually thinking about the underlying «groups» structure.

---

## DerivedData Exterminator
![](https://github.com/kattrali/deriveddata-exterminator/raw/master/docs/menu.png)
>Sometimes Xcode needs a friendly helping hand with cleaning out the Derived Data for a project. The Exterminator makes this quick and easy.

We've all been at that point in life where `Xcode` simply decides to stop giving a crap about the compiling and correct construction of our bundles. Compile warnings, pieces of code we have 💥 nuked into oblivion are giving compile errors and some beheviors we have ensured are no longer present in our code are happening when running on the simulator… :/ and who is to blame!?? none other than `Derived Data` folders with stale files…

---

[DerivedData Exterminator][ddexterminator] is a handy plugin that lets you nuke the `Derived Data` folder all to hell 🔥 with the click of a button ![](https://github.com/kattrali/deriveddata-exterminator/raw/master/docs/exterminator.png)

Or via the menu option shown at the top of this section.

I can't stress enough how handy this plugin is to my everyday compiling and debugging activities.

---

## Polychromatic
![](https://camo.githubusercontent.com/116fe74b35b6a719e94b42118b2a531731957cf2/68747470733a2f2f66696c65732e6170702e6e65742f3230776c6e682d44472e706e67)
>Coloring with significance.
>
>Polychromatic is an Xcode plugin that makes code logic clear and apparent. It gives properties, ivars, and local variables each a unique, dynamic color, stripping away emphasis from types which don't need it.

A great plugin for visual identification of scoped pieces of data. With a quick glance you can infer if an «artifact» you are using belongs to the local context or a more global one given its color.

Is no secret that sometimes we call local scoped vars the same name as some global scoped ones; with this plugin you can easily identify which is which (and please as soon as you realize this for the love of Google Christ change the names of the local ones to help differentiation more).

---

## SCXcodeSwitchExpander
![](https://camo.githubusercontent.com/d4ab3ba45af70951557adbf17a9d0deab47e519f/68747470733a2f2f646c2e64726f70626f7875736572636f6e74656e742e636f6d2f752f31323734383230312f534358636f6465537769746368457870616e6465722f534358636f6465537769746368457870616e646572312e676966)
>SCXcodeSwitchExpander is a small Xcode plugin that expands switch statements by inserting missing cases.

Is just so simple to miss some cases when switching over an enumerator or so time consuming to have to go to the `enum` definition and check all possible `case`s or worst; copying the whole `enum` definition, pasting it inside the `switch` and then correctly changing the syntax to match…

Well this is super easy; just write `switch`, insert the var name and hit `Enter` and the plugin will «automagically» generate all possible `cases` for you.

Simple and clean.

On a personal note I haven't been able to test it on `Swift` but for those sad times when I'm writing `Objective-C` its quite handy.

---

## Snapshots
![](https://raw.githubusercontent.com/orta/Snapshots/master/web/screenshot.jpg)
>Features
>
> - Showing new images as they're created
> - Showing the differences between failed snapshot tests
> - Open specific diffs in Kaleidoscope
> - Turns red if you've created a view with a zero frame

If you are not doing [`view testing`][viewtesting] you should definitely check that link out and start adding that to your unit tests.

If you are already doing [`view testing`][viewtesting] then you are in for a treat with this plugin. Directly from `Xcode` you can check which views are failing the tests and even do a live comparison of the recorded and live views to check where's the discrepancy; and if you have [`Kaleidoscope`][kaleidoscope] installed it will generate a «command line» command to open up the `diff` on the app.

---

## VVDocumenter-Xcode
![](https://camo.githubusercontent.com/ca5518c9872e15b8a95b9d8c5f44bc331977d710/68747470733a2f2f7261772e6769746875622e636f6d2f6f6e65766361742f5656446f63756d656e7465722d58636f64652f6d61737465722f53637265656e53686f742e676966)
>…you can find the method (or any code) you want to document to, and type in `///`, the document will be generated for you and all params and return will be extracted into a Javadoc style, which is compatible with [appledoc][appledoc], [Doxygen][doxygen] and [HeaderDoc][headerdoc]. You can just fill the inline placeholder tokens to finish your document.

If you know me you'll know I'm a sucker for internal documentation (more so if they are going to be beautifully rendered in something like [CocoaDocs][cocoadocs]).

This plugin will get you started by bootstrapping a header doc template over functions with placeholders for the parameters and returns as well as description. You only need to type `///` and ⚡ you are ready!

---

## XAlign
![](https://camo.githubusercontent.com/7973c0e352b1f91e3efe5b3550cff5df97f4589a/687474703a2f2f7166692e73682f58416c69676e2f696d616765732f657175616c2e676966)
>An amazing Xcode plugin to align regular code. It can align anything by using custom alignment patterns.

Aside from being a sucker for documentation I have a special place in my ❤ for unit testing and nicely organized code.

Enter [XAlign][xalign] and my `OCD` kicks in allowing me to neatly organize all properties, assignments and whatever I feel like needs alignment.

---

## XcodeColors
>XcodeColors allows you to use colors in the Xcode debugging console.
It's designed to aid in the debugging process.
I use this along with a custom logger with [CocoaLumberjack][cocoalumberjack] to easily know when something being logged into the console is a debugging statement, a warning or even worst!! an error.

Assigning colors to each level is the best way to easily check when something goes eerie on your code.

We tend to `DDLogError` everywhere we «expect» an error from any `API` calls and some `DDLogDebug` here and there while developing (depending on your logging level the only output that will be visible on your production apps will be what you want and nothing more).

---

## XcodeExplorer
>This is a plugin project that allows you, as a developer, to explore the various events and notifications that Xcode4 emits during normal operations.

Since we are talking plugins here; why not have a plugin that helps you build your own plugins?? Meta much?

Well; this plugin is exactly that. It will let you listen and identify different notifications that `Xcode` fires during its normal process; giving you the knowledge to easily intercept something you are interested on and gives you the power to shape it to your own needs.

I have played with this for a plugin I started last year that never got enough time to pour the love it needs to become a real world plugin. Maybe one of this days it will see the light.

---

## XVim
>XVim is a Vim plugin for Xcode. The plugin intends to offer a compelling Vim experience without the need to give up any Xcode features.

Given the fact that I'm a dork and like the «limitations» the `vim` imposes upon you this plugin gives me those but inside `Xcode`; letting my nerd burst without sacrificing the power of a real world `IDE`.

---

## ColorSense-for-Xcode
<iframe width="560" height="315" src="https://www.youtube.com/embed/eblRfDQM0Go" frameborder="0" allowfullscreen></iframe>
>This is where ColorSense comes in: When you put the caret on one of your colors, it automatically shows the actual color as an overlay, and you can even adjust it on-the-fly with the standard Mac OS X color picker.

I guess you can see the benefit of this one.

---

## Fuzzy Autocomplete
![](https://github.com/FuzzyAutocomplete/FuzzyAutocompletePlugin/raw/master/demo.gif)
>This is a Xcode 5+ plugin that patches the autocomplete filter to work the same way the Open Quickly works. It performs very well, and the fuzzy matching actually uses Xcode's own `IDEOpenQuicklyPattern`.

Who doesn't love fuzzy autocomplete when writing code!? ¯\\\_(ツ)_/¯

I know the description says `Xcode 5+` which makes it sound like a dead project but you can check the source and see that is actively developed and also `Xcode 7` is mostly supported so far; even though is still ß.

[alcatraz]:http://alcatraz.io/
[cocoaheadscr]:https://cocoaheadscr.herokuapp.com/
[BBUDebuggerTuckAway]:https://github.com/neonichu/BBUDebuggerTuckAway
[RSImageOptimPlugin]:https://github.com/yeahdongcn/RSImageOptimPlugin
[imageoptim]:https://github.com/pornel/ImageOptim
[codepilot]:https://github.com/macoscope/CodePilot
[ddexterminator]:https://github.com/kattrali/deriveddata-exterminator
[polychromatic]:https://github.com/kolinkrewinkel/Polychromatic
[switchexpander]:https://github.com/stefanceriu/SCXcodeSwitchExpander
[snapshots]:https://github.com/orta/Snapshots
[viewtesting]:https://github.com/facebook/ios-snapshot-test-case
[kaleidoscope]:http://www.kaleidoscopeapp.com/
[vvdocumenter]:https://github.com/onevcat/VVDocumenter-Xcode
[appledoc]:https://github.com/tomaz/appledoc
[doxygen]:http://www.stack.nl/~dimitri/doxygen/
[headerdoc]:https://developer.apple.com/library/mac/documentation/DeveloperTools/Conceptual/HeaderDoc/intro/intro.html
[cocoadocs]:http://cocoadocs.org
[xalign]:https://github.com/qfish/XAlign
[xcodecolors]:https://github.com/robbiehanson/XcodeColors
[cocoalumberjack]:https://github.com/CocoaLumberjack/CocoaLumberjack
[xplorer]:https://github.com/edwardaux/XcodeExplorer
[xvim]:https://github.com/XVimProject/XVim
[colorsense]:https://github.com/omz/ColorSense-for-Xcode
[fuzzy]:https://github.com/FuzzyAutocomplete/FuzzyAutocompletePlugin
