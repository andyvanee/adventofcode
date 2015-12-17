require 'bt/evaluator'

module BT
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
