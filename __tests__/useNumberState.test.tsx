import { describe, expect, it } from "vitest";
import { before } from "node:test";
import { useNumberState } from "../src";
import { customRenderHook, updateUrlSearchParams } from "../src/test-utils";

const param = "page";
const value = 10;
const defaultValue = 1;

describe("useNumberState", () => {
  describe("useNumberState as a 'Value'", function () {
    it(`should be include a value equal ${value}`, () => {
      updateUrlSearchParams(`?${param}=${value}`);
      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));
      expect(result.current[0]).toBe(value);
    });

    it(`Should be get ${defaultValue} as a default value when pass param without value`, function () {
      updateUrlSearchParams(`${param}=`);
      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));

      expect(result.current[0]).toBe(defaultValue);
    });

    it(`Should be get ${defaultValue} as a default value when not pass the target param.`, function () {
      updateUrlSearchParams(``);
      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));

      expect(result.current[0]).toBe(defaultValue);
    });

    it(`Should be not include param ${param} when set default value`, function () {
      updateUrlSearchParams(`${param}=${defaultValue}`);
      customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));

      expect(window.location.search).toBe("");
    });
  });

  describe("useBooleanState as a func 'Set'", () => {
    it(`Should be with empty search params when updated the URL with default value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=${value}`);
        const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));
        result.current[1](defaultValue);
      });

      expect(window.location.search).toBe("");
    });

    it(`Should be include ${value} as a new value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=${value}`);
        const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));
        result.current[1](value);
      });

      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));
      expect(result.current[0]).toBe(value);
    });
  });
});
