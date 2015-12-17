require 'bt/val_op'
require 'bt/una_op'
require 'bt/bin_op'
require 'bt/methods'

module BT
    class Evaluator
        def initialize(a,b='',c='')
            if b.empty? && c.empty?
                @e = ValOp.new(a)       # value
            elsif c.empty?
                @e = UnaOp.new(a, b)    # METHOD value
            elsif a.empty?
                raise 'BT::Evaluator argument error'
            else
                @e = BinOp.new(b, a, c) # value METHOD value
            end
        end

        def eval(graph)
            # Memoize that sucker!!
            @value ||= @e.eval(graph)
        end
    end
end
