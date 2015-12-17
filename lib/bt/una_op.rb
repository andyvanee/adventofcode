module BT
    #
    # BT::UnaOp
    #
    # Create an evaluator for a method with one argument
    #
    class UnaOp
        def initialize(m, v)
            @value = ValOp.new(v)
            @method = Object.const_get("BT::Methods::#{m}").new
        end

        def eval(graph)
            @method.send(:eval, @value.eval(graph))
        end
    end
end
