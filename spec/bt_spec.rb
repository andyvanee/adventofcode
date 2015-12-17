require 'minitest/autorun'
require 'bt'

describe BT do
    let(:graph) { { 'a' => BT::ValOp.new('12') } }

    it 'ValOp number' do
        op = BT::ValOp.new('12')
        op.eval({}).must_equal 12
    end

    it 'ValOp ref' do
        op = BT::ValOp.new('a')
        op.eval(graph).must_equal 12
    end

    it 'NOT instruction' do
        op = BT::UnaOp.new('NOT', '0')
        op.eval({}).must_equal BT::MAX_INT
    end

    it 'NOT instruction ref' do
        op = BT::UnaOp.new('NOT', 'a')
        op.eval(graph).must_equal(BT::MAX_INT - 12)
    end

    it 'AND 1 1 = 1' do
        op = BT::BinOp.new('AND', '1', '1')
        op.eval({}).must_equal 1
    end

    it 'AND 1 2 = 0' do
        op = BT::BinOp.new('AND', '1', '2')
        op.eval({}).must_equal 0
    end

    it 'Evaluator: BinOp' do
        evaluator = BT::Evaluator.new('1', 'AND', '2')
        evaluator.eval({}).must_equal 0
    end

    it 'Evaluator: UnaOp' do
        evaluator = BT::Evaluator.new('NOT', '0')
        evaluator.eval({}).must_equal BT::MAX_INT
    end

    it 'Evaluator: OR' do
        evaluator = BT::Evaluator.new('1', 'OR', '2')
        evaluator.eval({}).must_equal 3
    end

    it 'Evaluator: LSHIFT' do
        evaluator = BT::Evaluator.new(BT::MAX_INT.to_s, 'LSHIFT', '2')
        evaluator.eval({}).must_equal BT::MAX_INT
    end

    it 'Evaluator: RSHIFT' do
        evaluator = BT::Evaluator.new(BT::MAX_INT.to_s, 'RSHIFT', '2')
        evaluator.eval({}).must_equal BT::MAX_INT/4
    end

    it 'Expression.parse' do
        exp = BT::Expression.parse('123 -> x')
        exp.target.must_equal 'x'
        exp.evaluator.eval({}).must_equal 123
    end

    it 'Expression.parse' do
        exp = BT::Expression.parse('1 AND 1 -> x')
        exp.target.must_equal 'x'
        exp.evaluator.eval({}).must_equal 1
    end

    # it 'Expression.parse a -> b' do
    #     exp = BT::Expression.parse('a -> x')
    #     exp.target.must_equal 'x'
    #     exp.evaluator.eval(graph).must_equal 12
    # end

    it 'Expression.parse NOT 1 -> x' do
        exp = BT::Expression.parse('NOT 0 -> x')
        exp.target.must_equal 'x'
        exp.evaluator.eval(graph).must_equal BT::MAX_INT
    end

    it 'evaluates simple expression' do
        circuit = BT::Circuit.new
        circuit << '123 -> x'
        circuit['x'].must_equal 123
    end

    it 'evaluates indirect expression' do
        circuit = BT::Circuit.new
        circuit << 'x -> y'
        circuit << '123 -> x'
        circuit['y'].must_equal 123
    end

    it 'evaluates complex expressions' do
        circuit = BT::Circuit.new
        circuit << '42 -> b'
        circuit << 'b AND z -> a'
        circuit << 'y AND 11 -> z'
        circuit << 'NOT x -> y'
        circuit << '0 -> x'
        circuit['z'].must_equal 11
        circuit['a'].must_equal 10 # 42 & 11
    end

    it 'evaluates sample circuit' do
        circuit = BT::Circuit.new
        circuit << '123 -> x'
        circuit << '456 -> y'
        circuit << 'x AND y -> d'
        circuit << 'x OR y -> e'
        circuit << 'x LSHIFT 2 -> f'
        circuit << 'y RSHIFT 2 -> g'
        circuit << 'NOT x -> h'
        circuit << 'NOT y -> i'
        circuit['d'].must_equal 72
        circuit['e'].must_equal 507
        circuit['f'].must_equal 492
        circuit['g'].must_equal 114
        circuit['h'].must_equal 65412
        circuit['i'].must_equal 65079
        circuit['x'].must_equal 123
        circuit['y'].must_equal 456
    end
end
