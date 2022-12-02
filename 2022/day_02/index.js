import { readFile } from "../lib/index.js";
import { part1 } from "./tests/part1.js";
import { part2 } from "./tests/part2.js";

console.log(`
    PART 1: example.txt
    ${part1(await readFile("tests/example.txt"))}
`);

console.log(`
    PART 1: day_02.txt
    ${part1(await readFile("tests/day_02.txt"))}
`);

console.log(`
    PART 2: example.txt
    ${part2(await readFile("tests/example.txt"))}
`);

console.log(`
    PART 2: day_02.txt
    ${part2(await readFile("tests/day_02.txt"))}
`);
