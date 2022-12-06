import {uniq} from '../lib.js'

class CommunicationSystem {
    /** @type {Array<string>} */
    #buffer = []

    /**
     * @param {string} str the input string
     */
    bufferFromString(str) {
        this.#buffer = str.trim().split('')
    }

    /**
     * Find the index of the first chunk prefixed with <len> unique characters
     * @param {number} len number of unique characters marking start of chunk
     * @returns {number}
     */
    #chunkIndex(len) {
        // if the last <len> characters are unique, this is the start of the packet
        for (let i = 0; i <= this.#buffer.length; i++) {
            if (i < len) continue
            if (uniq(this.#buffer.slice(i - len, i)).length == len) return i
        }
        return -1
    }

    /** @type {number} */
    get startOfPacketMarker() {
        return this.#chunkIndex(4)
    }

    /** @type {number} */
    get startOfMessageMarker() {
        return this.#chunkIndex(14)
    }
}

export class HandheldDevice {
    /** @type {CommunicationSystem} */
    comm = new CommunicationSystem()
}
