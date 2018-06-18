webpackJsonp([0x77287c926fa3],{551:function(e,t){e.exports={data:{site:{siteMetadata:{githubRepo:"https://github.com/esttorhe/esttorhe.github.io",author:"Esteban Torres"}},markdownRemark:{frontmatter:{title:"Semver intermediate versioning",issueNumber:20,categories:["tips","productivity"],tags:["tips","programming","semver","versioning"],author:null,date:"2015-08-11T14:07:36.000Z"},html:'<p>Lately I\'ve come across multiple tweets and talks about people avoiding jumping over the dreaded <code>1.0.0</code> of their <code>frameworks</code>, tools, etc.</p>\n<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">If semver defined some simple criteria for what constitutes a 1.x release would that help alleviate the fear?</p>&mdash; Colin Eberhardt (@ColinEberhardt) <a href="https://twitter.com/ColinEberhardt/status/631152832490643457">August 11, 2015</a></blockquote>\n<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>\n<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Why do so many open source projects fear making a 1.x releases? My projects depend on numerous 0.x versions - should that worry me!</p>– Colin Eberhardt (@ColinEberhardt) <a href="https://twitter.com/ColinEberhardt/status/631152342826663936">August 11, 2015</a></blockquote>\n<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>\n<hr>\n<p>Sadly that\'s the current state of «our world» as developers.</p>\n<!--more-->\n<h2 id="what-is-semver"><a href="#what-is-semver" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>What is <code>semver</code>?</h2>\n<p><a href="http://semver.org/">semver</a> stands for <code>Semantic Versioning</code>; here\'s a excerpt from the website:</p>\n<pre><code class="language-,">Given a version number MAJOR.MINOR.PATCH, increment the:\n\nMAJOR version when you make incompatible API changes,\nMINOR version when you add functionality in a backwards-compatible manner, and\nPATCH version when you make backwards-compatible bug fixes.\nAdditional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.\n</code></pre>\n<p>As you can see <a href="http://semver.org/">semver</a> specifies a series of numbers (3) to correctly determine the versions of your frameworks.</p>\n<p>Notice that its based off <code>MAJOR</code>.<code>MINOR</code>.<code>PATCH</code> where <code>MAJOR</code> should change when you introduce breaking changes (make incompatible changes to the <code>API</code> basically).</p>\n<h2 id="what-i-propose-"><a href="#what-i-propose-" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>What I propose! 🎉</h2>\n<p>Given the fact that most package managers work using <a href="http://semver.org/">semver</a> as their «tagging» base and that most «consumers» of your work will most likely update to whichever version you release as long as is not <code>MAJOR</code> without having to do much refactoring (e.g. using <a href="https://cocoapods.org">CocoaPods</a> you can specify something like <code>~> 1.5</code> which roughly translates to => «update to every new version above 1.5 as long as its &#x3C; 2.0.0»)</p>\n<p>I propose that everyone maintaining public facing frameworks should support an «intermediate» version right before their <code>MAJOR</code> release.</p>\n<h3 id="why"><a href="#why" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Why?</h3>\n<p>Simply put most modern languages let us mark methods as deprecated; and depending on the language and the compiling flags we can treat this as <code>warnings</code> ⚠ or <code>errors</code> ⛔ and the compiler will shout at us when a method is marked as deprecated.</p>\n<p>I\'m proposing we should release a <code>MINOR</code> or <code>PATCH</code> release right before the <code>MAJOR</code> marking all the methods that will either disappear or change drastically on the next <code>MAJOR</code> release. This way the consumers will get a warning on their latest automated update and will be prepared what will change on the next <code>MAJOR</code>.</p>\n<p>With this they can know what to expect instead of trying to update to the latest <code>MAJOR</code> and facing a bunch of breaking changes.</p>\n<p>To me this seems like a more «friendly» way to alert consumers of what will definitely change/break; also having the compiler warnings there will help some consumers be prepared and start thinking about how to use the new methods BEFORE even having to actually start work to support the latest version of your frameworks.</p>\n<h2 id=""><a href="#" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>👋</h2>\n<p>And that\'s it; nothing too fancy or too techie but worth a blog post and maybe let the ball rolling.</p>\n<p>Perhaps someone else will share this vision of things and consumers will start getting «warning» releases before every <code>MAJOR</code> one.</p>',url:"Semver-intermediate-versioning"}},pathContext:{id:"/home/travis/build/esttorhe/esttorhe.github.io/content/_posts/2015-08-11-Semver-intermediate-versioning.markdown absPath of file >>> MarkdownRemark"}}}});
//# sourceMappingURL=path---semver-intermediate-versioning-baa3e7a42c7898a23371.js.map