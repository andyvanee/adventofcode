import {uniq} from '../lib.js'

class CommunicationSystem {
    /** @type {Array<string>} */
    #buffer = []

    bufferFromString(str) {
        this.#buffer = str.trim().split('')
    }

    /** @returns {Integer} */
    #uniqueOfLength(len) {
        // if the last <len> characters are unique, this is the start of the packet
        for (let i = 0; i <= this.#buffer.length; i++) {
            if (i < len) continue
            if (uniq(this.#buffer.slice(i - len, i)).length == len) return i
        }
        return -1
    }

    /** @type {Integer} */
    get startOfPacketMarker() {
        return this.#uniqueOfLength(4)
    }

    /** @type {Integer} */
    get startOfMessageMarker() {
        return this.#uniqueOfLength(14)
    }
}

export class HandheldDevice {
    /** @type {CommunicationSystem} */
    comm = new CommunicationSystem()
}
