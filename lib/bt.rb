require 'bt/expression'

module BT
    #
    # BT::Circuit
    #
    # The circuit is constructed by adding expressions to the graph using the
    # shovel operator (<<) and then doing a lookup using the [] operator, which
    # will evaluate the graph. Results are memoized, so any modifications to the
    # graph after a lookup may not produce the desired outcome. Little to no
    # error checking is done on the expressions themselves.
    #
    class Circuit
        attr_accessor :graph
        def initialize
            @graph = Hash.new
        end

        def parse_line(x)
            expr = Expression.parse(x)
            @graph[expr.target] = expr.evaluator
        end
        alias << parse_line

        def run(x)
            @graph[x].eval(@graph)
        end
        alias [] run
    end
end
