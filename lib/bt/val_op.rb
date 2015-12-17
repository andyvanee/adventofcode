module BT
    class ValOp
        def initialize(v)
            if /\d+/.match v
                @value = lambda { |g| v.to_i }
            else
                @value = lambda do |g|
                    raise 'Bad Argument: '+v if g[v].nil?
                    g[v].eval(g)
                end
            end
        end
        def eval(graph)
            @value.call(graph)
        end
    end
end
