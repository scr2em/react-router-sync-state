import { describe, expect, it } from "vitest";
import { useStringState } from "../src";
import { customRenderHook, updateUrlSearchParams } from "./useBooleanState.test";
import { before } from "node:test";

const param = "firstName";
const username = "john";
const defaultValue = "test";
const newValue = "test 1";

describe("useStringState", () => {
  describe("useBooleanState as a 'Value'", () => {
    it("Should be include firstname with john as a value.", function () {
      updateUrlSearchParams(`${param}=${username}`);
      const { result } = customRenderHook(() => useStringState(param, { defaultValue: defaultValue }));

      expect(result.current.value).toBe(username);
    });

    it(`Should be get ${defaultValue} as a default value when pass param without value`, function () {
      updateUrlSearchParams(`${param}=`);
      const { result } = customRenderHook(() => useStringState(param, { defaultValue: defaultValue }));

      expect(result.current.value).toBe(defaultValue);
    });

    it(`Should be get ${defaultValue} as a default value when not pass the target param.`, function () {
      updateUrlSearchParams(``);
      const { result } = customRenderHook(() => useStringState(param, { defaultValue: defaultValue }));

      expect(result.current.value).toBe(defaultValue);
    });

    it(`Should be not include param ${param} when set default value`, function () {
      updateUrlSearchParams(`${param}=${defaultValue}`);
      customRenderHook(() => useStringState(param, { defaultValue: defaultValue }));

      expect(window.location.search).toBe("");
    });
  });

  describe("useBooleanState as a func 'Set'", () => {
    it(`Should be with empty search params when updated the URL with default value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=${username}`);
        const { result } = customRenderHook(() => useStringState(param, { defaultValue: defaultValue }));
        result.current.set(defaultValue);
      });

      expect(window.location.search).toBe("");
    });

    it(`Should be include ${newValue} as a new value.`, async function () {
      before(function () {
        updateUrlSearchParams(`${param}=${username}`);
        const { result } = customRenderHook(() => useStringState(param, { defaultValue: defaultValue }));
        result.current.set(newValue);
      });

      const { result } = customRenderHook(() => useStringState(param, { defaultValue: defaultValue }));
      expect(result.current.value).toBe(newValue);
    });
  });
});
