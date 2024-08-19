import { isNumeric, isStringArrayOfNumbers, parseToArrayOfNumber, stringToArrayOfNumbers } from "../src/utils";

describe("isNumeric", () => {
  it("should checks if any value can be coerced to a give an number", () => {
    expect(isNumeric("")).toBe(false);
    expect(isNumeric([])).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric(null)).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric(true)).toBe(false);
    expect(isNumeric(false)).toBe(false);
    expect(isNumeric(NaN)).toBe(false);

    expect(isNumeric("14")).toBe(true);
    expect(isNumeric(14)).toBe(true);
    expect(isNumeric(-14)).toBe(true);
    expect(isNumeric("14.5")).toBe(true);
    expect(isNumeric(14.5)).toBe(true);
    expect(isNumeric(-14.5)).toBe(true);
    expect(isNumeric(Infinity)).toBe(true);
    expect(isNumeric(-Infinity)).toBe(true);
  });
});

describe("isStringArrayOfNumbers", () => {
  it("should checks if a string is an array of numbers ", () => {
    expect(isStringArrayOfNumbers("1")).toEqual(true);
    expect(isStringArrayOfNumbers("6,3")).toEqual(true);

    expect(isStringArrayOfNumbers("")).toEqual(false);
    expect(isStringArrayOfNumbers("3,true")).toEqual(false);
    expect(isStringArrayOfNumbers("true")).toEqual(false);
    expect(isStringArrayOfNumbers("xyz")).toEqual(false);
  });
});

describe("stringToArrayOfNumbers", () => {
  it("should checks if a string is an array of numbers ", () => {
    expect(stringToArrayOfNumbers("1")).toEqual([1]);
    expect(stringToArrayOfNumbers("6,3")).toEqual([6, 3]);
  });
});

describe("parseToArrayOfNumber", () => {
  it("should convert a string to an array of numbers", () => {
    expect(parseToArrayOfNumber("1")).toEqual([1]);
    expect(parseToArrayOfNumber("6,3")).toEqual([6, 3]);

    expect(parseToArrayOfNumber("")).toEqual([]);
    expect(parseToArrayOfNumber("3,true")).toEqual([]);
    expect(parseToArrayOfNumber("true")).toEqual([]);
    expect(parseToArrayOfNumber("xyz")).toEqual([]);
  });
});
