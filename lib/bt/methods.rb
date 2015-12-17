module BT
    MAX_INT = 65535

    module Methods
        class NOT
            def eval(value)
                MAX_INT - value
            end
        end
        class AND
            def eval(x, y)
                x & y
            end
        end
        class OR
            def eval(x, y)
                x | y
            end
        end
        class LSHIFT
            def eval(x, y)
                r = x << y
                r > MAX_INT ? MAX_INT : r
            end
        end
        class RSHIFT
            def eval(x, y)
                x >> y
            end
        end
    end
end
