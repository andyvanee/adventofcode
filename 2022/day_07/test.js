import {Minitest} from '../lib/minitest.js'
import {data, example} from './data/index.js'
import {part1} from './index.js'

const {assertEqual, refuteMatch} = Minitest
class TestDay07 extends Minitest {
    testPart1Example() {
        assertEqual(95437, part1(example))
    }
    testPart1() {
        assertEqual(1427048, part1(data))
    }
}

await TestDay07.run()
