require 'minitest/autorun'
require 'advent_coin'

describe 'moves' do
  it 'abcdef' do
    AdventCoin::for('abcdef').must_equal 609043
  end
  it 'pqrstuv' do
    AdventCoin::for('pqrstuv').must_equal 1048970
  end
end
