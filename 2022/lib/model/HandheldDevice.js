import {uniq} from '../lib.js'
import {join} from 'node:path'
import {CPU} from './HandheldDevice/CPU.js'
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

export class CLICommand {
    cmd = ''
    args = []
    output = ''

    constructor(cmd, args, output) {
        Object.assign(this, {cmd, args, output})
    }

    /**
     * @param {Storage} storage
     */
    exec(storage) {
        throw new Error(`command not implemented ${this.cmd} ${storage}`)
    }

    static fromString(str) {
        const lines = str.split('\n')
        const line1 = /\$\s+(\w+)(\s+(.*))?/.exec(lines.shift())
        if (!line1) return
        const [_, cmd, _a, args] = line1
        const output = lines
        const argArray = (args || '').split(' ')
        return new (COMMANDS[cmd] || CLICommand)(cmd, argArray, output)
    }
}

export class CDCommand extends CLICommand {
    exec(storage) {
        const arg = this.args[0]
        if (/^\//.exec(arg)) {
            storage.cwd = arg
        } else {
            storage.cwd = join(storage.cwd, arg)
        }
    }
}
export class LSCommand extends CLICommand {
    exec(storage) {
        const dirs = []
        const files = []
        for (const line of this.output) {
            if (!line) continue
            const fileMatch = /(\d+)\s+(.*)/.exec(line)
            const dirMatch = /dir\s+(.*)/.exec(line)
            if (fileMatch) {
                const [_, size, filename] = fileMatch
                const filePath = join(storage.cwd, filename)
                files.push(new File(filePath, size))
            } else if (dirMatch) {
                const [_, dirname] = dirMatch
                dirs.push(new Directory(join(storage.cwd, dirname)))
            } else {
                console.error({error: 'unknown output', line})
            }
        }
        files.map(f => (storage.entries[f.path] = f))
        dirs.map(d => (storage.entries[d.path] = d))
    }
}

const COMMANDS = {
    cd: CDCommand,
    ls: LSCommand,
}

class Directory {
    /** @type {string} */
    path = '/'

    constructor(path) {
        this.path = path
    }
}
class File {
    path = ''

    /** @type {number} */
    size = 0

    constructor(path, size) {
        this.path = path
        this.size = parseInt(`${size}`)
    }
}

class Storage {
    /** @type {{[path:string]: Directory|File}} */
    entries = {
        '/': new Directory('/'),
    }
    cwd = '/'
    maxSpace = 70000000

    driveFromCLI(string) {
        const lines = string.trim().split(/(?=\$)/g)
        const commands = lines.map(l => CLICommand.fromString(l))
        for (const command of commands) {
            if (command) command.exec(this)
        }
    }

    get files() {
        return Object.values(this.entries).filter(e => e instanceof File)
    }

    get directories() {
        return Object.values(this.entries).filter(e => e instanceof Directory)
    }

    get directoriesByContentSize() {
        return this.directories
            .map(dir => {
                const size = this.files
                    .filter(f => f.path.startsWith(dir.path))
                    .reduce((prev, curr) => (curr['size'] || 0) + prev, 0)
                return {dir, size}
            })
            .sort((a, b) => (a.size > b.size ? -1 : 1))
    }

    get freeSpace() {
        return this.maxSpace - this.directoriesByContentSize[0].size
    }

    markForDelete(requiredFreeSpace) {
        const freeSpace = this.freeSpace
        return this.directoriesByContentSize
            .reverse()
            .filter(d => d.size + freeSpace >= requiredFreeSpace)
            .shift()
    }

    get deletionCandidates() {
        return this.directoriesByContentSize.filter(e => e.size <= 100000)
    }

    get deletionCandidateSize() {
        return this.deletionCandidates.reduce((prev, curr) => curr.size + prev, 0)
    }
}

export class HandheldDevice {
    /** @type {CommunicationSystem} */
    comm = new CommunicationSystem()
    storage = new Storage()
    cpu = new CPU()
}
