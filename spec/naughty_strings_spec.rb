require "minitest/autorun"
require "naughty_strings"

describe 'sample strings' do
    it 'ee' do
        NaughtyStrings.double_letter('ee').must_equal true
    end

    it 'aba' do
        NaughtyStrings.double_letter('aba').must_equal false
    end

    it 'ugknbfddgicrmopn' do
        NaughtyStrings.nice_string('ugknbfddgicrmopn').must_equal true
    end

    it 'aaa' do
        NaughtyStrings.nice_string('aaa').must_equal true
    end

    it 'jchzalrnumimnmhp' do
        NaughtyStrings.nice_string('jchzalrnumimnmhp').must_equal false
    end

    it 'haegwjzuvuyypxyu' do
        NaughtyStrings.nice_string('haegwjzuvuyypxyu').must_equal false
    end

    it 'dvszwmarrgswjxmb' do
        NaughtyStrings.nice_string('dvszwmarrgswjxmb').must_equal false
    end
end
