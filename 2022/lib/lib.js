import {readFile as fsReadFile} from 'node:fs/promises'
import {argv} from 'node:process'

export const args = argv.slice(2)

export const sum = (list) => {
    return list.reduce((x, y) => x + y, 0)
}

export const split = (list) => {
    const halfLength = Math.floor(list.length / 2)
    return [list.slice(0, halfLength), list.slice(halfLength)]
}

export const readFile = async (path) => {
    return await fsReadFile(path, {encoding: 'utf-8'})
}

export class Base {
    get props() {
        return {}
    }

    toString() {
        const cls = this.constructor.name
        const props = JSON.stringify(this.props, null, 2)
        return `${cls} ${props}`
    }
}

export class Model extends Base {}
