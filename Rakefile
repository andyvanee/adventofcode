require 'rake'
require 'rake/testtask'

Rake::TestTask.new do |t|
  t.libs << "lib"
  t.libs << "spec"
  t.pattern = 'spec/**/*_spec.rb'
end

namespace :day do
    desc 'Santa Elevator'
    task :one do
        puts `bin/day_1 < spec/data/day_1.txt`
    end

    desc 'Elves Wrapping'
    task :two do
        puts `bin/day_2 < spec/data/day_2.txt`
    end

    desc 'Delivery Route'
    task :three do
        puts `bin/day_3 < spec/data/day_3.txt`
    end

    desc 'Advent Coins'
    task :four do
        puts `bin/day_4`
    end

    desc 'Nice Strings'
    task :five do
        puts `bin/day_5 < spec/data/day_5.txt`
    end

    desc 'Fire Hazard'
    task :six do
        puts `bin/day_6 < spec/data/day_6.txt`
    end

    desc 'Bobby Tables Circuit'
    task :seven do
        puts `bin/day_7 < spec/data/day_7.txt`
    end
end
