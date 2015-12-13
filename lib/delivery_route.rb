require 'set'

module DeliveryRoute
  def self.process(input)
    current = [0,0]
    visited = [current].to_set

    input.split('').each do |token|
      x,y = current
      x += 1 if token == '^'
      x -= 1 if token == 'v'
      y += 1 if token == '>'
      y -= 1 if token == '<'
      current = [x, y]
      visited.add(current)
    end

    visited.length
  end
end
