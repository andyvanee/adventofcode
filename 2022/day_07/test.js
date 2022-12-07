import {Minitest} from '../lib/minitest.js'
import {data, example} from './data/index.js'
import {part1, part2} from './index.js'

const {assertEqual, refuteMatch} = Minitest
class TestDay07 extends Minitest {
    testPart1Example() {
        assertEqual(95437, part1(example))
    }
    testPart1() {
        assertEqual(1427048, part1(data))
    }

    testPart2Example() {
        assertEqual(24933642, part2(example))
    }
    testPart2() {
        assertEqual(2940614, part2(data))
    }
}

await TestDay07.run()
