require 'minitest/autorun'
require 'matchsticks'

describe Matchsticks do
    it 'empty string' do
        Matchsticks.count('').must_equal 0
    end
    it 'double quoted string' do
        Matchsticks.trim('""').length.must_equal 0
    end
    it '"abc"' do
        s = '"abc"'
        Matchsticks.trim(s).must_equal 'abc'
        Matchsticks.count(s).must_equal 2
    end
    it '"aaa\"aaa"' do
        s = '"aaa\"aaa"'
        Matchsticks.trim(s).length.must_equal 7
        Matchsticks.count(s).must_equal 3
    end
    it '"\x27"' do
        s = '"\x27"'
        Matchsticks.trim(s).length.must_equal 1
        Matchsticks.count(s).must_equal 5
    end
    it '"kzzp\\z\\txmkwaouxictybwx"' do
        s = '"kzzp\\z\\txmkwaouxictybwx"'
        Matchsticks.trim(s).length.must_equal 23
        Matchsticks.count(s).must_equal 2
    end
end
