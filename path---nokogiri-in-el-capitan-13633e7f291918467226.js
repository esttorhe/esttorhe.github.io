webpackJsonp([58115304136052],{549:function(e,o){e.exports={data:{site:{siteMetadata:{githubRepo:"https://github.com/esttorhe/esttorhe.github.io",author:"Esteban Torres"}},markdownRemark:{frontmatter:{title:"Nokogiri on El Capitan",issueNumber:23,categories:["tools","dependencies","problem solving"],tags:["nokogiri","gems","el capitan","bug","fix"],author:null,date:"2015-10-02T10:03:51.000Z"},html:'<p>Finally <code>El Capitan</code> arrived and I couldn\'t be more eager to install it on my machine; as soon as I read on Twitter that it was available I jump to the <code>AppStore</code> and started the download process which seemed like a bad idea at the time:</p>\n<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I think downloading «El Capitan» at the same time as the rest of the world was a BAD idea and poor judgement on my part 😂</p> — NSTorres (@esttorhe) <a href="https://twitter.com/esttorhe/status/649289668773715973">September 30, 2015</a></blockquote>\n<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>\n<!--more-->\n<p>Fortunately it only took 1 hour and 30 minutes to download and around 30 minutes to install :/ Which seems like forever.</p>\n<p>With <code>El Capitan</code> now on my computer and ready to keep working I went to my project to install some fancy new <code>pod</code>s of my own.</p>\n<h1 id="my-«work-configuration»"><a href="#my-%C2%ABwork-configuration%C2%BB" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>My «work configuration»</h1>\n<p>The way I use <code>CocoaPods</code> is via <code>bundler</code>. I specify a <code>Gemfile</code> with some <code>CocoaPods</code> plugins and some other gems that I usually use on my day to day coding life and execute everything <code>CocoaPods</code> related with <code>bundle exec</code>. Just like this:</p>\n<pre><code class="language-ruby">bundle exec pod install\n</code></pre>\n<h1 id="enter-nokogiri"><a href="#enter-nokogiri" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Enter <code>nokogiri</code></h1>\n<p>For those of you that don\'t know what <code>Nokogiri</code> is here\'s an excerpt from their page:</p>\n<blockquote>\n<p><strong>Nokogiri</strong> (鋸) is an HTML, XML, SAX, and Reader parser. Among <strong>Nokogiri</strong>\'s many features is the ability to search documents via XPath or CSS3 selectors. XML is like violence - if it doesn\'t solve your problems, you are not using enough of it.</p>\n</blockquote>\n<p>Also if you didn\'t know <code>CocoaPods</code> uses <code>nokogiri</code> as a dependency; this means that, that if you want to «install» <code>CocoaPods</code> you\'ll end up installing <code>nokogiri</code>.</p>\n<h1 id="el-capitan-vs-nokogiri--fight"><a href="#el-capitan-vs-nokogiri--fight" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code>El Capitan</code> vs. <code>nokogiri</code> => Fight!</h1>\n<p>From some time I\'ve been facing the issue where I run:</p>\n<pre><code class="language-ruby">bundle install\n</code></pre>\n<p>And <code>nokogiri</code> fails to build because is missing <code>libxml2</code> path and that I should compile with system frameworks; which normally work, except that this time it completely failed to work and I was there unable to install my gems and/or run them using <code>bundle exec</code> stalling my work.</p>\n<p>After checking the documentation I read that you could specify the path for some libraries, which wasn\'t working for me :/</p>\n<p>I was able to install the gem with <code>gem install</code> but not with <code>bundler</code>.</p>\n<p>It didn\'t took long for me to find a question on <code>StackOverflow</code> that addressed the same issue but for different versions of <code>nokogiri</code> and <code>Xcode</code> and it was just a matter of putting <code>2 + 2</code> together and finally my <code>bundle install</code> was successfully installing <code>CocoaPods</code> with <code>nokogiri</code> as a dependency.</p>\n<p>Behold the «magic» command:</p>\n<pre><code class="language-ruby">bundle config build.nokogiri --use-system-libraries=true --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.11.sdk/usr/include/libxml2\n</code></pre>\n<p>You can see that all it\'s doing is specifying that <code>nokogiri</code> builds using system libraries and is also telling the full path for <code>libxml2</code> under <code>Xcode</code>\'s content folder.</p>\n<h1 id="disclaimer"><a href="#disclaimer" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Disclaimer</h1>\n<p>I honestly don\'t know if this is something that happens solely on <code>El Capitan</code>; I\'m guessing «no» and that this fix should work with any instance of <code>OS X</code> as long as you have <code>Xcode</code>, else you\'ll have to specify a different path for your <code>libxml2</code>.</p>',url:"Nokogiri-in-El-Capitan"}},pathContext:{id:"/home/travis/build/esttorhe/esttorhe.github.io/content/_posts/2015-10-02-Nokogiri-in-El-Capitan.markdown absPath of file >>> MarkdownRemark"}}}});
//# sourceMappingURL=path---nokogiri-in-el-capitan-13633e7f291918467226.js.map