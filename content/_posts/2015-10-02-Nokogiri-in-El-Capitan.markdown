---
title: Nokogiri on El Capitan
date: 2015-10-02 10:03:51
tags:
- nokogiri
- gems
- el capitan
- bug
- fix
categories:
- tools
- dependencies
- problem solving

---

Finally `El Capitan` arrived and I couldn't be more eager to install it on my machine; as soon as I read on Twitter that it was available I jump to the `AppStore` and started the download process which seemed like a bad idea at the time:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I think downloading «El Capitan» at the same time as the rest of the world was a BAD idea and poor judgement on my part 😂</p> — NSTorres (@esttorhe) <a href="https://twitter.com/esttorhe/status/649289668773715973">September 30, 2015</a></blockquote>

<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--more-->

Fortunately it only took 1 hour and 30 minutes to download and around 30 minutes to install :/ Which seems like forever.

With `El Capitan` now on my computer and ready to keep working I went to my project to install some fancy new `pod`s of my own.

# My «work configuration»

The way I use `CocoaPods` is via `bundler`. I specify a `Gemfile` with some `CocoaPods` plugins and some other gems that I usually use on my day to day coding life and execute everything `CocoaPods` related with `bundle exec`. Just like this:

```ruby
bundle exec pod install
```

# Enter `nokogiri`

For those of you that don't know what `Nokogiri` is here's an excerpt from their page:

>**Nokogiri** (鋸) is an HTML, XML, SAX, and Reader parser. Among **Nokogiri**'s many features is the ability to search documents via XPath or CSS3 selectors. XML is like violence - if it doesn't solve your problems, you are not using enough of it.

Also if you didn't know `CocoaPods` uses `nokogiri` as a dependency; this means that, that if you want to «install» `CocoaPods` you'll end up installing `nokogiri`.

# `El Capitan` vs. `nokogiri` => Fight!

From some time I've been facing the issue where I run:

```ruby
bundle install
```

And `nokogiri` fails to build because is missing `libxml2` path and that I should compile with system frameworks; which normally work, except that this time it completely failed to work and I was there unable to install my gems and/or run them using `bundle exec` stalling my work.

After checking the documentation I read that you could specify the path for some libraries, which wasn't working for me :/

I was able to install the gem with `gem install` but not with `bundler`.

It didn't took long for me to find a question on `StackOverflow` that addressed the same issue but for different versions of `nokogiri` and `Xcode` and it was just a matter of putting `2 + 2` together and finally my `bundle install` was successfully installing `CocoaPods` with `nokogiri` as a dependency.

Behold the «magic» command:

```ruby
bundle config build.nokogiri --use-system-libraries=true --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.11.sdk/usr/include/libxml2
```

You can see that all it's doing is specifying that `nokogiri` builds using system libraries and is also telling the full path for `libxml2` under `Xcode`'s content folder.

# Disclaimer

I honestly don't know if this is something that happens solely on `El Capitan`; I'm guessing «no» and that this fix should work with any instance of `OS X` as long as you have `Xcode`, else you'll have to specify a different path for your `libxml2`.
