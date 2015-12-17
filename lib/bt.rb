require 'bt/expression'

module BT
    MAX_INT = 65535
    class Circuit
        attr_accessor :graph
        def initialize
            @graph = Hash.new
        end

        def parse_line(x)
            expr = Expression.parse(x)
            @graph[expr.target] = expr.evaluator
        end

        def run(x)
            @graph[x].eval(@graph)
        end

        alias << parse_line
        alias [] run
    end
end
