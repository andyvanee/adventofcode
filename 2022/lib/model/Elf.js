import {Model} from '../lib.js'
import {Inventory} from './Inventory.js'

export class Elf extends Model {
    id = 0
    inventory = new Inventory()

    get totalCalories() {
        return this.inventory.totalCalories
    }

    get props() {
        return {
            id: this.id,
            totalCalories: this.totalCalories,
        }
    }
}
