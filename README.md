[![Build Status](https://travis-ci.org/esttorhe/esttorhe.github.io.svg?branch=source)](https://travis-ci.org/esttorhe/esttorhe.github.io)

# esttorhe.github.io
This is the source code for my [`Gatsby`][gatsby] powered static website https://estebantorr.es

## `Rakefile`

The [`Gatsby`][gatsby] tool is wrapped in a `Rakefile`.

To see all the list of tasks available run:
```sh
bundle exec rake --tasks
```

Or in case you didn't install the gems using `bundler`:
```sh
rake --tasks
```

### `Rake` tasks

| Task  | Description  |
| :--- | :---------- |
| rake build              | # Build site locally |
| rake build:test         | # Builds, then tests |
| rake clean              | # Cleans the locally generated pages |
| rake config:bootstrap   | # Initial setup |
| rake config:environment | # Configures the variables and «seds» the modules |
| rake deploy:production  | # Deployment to production |
| rake deploy:travis      | # Deploy if Travis environment variables are set correctly |
| rake publish:production | # Build and deploy to production |
| rake server             | # Start gatsby server |
| rake test               | # Runs html-proofer against current `build` directory (./public) |


# Inspiration

I mostly followed the blogpost [Migrating My Blog From Hexo To Gatsby][migrating] from [Ian Sinnott][iansinnot] since the previous incarnation of my blog was written using [`Hexo`][hexo].

I also wanted to get rid of `Disqus` for comments and wanted to migrate them to `Github` for quite a while now.
For that I followed this blogpost [Using GitHub Issues for Blog Comments][migrate_comments] from [Orta Therox][orta] and also grabbed bits of inspiration (and some code) from [Pedro's Blog][pepi] ([here's][pepi_repo] his repository).

## Acknowledgements

- Here's [Pedro][pepi]'s `LICENSE`:
<iframe src="https://github.com/pepibumur/pepibumur.github.io/blob/master/LICENSE"></iframe>

- And here's [Ian][iansinnot]'s `LICENSE`:
<iframe src="https://github.com/iansinnott/iansinnott.github.io/blob/source/LICENSE"></iframe>

[gatsby]:https://gatsby.org
[migrating]:https://www.gatsbyjs.org/blog/2017-10-01-migrating-my-blog-from-hexo-to-gatsby/
[iansinnot]:https://www.iansinnott.com
[hexo]:https://hexo.io/
[migrate_comments]:http://artsy.github.io/blog/2017/07/15/Comments-are-on/
[orta]:http://orta.io/
[pepi]:https://ppinera.es/
[pepi_repo]:https://github.com/pepibumur/pepibumur.github.io