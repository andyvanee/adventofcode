# Advent of Code 2022 by Andy Vanee

These are my solutions to <https://adventofcode.com/2022>

## Rationale

This year I've decided to try to challenge myself to model the entire Elf Universe as much as possible.

Each day will have it's own directory with `index.js` to parse the input, load the models and produce the output. Each
directory will also have a `test.js` which is run using jest.

### Goals

- Assertions in the description should generally match test assertions in the models
- Re-use/Refactor objects when they reflect the same in-universe entity (without causing regressions!)
- Include types as much as possible to aid readability and autocomplete
- Lazy but readable - The code won't be perfect and I won't spend much time polishing

The `lib` directory contains the majority of the code, including tests to assert some of the logic from the
descriptions.

## Commands

- `yarn run test` to run the test cases
- `yarn run test:watch` to run tests in watch mode
