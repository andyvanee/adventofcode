# Advent of Code 2022 by Andy Vanee

These are my solutions to <https://adventofcode.com/2022>

## Rationale

This year I've decided to try to challenge myself to model the entire Elf Universe as much as possible.

Each day will have it's own directory with `index.js` to parse the input, load the models and produce the output. Each
directory will also have a `test.js` which is run using jest.

The `lib` directory contains the majority of the code, including tests to assert some of the logic from the
descriptions.

## Commands

- `yarn run test` to run the test cases
- `yarn run test:watch` to run tests in watch mode
