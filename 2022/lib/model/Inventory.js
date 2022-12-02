import {sum, Model} from '../lib.js'

export class Inventory extends Model {
    /**
     * @type Food[]
     */
    food = []

    get totalCalories() {
        return sum(this.food.map((f) => f.calories))
    }
}
