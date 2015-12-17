require 'bt/val_op'
require 'bt/una_op'
require 'bt/bin_op'
require 'bt/methods'

module BT
    class Evaluator
        def initialize(a,b='',c='')
            if b.empty? && c.empty?
                # eg: 123
                @e = ValOp.new(a)
            elsif c.empty?
                # eg: NOT 12
                @e = UnaOp.new(a, b)
            elsif a.empty?
                raise 'error'
            else
                # eg: 4 AND 12
                @e = BinOp.new(b, a, c)
            end
        end
        def eval(graph)
            @value ||= @e.eval(graph)
        end
    end
end
