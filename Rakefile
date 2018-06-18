require 'rubygems'
require 'bundler/setup'
require 'rake'
require 'httparty'
require 'json'

namespace :config do
  desc "Initial setup"
  task :bootstrap do
    puts 'Installing dependencies...'
    sh 'npm -g install npm@latest'
    sh 'npm install'
    sh 'pip install --user s3cmd'
    sh 's3cmd --version'
  end

  desc "Configures the variables and «seds» the modules"
  task :environment do
    sh 'git config --global user.name \'Esteban Torres via Travis CI\''
    sh 'git config --global user.email \'me@estebantorr.es\''
    sh 'git remote set-url origin "https://${GH_TOKEN}:x-oauth-basic@github.com/esttorhe/esttorhe.github.io.git"'
  end
end

namespace :deploy do
  desc "Deployment to production"
  task :production do
    sh 'node_modules/.bin/hexo deploy --silent'
  end

  desc "Deployment to staging"
  task :staging do
    # Deploy to staging once the staging endpoint is up
  end

  desc "Deploys to staging, production"
  task :all do
    Rake::Task['deploy:staging'].invoke
    Rake::Task['deploy:production'].invoke
  end

  desc "Deploy if Travis environment variables are set correctly"
  task :travis do
    branch = ENV['TRAVIS_BRANCH']
    pull_request = ENV['TRAVIS_PULL_REQUEST']

    abort 'Must be run on Travis' unless branch

    if pull_request != 'false'
      puts 'Skipping deploy for pull request; can only be deployed from source branch.'
      exit 0
    end

    if branch != 'source'
      puts "Skipping deploy for #{ branch }; can only be deployed from source branch."
      exit 0
    end

    Rake::Task['deploy:all'].invoke
  end
end

namespace :publish do
  desc "Build and deploy to production"
  task :production do
    Rake::Task['build'].invoke
    Rake::Task['deploy:production'].invoke
  end

  desc "Build and deploy to staging"
  task :staging do
    Rake::Task['build'].invoke
    Rake::Task['deploy:staging'].invoke
  end

  desc "Build and deploy to both staging and production"
  task :all do
    Rake::Task['build'].invoke
    Rake::Task['deploy:all'].invoke
  end
end


namespace :build do
  desc 'Builds, then tests'
  task :test do
    Rake::Task['clean'].invoke
    Rake::Task['build'].invoke
    Rake::Task['test'].invoke
  end
end

desc "Cleans the locally generated pages"
task :clean do
  puts "Cleaning «public» folder"

  sh 'rm -rf ./.cache && rm -rf ./public'
end

desc "Build site locally"
task :build do
  puts "Generate the static sites from markdown"

  sh 'gatsby build'
end

desc "Start hexo server"
task :server do
  puts "Starting hexo server"

  hexo = Process.spawn("node_modules/.bin/hexo server")

  trap("INT") {
    Process.kill(9, hexo) rescue Errno::ESRCH
    exit 0
  }

  Process.wait(hexo)
end

desc 'Runs html-proofer against current build/ directory.'
task :test do
  require 'html-proofer'

  puts 'Testing public/ directory.'
  HTMLProofer.check_directory('./public', {
    allow_hash_href: true,
    ext: '.html',
    :check_html => { :validation => { :report_invalid_tags => false } },
    check_favicon: false,
    checks_to_ignore: [:check_favicon],
    error_sort: :desc,
    disable_external: true,
    file_ignore: [/^.*\b(tags|page)\b.*$/, /^.*\b(categories|page)\b.*$/, './public/index.html'],
    alt_ignore: [/.*/],
    parallel: { in_processes: 6 },
    verbose: true,
    }).run
end

desc "Create new entry"
task :create, [:layout, :title] do |task, args|
  title = args[:title]
  layout = args[:layout]
  abort "You must specify a title." if title.nil? || title.length < 1

  output = `node_modules/.bin/hexo new '#{layout}' '#{title}'`
  # output is something like '2014-12-11-from-ghost-to-jekyll-slash-octopress.markdown'
end

task :default => :server
