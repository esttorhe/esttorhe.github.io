---
title: "Safari Bar Selection Jittering"
date: 2021-02-09T15:09:04Z
aliases: ["post", "management"]
type: post
tags: ["engineering", "code"]
draft: true
---

Some time ago I decided to drink `Apple`'s Kool-Aid and jumped over `Safari` as my default browser. Once that `Apple` granted access to the internals of `Safari` for third parties to provide blocking mechanisms the experience was great and I did not regret it (ok; I'm lying… I was missing a few things… but nothing major).
Due to work I had to switch over to a `Chrome` based browser and opted for `Brave` and that was the end of it… but NOW that we also have translations natively in `Safari` I decided I would leverage both browsers since I never left `Safari` on Mobile.

Fast forward a couple of weeks and I'm happy with `Safari` for the most part… except that I do have multiple email accounts with the same provider (because of reasons) and when typing `mail` on my search bar and getting a few hittings; hitting the downwards arrow to get to the one I wanted and seeing the selection jump last minute to the top started to get on my nerves…

<!--more-->

If you have been there I don't think you are alone. I quickly jumped and started a search on my "Search Engine" of choice and got some interesting hits but none were providing a solution… until I noticed something in `Safari`'s search preferences.

![Safari Search preferences pane with "Preload Top Hit in the background" hightlighted and checked](/assets/images/post/2021/02/safari-tips/safari-search-preferences.png)

As you can see the option to "Preload Top Hit in the background" is checked. If you don't know what this does (it is pretty self explanatory, but just in case) it means that whenever you start typing something on `Safari`'s search bar, internally it will start figuring out matches based on your history and your "Search Engine" and some `Safari` suggestions (if you have those preferences enabled); it will debounce as you type but whenever you stop to catch a break `Safari` will work it's algorithm and will try to anticipate what you will click, it is trusting that they will offer you the best match on top and therefore will start preloading the 1st hit in the background so by the time you click on it the load will look instantenous.

For the majority of use cases this is great… unless like me… you have 2 different options under the same domain. In this case `Safari` will predict that I do want to load my email website; but if start to move the selection to a lower result it will preload the 1st hit (and this is assumption on my end) when it signals that it finished reloading the search bar will reposition the selection to the top… which in the end could cause you to either hit enter on the top result by mistake or actualy slow you even more than having to wait for the website to load as you have to properly wait until it has cached the first hit in order to properly select your desired option.

# TL;DR

If you are experiencing a jittering or jumping behaviour in `Safari` when attempting to pick a suggestion from the URL bar; disiable "Preload Top Hit in the background" and enjoy a jumping-free navigation.