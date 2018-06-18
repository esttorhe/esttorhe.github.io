webpackJsonp([0xa5c9cc501149],{554:function(t,e){t.exports={data:{site:{siteMetadata:{githubRepo:"https://github.com/esttorhe/esttorhe.github.io",author:"Esteban Torres"}},markdownRemark:{frontmatter:{title:"Swift 2.0 - throws tip",issueNumber:36,categories:["tips","swift"],tags:["swift2","swift","cocoa","tips"],author:"Esteban Torres",date:"2015-06-14 17:39:51 +0000"},html:'<h1 id="quick-swift-20-throws-tip"><a href="#quick-swift-20-throws-tip" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Quick <code>Swift 2.0</code> <code>throws</code> tip:</h1>\n<p>There\'s been <strong><em>a lot</em></strong> of «heated» debates regarding the <code>throws</code> approach added to <code>Swift 2.0</code> in favor of <code>Either&#x3C;T,U></code>.</p>\n<hr>\n<p>Some examples:</p>\n<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/cocoaphony">@cocoaphony</a> Throws types were explicitly but hand-wavily pooh-poohed in the What&#39;s New in Swift talk :/</p>&mdash; Tom Brow (@browgrammer) <a href="https://twitter.com/browgrammer/status/609841773284724737">June 13, 2015</a></blockquote>\n<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>\n<!-- more -->\n<hr>\n<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Swift exceptions compose poorly. You can’t determine concrete ErrorType from a closure that throws, and can’t throw/catch asynchronously.</p>&mdash; Justin Spahr-Summers (@jspahrsummers) <a href="https://twitter.com/jspahrsummers/status/608066730250924032">June 9, 2015</a></blockquote>\n<h2 id="script-async-srchttpplatformtwittercomwidgetsjs-charsetutf-8script"><a href="#script-async-srchttpplatformtwittercomwidgetsjs-charsetutf-8script" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script></h2>\n<p>That being said, I\'m not going to convince you to use it or avoid it. That\'s entirely up to you, the app / framework you are working on and wether or not you need to do async calls with <code>throws</code> (which is a «fun» thing to accomplish).</p>\n<br/>\n<p>If you end up using the <code>throws</code> approach though there\'s a big issue along the lines of «What is this function supposed to <code>throw</code> at me?»</p>\n<p>And while this tip won\'t «solve» the issue at compile time is sure a nice way to «notify» the consumers of your <code>API</code> somehow.</p>\n<p>My approach so far was to add the following to the header of the apple doc of my functions:</p>\n<pre><code class="language-swift">  /**\n  Do something nice here.\n\n  - parameter dragon: 🐉\n\n  - returns: A rainbow 🌈\n\n  - throws `CustomError`: Thrown when a unicorn is born.\n  */\n  public func winTheInternet(dragon: Dragon) throws -> Rainbow { …\n</code></pre>\n<p>This will turn into something like this:</p>\n<p><img src="/2015-06-14-swift-2-dot-0-throws-tip/swif2_throws_documentation.png"></p>\n<h2 id="take-away"><a href="#take-away" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Take away</h2>\n<p>As you can see this is not a «perfect» solution but is at least a great way of providing documentation for your callers as part of your internal documentation.</p>\n<p>Happy documentation! 😉</p>',url:"swift-2-dot-0-throws-tip"}},pathContext:{id:"/home/travis/build/esttorhe/esttorhe.github.io/content/_posts/2015-06-14-swift-2-dot-0-throws-tip/2015-06-14-swift-2-dot-0-throws-tip.markdown absPath of file >>> MarkdownRemark"}}}});
//# sourceMappingURL=path---swift-2-dot-0-throws-tip-d76e2ace456656f447fc.js.map