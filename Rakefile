require 'rake'
require 'rake/testtask'

Rake::TestTask.new do |t|
  t.libs << "lib"
  t.libs << "spec"
  t.pattern = 'spec/**/*_spec.rb'
end

namespace :day do
    desc 'Santa Elevator'
    task :'1' do
        system('bin/day_1 < spec/data/day_1.txt')
    end

    desc 'Elves Wrapping'
    task :'2' do
        system('bin/day_2 < spec/data/day_2.txt')
    end

    desc 'Delivery Route'
    task :'3' do
        system('bin/day_3 < spec/data/day_3.txt')
    end

    desc 'Advent Coins'
    task :'4' do
        system('bin/day_4')
    end

    desc 'Nice Strings'
    task :'5' do
        system('bin/day_5 < spec/data/day_5.txt')
    end

    desc 'Fire Hazard'
    task :'6' do
        system('bin/day_6 < spec/data/day_6.txt')
    end

    desc 'Bobby Tables Circuit'
    task :'7' do
        system('bin/day_7 < spec/data/day_7.txt')
    end

    desc 'Matchsticks'
    task :'8' do
        system('bin/day_8 < spec/data/day_8.txt')
    end

    desc "Present Paths"
    task :'9' do
        system('PYTHONPATH=`pwd`/lib python3 spec/present_path_test.py')
        system('PYTHONPATH=`pwd`/lib ./bin/day_9 < spec/data/day_9.txt')
    end

    desc "Look and Say"
    task :'10' do
        system('PYTHONPATH=`pwd`/lib python3 spec/look_and_say_test.py')
        system('PYTHONPATH=`pwd`/lib ./bin/day_10')
    end
end
