import {Model} from '../lib.js'

/**
 * @typedef FoodProps
 * @type {object}
 * @property {string?} name - Name of food
 * @property {number?} calories - Number of calories of this food
 */

/**
 * Food represents a food item in an inventory
 */
export class Food extends Model {
    name = 'unknown'
    calories = 0

    /**
     * @param {FoodProps} props
     */
    constructor(props) {
        super()
        Object.assign(this, {...props})
    }
}
