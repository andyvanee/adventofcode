module BT
    #
    # BT::BinOp
    #
    # Create an evaluator for a method with two arguments
    #
    class BinOp
        def initialize(m, x, y)
            @x = ValOp.new(x)
            @y = ValOp.new(y)
            @method = Object.const_get("BT::Methods::#{m}").new
        end

        def eval(graph)
            @method.send(:eval, @x.eval(graph), @y.eval(graph))
        end
    end
end
