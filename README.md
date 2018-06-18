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

[gatsby]:https://gatsby.org