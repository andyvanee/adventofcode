require 'minitest/autorun'
require 'fire_hazard'

# Because your neighbors keep defeating you in the holiday house decorating
# contest year after year, you've decided to deploy one million lights in a
# 1000x1000 grid.

# Furthermore, because you've been especially nice this year, Santa has mailed you
# instructions on how to display the ideal lighting configuration.

# Lights in your grid are numbered from 0 to 999 in each direction; the lights at
# each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include
# whether to turn on, turn off, or toggle various inclusive ranges given as
# coordinate pairs. Each coordinate pair represents opposite corners of a
# rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to
# 9 lights in a 3x3 square. The lights all start turned off.

describe FireHazard::Board do
    let(:board) { FireHazard::Board.new }

    it 'should be off at 0,0' do
        board.at('0,0').must_equal false
    end

    it 'should be off at 999,999' do
        board.at('999,999').must_equal false
    end

    it 'should allow execution of a function from ab to xy' do
        board.from('0,0', '2,2') { |x| true }
        board.at('0,0').must_equal true
        board.at('2,2').must_equal true
        board.at('3,3').must_equal false
    end
end

# To defeat your neighbors this year, all you have to do is set up your lights by
# doing the instructions Santa sent you in order.

# For example:

# - turn on 0,0 through 999,999 would turn on (or leave on) every light.

describe 'FireHazard::Board.turn_on' do
    let(:board) { FireHazard::Board.new }

    it 'should turn on every light' do
        board.turn_on('0,0', '999,999')
        board.at('0,0').must_equal true
        board.at('555,555').must_equal true
        board.at('999,999').must_equal true
    end

    it 'should turn on one light' do
        board.turn_on('0,0', '0,0')
        board.at('0,0').must_equal true
        board.at('1,1').must_equal false
    end
end

# - toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning
#   off the ones that were on, and turning on the ones that were off.

describe 'FireHazard::Board.toggle' do
    let(:board) { FireHazard::Board.new }

    it 'should toggle first column of lights' do
        board.toggle('0,0', '999,0')
        board.at('0,0').must_equal true
        board.at('999,0').must_equal true
        board.at('0,1').must_equal false
    end

    it 'should toggle off lights that are on' do
        board.all_on.toggle('0,0', '0,0')
        board.at('0,0').must_equal false
        board.at('1,1').must_equal true
        board.at('999,999').must_equal true
    end
end

# - turn off 499,499 through 500,500 would turn off (or leave off) the middle four
#   lights.

describe 'FireHazard::Board.turn_off' do
    let(:board) { FireHazard::Board.new }

    it 'should turn off a single light' do
        board.all_on.turn_off('0,0', '0,0')
        board.at('0,0').must_equal false
        board.at('0,1').must_equal true
    end

    it 'should turn off the middle four lights' do
        board.all_on.turn_off('499,499', '500,500')
        board.at('0,0').must_equal true
        board.at('499,499').must_equal false
        board.at('500,500').must_equal false
        board.at('501,501').must_equal true
    end
end

describe 'FireHazard::Board.count' do
    let(:board) { FireHazard::Board.new }
    it 'should equal 0' do
        board.count.must_equal 0
    end
    it 'should equal 1000' do
        board.turn_on('0,0', '0,999')
        board.count.must_equal 1000
    end
end

describe 'FireHazard.instruction' do
    let(:board) { Minitest::Mock.new }

    it 'should do nothing on invalid instructions' do
        FireHazard.instruction(board, 'invalid')
        FireHazard.instruction(board, 'turn on x through y')
        FireHazard.instruction(board, '')
        board.verify
    end

    it 'should call turn_on method' do
        board.expect :turn_on, nil, ['0,0', '0,0']
        FireHazard.instruction(board, 'turn on 0,0 through 0,0')
        board.verify
    end

    it 'should call turn_off method' do
        board.expect :turn_off, nil, ['0,0', '0,0']
        FireHazard.instruction(board, 'turn off 0,0 through 0,0')
        board.verify
    end

    it 'should call toggle method' do
        board.expect :toggle, nil, ['0,0', '0,0']
        FireHazard.instruction(board, 'toggle 0,0 through 0,0')
        board.verify
    end
end
