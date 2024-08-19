import { describe, expect, it } from "vitest";
import { useMultiStringState } from "../src";
import { before } from "node:test";
import { customRenderHook, updateUrlSearchParams } from "./useBooleanState.test";
const param = "ids";
const ids = ["fG7rX", "aB2kL", "J9nQw", "eR6tZ", "mN4vP", "H3oKs", "bY1uV", "xW8zJ", "pL5rM", "cD2qF"];
const newIds = ["pL5rM", "cD2qF"];
const defaultValue = "";
const delimiter = ",";

describe("useMultiStringState", function () {
  describe("useMultiStringState as a 'Value'", function () {
    it("Should be initialize with default value if no search param is set as a 'Number", function () {
      const { result } = customRenderHook(() =>
        useMultiStringState(param, { defaultValue: ids, delimiter: delimiter }),
      );

      expect(result.current.value).toEqual(ids);
    });

    it("Should be initialize with default value if no search param is set as a 'String", function () {
      const { result } = customRenderHook(() =>
        useMultiStringState(param, { defaultValue: ids, delimiter: delimiter }),
      );

      expect(result.current.value).toEqual(ids);
    });

    it(`Should be get ${defaultValue} as a default value when not pass the target param.`, function () {
      updateUrlSearchParams(``);
      const { result } = customRenderHook(() => useMultiStringState(param, { defaultValue: [], delimiter }));

      expect(result.current.value).toEqual([]);
    });
  });

  describe("useMultiStringState as a func 'Set'", function () {
    it(`Should be initialize with empty search params when updated the URL with default value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=`);
        const { result } = customRenderHook(() => useMultiStringState(param, { defaultValue: [], delimiter }));
        result.current.set([]);
      });

      expect(window.location.search).toBe("");
    });

    it(`Should be include ${newIds.toString()} as a new value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=${defaultValue}`);
        const { result } = customRenderHook(() => useMultiStringState(param, { defaultValue: [], delimiter }));
        result.current.set(newIds);
      });

      const params = new URLSearchParams();
      params.set(param, newIds.toString());
      const result = `?${params.toString()}`;

      expect(window.location.search).toBe(result);
    });
  });
});
