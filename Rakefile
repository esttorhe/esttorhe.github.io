require 'rubygems'
require 'bundler/setup'
require 'rake'
require 'httparty'
require 'json'

namespace :config do
  desc "Initial setup"
  task :bootstrap do
    puts 'Installing dependencies...'
    sh 'sed -i \'s/git@github.com:/https:\/\/github.com\//\' .gitmodules'
    sh 'git submodule update --init --recursive'
    sh 'npm -g install npm@latest'
    sh 'npm install -g hexo'
    sh 'npm install'
    sh 'pip install --user s3cmd'
    sh 's3cmd --version'
  end

  desc "Configures the variables and «seds» the modules"
  task :environment do
    sh 'git config --global user.name \'Esteban Torres via Travis CI\''
    sh 'git config --global user.email \'me@estebantorr.es\''
    sh 'sed -i\'\' "s~git@github.com:esttorhe/esttorhe.github.io.git~https://${GH_TOKEN}:x-oauth-basic@github.com/esttorhe/esttorhe.github.io.git~" _config.yml'
  end
end

namespace :deploy do
  desc "Deployment to production"
  task :production do
    sh 'hexo deploy --silent'
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

  sh 'hexo clean'
end

desc "Build site locally"
task :build do
  puts "Generate the static sites from markdown"

  sh 'hexo generate --verbose'
end

desc "Start hexo server"
task :server do
  puts "Starting hexo server"

  hexo = Process.spawn("hexo server")

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
    file_ignore: [/^.*\b(tags|page)\b.*$/, './public/index.html'],
    alt_ignore: [/.*/],
    parallel: { in_processes: 3},
    verbose: true,
    }).run
end

desc "Create new entry"
task :layout, :title do |task, args|
  title = args[:title]
  abort "You must specify a title." if title.nil? || title.length < 1

  output = `hexo new '#{layout}' '#{title}'`
  # output is something like '2014-12-11-from-ghost-to-jekyll-slash-octopress.markdown'
  dir_name = output.scan(/[0-9]{4}-[0-9]{2}-[0-9]{2}.*\.html\.markdown/)[0][11...-14]
  full_path = "source/_posts/#{dir_name}"
  sh "mkdir #{full_path}" unless File.exists? full_path
  sh "open #{full_path}"

  puts 'Applying article template frontmatter.'
  new_article_filename = output.scan(/source.*/)[0]
  File.open(new_article_filename, 'w') { |file| file.puts contents }
end

task :default => :server
