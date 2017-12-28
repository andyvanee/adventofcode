require 'minitest/autorun'
require 'wrapping_paper'

describe 'box_methods' do
    describe 'prism_area' do
        it '2x3x4 must equal 52' do
            WrappingPaper.prism_area([2,3,4]).must_equal 52
        end
        it '1x1x10 must equal 43' do
            WrappingPaper.prism_area([1,1,10]).must_equal 42
        end
    end

    describe 'paper_extra' do
        it '1x2x3 = 1x2' do
            WrappingPaper.paper_extra([1,2,3]).must_equal 2
        end
        it '12x8x4 = 32' do
            WrappingPaper.paper_extra([12,8,4]).must_equal 32
        end
    end

    describe 'paper_area' do
        it '1x1x10 must equal 43' do
            WrappingPaper.paper_area([1,1,10]).must_equal 43
        end
        it '2x3x4 must equal 58' do
            WrappingPaper.paper_area([2,3,4]).must_equal 58
        end
    end

    describe 'ribbon_length' do
        it 'ribbon length for 2x3x4' do
            WrappingPaper.ribbon_length([2,3,4]).must_equal 10
        end
        it 'ribbon length for 1x1x10' do
            WrappingPaper.ribbon_length([1,1,10]).must_equal 4
        end
    end

    describe 'bow_length' do
        it 'bow length for 2x3x4' do
            WrappingPaper.bow_length([2,3,4]).must_equal 24
        end
        it 'bow length for 1x1x10' do
            WrappingPaper.bow_length([1,1,10]).must_equal 10
        end
    end
end
