export const calibrationValue = (input: string) => {
    const lines = input.split('\n').filter((line) => line.length)
    const values = lines.map((line: string) => {
        // Remove any non-digits in string
        const digits = line.replace(/[^\d]+/gi, '')
        return parseInt(`${digits[0]}${digits[digits.length - 1]}`)
    })
    return values.reduce((prev, curr) => prev + curr, 0)
}

const integers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
}

const integerEntries = Object.entries(integers)

const calibrateWithTextLine = (input: string) => {
    const values = []
    let str = input.slice(0)
    while (str.length) {
        // text-match
        const intMatch = integerEntries.find(([k, v]) => str.startsWith(k))
        if (intMatch) values.push(intMatch[1])

        // numeric-match
        if (/^\d/.exec(str)) values.push(parseInt(str[0]))

        // reduce string length
        str = str.slice(1)
    }
    return parseInt(`${values[0]}${values[values.length - 1]}`)
}

export const calibrateWithText = (input: string) => {
    const lines = input.split('\n').filter((line) => line.length)
    const values = lines.map(calibrateWithTextLine)
    return values.reduce((prev, curr) => prev + curr, 0)
}
