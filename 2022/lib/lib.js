import {readFile as fsReadFile} from 'node:fs/promises'

export const sum = (list) => {
    return list.reduce((x, y) => x + y, 0)
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
