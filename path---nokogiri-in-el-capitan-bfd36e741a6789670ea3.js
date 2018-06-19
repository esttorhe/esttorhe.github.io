webpackJsonp([58115304136052],{550:function(e,a){e.exports={data:{site:{siteMetadata:{githubRepo:"https://github.com/esttorhe/esttorhe.github.io",author:"Esteban Torres"}},markdownRemark:{frontmatter:{title:"Nokogiri on El Capitan",issueNumber:23,categories:["tools","dependencies","problem solving"],tags:["nokogiri","gems","el capitan","bug","fix"],author:null,date:"2015-10-02T10:03:51.000Z"},html:'<p>Finally <code class="language-text">El Capitan</code> arrived and I couldn\'t be more eager to install it on my machine; as soon as I read on Twitter that it was available I jump to the <code class="language-text">AppStore</code> and started the download process which seemed like a bad idea at the time:</p>\n<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I think downloading «El Capitan» at the same time as the rest of the world was a BAD idea and poor judgement on my part 😂</p> — NSTorres (@esttorhe) <a href="https://twitter.com/esttorhe/status/649289668773715973">September 30, 2015</a></blockquote>\n<script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>\n<!--more-->\n<p>Fortunately it only took 1 hour and 30 minutes to download and around 30 minutes to install :/ Which seems like forever.</p>\n<p>With <code class="language-text">El Capitan</code> now on my computer and ready to keep working I went to my project to install some fancy new <code class="language-text">pod</code>s of my own.</p>\n<h1 id="my-«work-configuration»"><a href="#my-%C2%ABwork-configuration%C2%BB" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>My «work configuration»</h1>\n<p>The way I use <code class="language-text">CocoaPods</code> is via <code class="language-text">bundler</code>. I specify a <code class="language-text">Gemfile</code> with some <code class="language-text">CocoaPods</code> plugins and some other gems that I usually use on my day to day coding life and execute everything <code class="language-text">CocoaPods</code> related with <code class="language-text">bundle exec</code>. Just like this:</p>\n<div class="gatsby-highlight" data-language="ruby">\n      <pre class="language-ruby"><code class="language-ruby">bundle exec pod install</code></pre>\n      </div>\n<h1 id="enter-nokogiri"><a href="#enter-nokogiri" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Enter <code class="language-text">nokogiri</code></h1>\n<p>For those of you that don\'t know what <code class="language-text">Nokogiri</code> is here\'s an excerpt from their page:</p>\n<blockquote>\n<p><strong>Nokogiri</strong> (鋸) is an HTML, XML, SAX, and Reader parser. Among <strong>Nokogiri</strong>\'s many features is the ability to search documents via XPath or CSS3 selectors. XML is like violence - if it doesn\'t solve your problems, you are not using enough of it.</p>\n</blockquote>\n<p>Also if you didn\'t know <code class="language-text">CocoaPods</code> uses <code class="language-text">nokogiri</code> as a dependency; this means that, that if you want to «install» <code class="language-text">CocoaPods</code> you\'ll end up installing <code class="language-text">nokogiri</code>.</p>\n<h1 id="el-capitan-vs-nokogiri--fight"><a href="#el-capitan-vs-nokogiri--fight" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">El Capitan</code> vs. <code class="language-text">nokogiri</code> => Fight!</h1>\n<p>From some time I\'ve been facing the issue where I run:</p>\n<div class="gatsby-highlight" data-language="ruby">\n      <pre class="language-ruby"><code class="language-ruby">bundle install</code></pre>\n      </div>\n<p>And <code class="language-text">nokogiri</code> fails to build because is missing <code class="language-text">libxml2</code> path and that I should compile with system frameworks; which normally work, except that this time it completely failed to work and I was there unable to install my gems and/or run them using <code class="language-text">bundle exec</code> stalling my work.</p>\n<p>After checking the documentation I read that you could specify the path for some libraries, which wasn\'t working for me :/</p>\n<p>I was able to install the gem with <code class="language-text">gem install</code> but not with <code class="language-text">bundler</code>.</p>\n<p>It didn\'t took long for me to find a question on <code class="language-text">StackOverflow</code> that addressed the same issue but for different versions of <code class="language-text">nokogiri</code> and <code class="language-text">Xcode</code> and it was just a matter of putting <code class="language-text">2 + 2</code> together and finally my <code class="language-text">bundle install</code> was successfully installing <code class="language-text">CocoaPods</code> with <code class="language-text">nokogiri</code> as a dependency.</p>\n<p>Behold the «magic» command:</p>\n<div class="gatsby-highlight" data-language="ruby">\n      <pre class="language-ruby"><code class="language-ruby">bundle config build<span class="token punctuation">.</span>nokogiri <span class="token operator">--</span>use<span class="token operator">-</span>system<span class="token operator">-</span>libraries<span class="token operator">=</span><span class="token keyword">true</span> <span class="token operator">--</span>with<span class="token operator">-</span>xml2<span class="token operator">-</span>include<span class="token operator">=</span><span class="token operator">/</span><span class="token constant">Applications</span><span class="token operator">/</span><span class="token constant">Xcode</span><span class="token punctuation">.</span>app<span class="token operator">/</span><span class="token constant">Contents</span><span class="token operator">/</span><span class="token constant">Developer</span><span class="token operator">/</span><span class="token constant">Platforms</span><span class="token operator">/</span><span class="token constant">MacOSX</span><span class="token punctuation">.</span>platform<span class="token operator">/</span><span class="token constant">Developer</span><span class="token operator">/</span><span class="token constant">SDKs</span><span class="token operator">/</span><span class="token constant">MacOSX10</span><span class="token number">.11</span><span class="token punctuation">.</span>sdk<span class="token operator">/</span>usr<span class="token operator">/</span>include<span class="token operator">/</span>libxml2</code></pre>\n      </div>\n<p>You can see that all it\'s doing is specifying that <code class="language-text">nokogiri</code> builds using system libraries and is also telling the full path for <code class="language-text">libxml2</code> under <code class="language-text">Xcode</code>\'s content folder.</p>\n<h1 id="disclaimer"><a href="#disclaimer" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Disclaimer</h1>\n<p>I honestly don\'t know if this is something that happens solely on <code class="language-text">El Capitan</code>; I\'m guessing «no» and that this fix should work with any instance of <code class="language-text">OS X</code> as long as you have <code class="language-text">Xcode</code>, else you\'ll have to specify a different path for your <code class="language-text">libxml2</code>.</p>',url:"Nokogiri-in-El-Capitan"}},pathContext:{id:"/home/travis/build/esttorhe/esttorhe.github.io/content/_posts/2015-10-02-Nokogiri-in-El-Capitan.markdown absPath of file >>> MarkdownRemark"}}}});
//# sourceMappingURL=path---nokogiri-in-el-capitan-bfd36e741a6789670ea3.js.map