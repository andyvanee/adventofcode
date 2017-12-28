require 'minitest/autorun'
require 'delivery_route'

describe DeliveryRoute do
  it '>' do
    DeliveryRoute.process('>').length.must_equal 2
  end
  it '^>v<' do
    DeliveryRoute.process('^>v<').length.must_equal 4
  end
  it '^v^v^v^v^v' do
    DeliveryRoute.process('^v^v^v^v^v').length.must_equal 2
  end
end
