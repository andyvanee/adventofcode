import {uniq} from '../lib.js'

class CommunicationSystem {
    /** @type {Array<string>} */
    #buffer = []

    bufferFromString(str) {
        this.#buffer = str.split('')
    }

    /** @type {Integer} */
    get startOfPacketMarker() {
        // if the last 4 characters are unique, this is the start of the packet
        for (let i = 0; i <= this.#buffer.length; i++) {
            if (i < 4) continue
            if (uniq(this.#buffer.slice(i - 4, i)).length == 4) return i
        }
        return -1
    }
}

export class HandheldDevice {
    /** @type {CommunicationSystem} */
    comm = new CommunicationSystem()
}
