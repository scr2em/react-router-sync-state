export function isNumeric(x: unknown): boolean {
  return (typeof x === "number" || typeof x === "string") && !isNaN(Number(x)) && x !== "";
}

export function isStringArrayOfNumbers(param: string, delimiter: string = ","): boolean {
  const array = param.split(delimiter);
  return array.every((x) => isNumeric(x));
}

export function stringToArrayOfNumbers(param: string, delimiter: string = ","): number[] {
  return param.split(delimiter).map((x) => Number(x));
}

export function parseToArrayOfNumber(param: string, delimiter: string = ","): number[] {
  return isStringArrayOfNumbers(param, delimiter) ? stringToArrayOfNumbers(param, delimiter) : [];
}

export function arraysAreIdentical<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort both arrays
  const sortedArr1 = [...arr1].sort().toString();
  const sortedArr2 = [...arr2].sort().toString();

  return sortedArr1 === sortedArr2;
}
