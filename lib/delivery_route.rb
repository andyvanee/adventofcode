require 'set'

module DeliveryRoute
  class Route < ::Set
    def initialize
      super([[0,0]])
    end

    def go(dir)
      @current ||= [0,0]
      x,y = @current
      x += 1 if dir == '^'
      x -= 1 if dir == 'v'
      y += 1 if dir == '>'
      y -= 1 if dir == '<'
      @current = [x, y]
      add(@current)
    end
  end

  def self.process(input)
    route = Route.new
    input.split('').each do |token|
      route.go(token)
    end
    route
  end
end
