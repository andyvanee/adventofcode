require 'bt/evaluator'

module BT
    #
    # BT::Expression
    #
    # An Expression is a combination of the target variable name and a
    # BT::Evaluator function to generate that variable.
    #
    # BT::Expression.parse takes a single line and returns an expression.
    #

    class Expression
        attr_accessor :target, :evaluator

        EX_MATCH = /^(.*)\W+->\W+(.*)$/
        OP_MATCH = /^(\w*)?\W*(\w*)?\W*(\w*)?\W*$/

        def initialize(target, eval_args)
            @target = target
            @evaluator = Evaluator.send(:new, *eval_args)
        end

        def self.parse(x)
            source, target = EX_MATCH.match(x).to_a[1..-1]
            args = OP_MATCH.match(source).to_a[1..-1]
            Expression.new(target, args)
        end
    end
end
