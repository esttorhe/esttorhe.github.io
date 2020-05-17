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
    sh 'npm run deploy'
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

    Rake::Task['deploy:production'].invoke
  end
end

namespace :publish do
  desc "Build and deploy to production"
  task :production do
    Rake::Task['build'].invoke
    Rake::Task['deploy:production'].invoke
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

task :develop do
  puts "Serving local website for development"
  sh 'npm run develop'
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

desc "Start gatsby server"
task :server do
  puts "Starting gatsby server"

  gatsby = Process.spawn("gatsby serve")

  trap("INT") {
    Process.kill(9, gatsby) rescue Errno::ESRCH
    exit 0
  }

  Process.wait(gatsby)
end

desc 'Runs html-proofer against current `build` directory (./public)'
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
    file_ignore: [],
    alt_ignore: [/.*/],
    parallel: { in_processes: 6 },
    verbose: true,
    }).run
end

task :default => :server
