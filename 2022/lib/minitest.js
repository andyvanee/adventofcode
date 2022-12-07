import {exit, exitCode} from 'node:process'

export class Minitest {
    setup() {}

    static async run() {
        const T = new this()
        T.setup()
        for (const attr of Object.getOwnPropertyNames(Object.getPrototypeOf(T))) {
            if (!/test[\w+]/.exec(attr)) continue
            if (typeof T[attr] !== 'function') continue
            const beforeFailureCount = Minitest.failureCount
            const beforeAssertionCount = Minitest.assertionCount
            try {
                await T[attr]()
            } catch (error) {
                console.log({error})
            }
            const didAssert = Minitest.assertionCount !== beforeAssertionCount
            if (!didAssert) {
                console.log('WARN: ${attr} did not make any assertions')
            }
            const success = Minitest.failureCount === beforeFailureCount
            const successChar = success ? '✓' : '✘'
            console.log(`${successChar} ${attr}`)
        }
        if (Minitest.assertionCount)
            if (Minitest.failureCount) {
                exit(Minitest.failureCount)
            }
        return true
    }

    /**
     * Assert that value a is equal to value b
     * @param {any} a
     * @param {any} b
     */
    static assertEqual(a, b) {
        Minitest.assertionCount += 1
        if (a !== b) {
            Minitest.failureCount += 1
            console.log(`failed asserting that ${a} == ${b}`)
        }
    }

    static refuteMatch(regex, subject) {
        Minitest.assertionCount += 1
        if (regex.exec(subject)) {
            Minitest.failureCount += 1
            console.log(`failed refuteMatch: ${regex} matches ${subject}`)
        }
    }

    static assertionCount = 0
    static failureCount = 0
}

export default Minitest
