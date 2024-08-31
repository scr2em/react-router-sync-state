import { describe, expect, it } from "vitest";
import { before } from "node:test";
import { useMultiNumberState } from "../src";
import { customRenderHook, updateUrlSearchParams } from "../src/test-utils";

const param = "ids";
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newIds = [7, 8];
const defaultValue = "";
const delimiter = ",";

describe("useMultiNumberState", function () {
  describe("useMultiNumberState as a 'Value'", function () {
    it("Should be initialize with default value if no search param is set as a 'Number", function () {
      const { result } = customRenderHook(() =>
        useMultiNumberState(param, { defaultValue: ids, delimiter: delimiter }),
      );

      expect(result.current[0]).toEqual(ids);
    });

    it("Should be initialize with default value if no search param is set as a 'String", function () {
      const { result } = customRenderHook(() =>
        useMultiNumberState(param, { defaultValue: ids, delimiter: delimiter }),
      );

      expect(result.current[0]).toEqual(ids);
    });

    it(`Should be get ${defaultValue} as a default value when not pass the target param.`, function () {
      updateUrlSearchParams(``);
      const { result } = customRenderHook(() => useMultiNumberState(param, { defaultValue: [], delimiter }));

      expect(result.current[0]).toEqual([]);
    });
  });

  describe("useMultiNumberState as a func 'Set'", function () {
    it(`Should be initialize with empty search params when updated the URL with default value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=`);
        const { result } = customRenderHook(() => useMultiNumberState(param, { defaultValue: [], delimiter }));
        result.current[1]([]);
      });

      expect(window.location.search).toBe("");
    });

    it(`Should be include ${newIds.toString()} as a new value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=${defaultValue}`);
        const { result } = customRenderHook(() => useMultiNumberState(param, { defaultValue: [], delimiter }));
        result.current[1](newIds);
      });

      const params = new URLSearchParams();
      params.set(param, newIds.toString());
      const result = `?${params.toString()}`;

      expect(window.location.search).toBe(result);
    });
  });
});
