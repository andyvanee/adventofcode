require 'rake'
require 'rake/testtask'

Rake::TestTask.new do |t|
    Dir.glob("day_*").each { |d| t.libs << d }
    t.pattern = '**/*_spec.rb'
end

namespace :day do
    desc 'Santa Elevator'
    task :'01' do
        system('day_01/day_01 < day_01/day_01.txt')
    end

    desc 'Elves Wrapping'
    task :'02' do
        system('day_02/day_02 < day_02/day_02.txt')
    end

    desc 'Delivery Route'
    task :'03' do
        system('day_03/day_03 < day_03/day_03.txt')
    end

    desc 'Advent Coins'
    task :'04' do
        system('day_04/day_04')
    end

    desc 'Nice Strings'
    task :'05' do
        system('day_05/day_05 < day_05/day_05.txt')
    end

    desc 'Fire Hazard'
    task :'06' do
        system('day_06/day_06 < day_06/day_06.txt')
    end

    desc 'Bobby Tables Circuit'
    task :'07' do
        system('day_07/day_07 < day_07/day_07.txt')
    end

    desc 'Matchsticks'
    task :'08' do
        system('day_08/day_08 < day_08/day_08.txt')
    end

    desc "Present Paths"
    task :'09' do
        system('PYTHONPATH=src python3 day_09/present_path_test.py')
        system('PYTHONPATH=src ./day_09/day_09 < day_09/day_09.txt')
    end

    desc "Look and Say"
    task :'10' do
        system('PYTHONPATH=src python3 day_10/look_and_say_test.py')
        system('PYTHONPATH=src ./day_10/day_10')
    end

    desc "JSAbacusFramework.io"
    task :'12' do
        system('day_12/day_12')
    end

    desc "Aunt Sue"
    task :'16' do
        system('day_16/day_16 < day_16/day_16.txt')
    end
end
