import { describe, expect, it } from "vitest";
import { customRenderHook, updateUrlSearchParams } from "./useBooleanState.test";
import { before } from "node:test";
import { useNumberState } from "../src";

const param = "page";
const value = 10;
const defaultValue = 1;

describe("useNumberState", () => {
  describe("useNumberState as a 'Value'", function () {
    it(`should be include a value equal ${value}`, () => {
      updateUrlSearchParams(`?${param}=${value}`);
      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));
      expect(result.current.value).toBe(value);
    });

    it(`Should be get ${defaultValue} as a default value when pass param without value`, function () {
      updateUrlSearchParams(`${param}=`);
      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));

      expect(result.current.value).toBe(defaultValue);
    });

    it(`Should be get ${defaultValue} as a default value when not pass the target param.`, function () {
      updateUrlSearchParams(``);
      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));

      expect(result.current.value).toBe(defaultValue);
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
        result.current.set(defaultValue);
      });

      expect(window.location.search).toBe("");
    });

    it(`Should be include ${value} as a new value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=${value}`);
        const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));
        result.current.set(value);
      });

      const { result } = customRenderHook(() => useNumberState(param, { defaultValue: defaultValue }));
      expect(result.current.value).toBe(value);
    });
  });
});
