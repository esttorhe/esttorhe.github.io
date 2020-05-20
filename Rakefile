require 'rubygems'
require 'bundler/setup'
require 'rake'

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

  sh 'sudo rm -rf ./.cache && sudo rm -rf ./site/public'
end

desc "Build site locally"
task :build do
  puts "Generate the static sites from markdown"

  sh 'make build'
end

desc 'Runs html-proofer against current `build` directory (./public)'
task :test do
  require 'html-proofer'

  puts 'Testing site/public/ directory.'
  HTMLProofer.check_directory('site/public', {
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
