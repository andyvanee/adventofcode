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

    it 'xyxy has a dual letter pair' do
        NaughtyStrings.dual_letter_pair('xyxy').must_equal true
    end

    it 'aabcdefgaa has a dual letter pair' do
        NaughtyStrings.dual_letter_pair('aabcdefgaa').must_equal true
    end

    it 'aaa does not have a dual letter pair' do
        NaughtyStrings.dual_letter_pair('aaa').must_equal false
    end

    it 'aaa alternates characters' do
       NaughtyStrings.alternates_characters('aaa').must_equal true
    end

    it 'abcdefeghi alternates characters' do
       NaughtyStrings.alternates_characters('abcdefeghi').must_equal true
    end

    it 'abcdefghi does not alternate characters' do
       NaughtyStrings.alternates_characters('abcdefghi').must_equal false
    end

    it 'qjhvhtzxzqqjkmpb is a nicer_string' do
       NaughtyStrings.nicer_string('qjhvhtzxzqqjkmpb').must_equal true
    end

    it 'xxyxx is a nicer_string' do
       NaughtyStrings.nicer_string('xxyxx').must_equal true
    end

    it 'uurcxstgmygtbstg is NOT a nicer_string' do
        NaughtyStrings.nicer_string('aaa').must_equal false
    end

    it 'ieodomkazucvgmuy is NOT a nicer_string' do
        NaughtyStrings.nicer_string('aaa').must_equal false
    end
end
