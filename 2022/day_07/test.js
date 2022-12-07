import {Minitest} from '../lib/minitest.js'

const {assertEqual, refuteMatch} = Minitest

class Meme {
    i_can_has_cheezburger() {
        return 'OHAI!'
    }

    will_it_blend() {
        return 'YES!'
    }
}

class TestMeme extends Minitest {
    setup() {
        this.meme = new Meme()
    }

    testThatKittyCanEat() {
        assertEqual('OHAI!', this.meme.i_can_has_cheezburger())
    }

    testThatItWillNotBlend() {
        refuteMatch(/^no/i, this.meme.will_it_blend())
    }
}

await TestMeme.run()
