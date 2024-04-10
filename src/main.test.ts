import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import * as prettier from "prettier";
import * as TailwindCSSPlugin from "prettier-plugin-tailwindcss";
import { describe, it, expect } from "vitest";
import * as TailwindCSSExtraPlugin from "./main";

const testsDir = join(__dirname, "tests");
const extensions = readdirSync(testsDir);

async function format(text: string) {
  return prettier.format(text, {
    parser: "tailwindcss-extra",
    plugins: [TailwindCSSExtraPlugin, TailwindCSSPlugin],
  });
}

describe("format", () => {
  extensions.forEach((ext) => {
    const inputFilename = `input.${ext}`;
    const expectedFilename = `expected.${ext}`;
    const extDir = join(testsDir, ext);
    const tests = readdirSync(extDir);

    describe(ext, () => {
      tests.forEach((test) => {
        it(test, async () => {
          const path = join(extDir, test);
          const input = readFileSync(join(path, inputFilename)).toString();
          const expected = readFileSync(
            join(path, expectedFilename),
          ).toString();

          const result = await format(input);

          expect(result).toEqual(expected);
        });
      });
    });
  });
});
