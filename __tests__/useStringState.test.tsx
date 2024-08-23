import { describe, expect, it, beforeEach } from "vitest";
import { useStringState } from "../src";
import { customRenderHook, updateUrlSearchParams } from "../src/test-utils";

const param = "firstName";
const username = "john";
const defaultValue = "test";
const newValue = "testingNow";

describe("useStringState", () => {
  beforeEach(() => {
    updateUrlSearchParams("");
  });

  describe("Initial value", () => {
    it("should use the value from URL when available", () => {
      updateUrlSearchParams(`${param}=${username}`);
      const { result } = customRenderHook(() => useStringState(param, { defaultValue }));

      expect(result.current.value).toBe(username);
    });

    it("should use default value when URL parameter is empty", () => {
      updateUrlSearchParams(`${param}=`);
      const { result } = customRenderHook(() => useStringState(param, { defaultValue }));

      expect(result.current.value).toBe(defaultValue);
    });

    it("should use default value when URL parameter is not present", () => {
      const { result } = customRenderHook(() => useStringState(param, { defaultValue }));

      expect(result.current.value).toBe(defaultValue);
    });

    it("should not include param in URL when value is default", () => {
      updateUrlSearchParams(`${param}=${defaultValue}`);
      customRenderHook(() => useStringState(param, { defaultValue }));

      expect(window.location.search).toBe("");
    });
  });

  describe("set function", () => {
    it("should remove param from URL when set to default value", () => {
      updateUrlSearchParams(`${param}=${username}`);
      const { result } = customRenderHook(() => useStringState(param, { defaultValue }));

      result.current.set(defaultValue);

      expect(window.location.search).toBe("");
    });

    it("should update URL with new value", () => {
      updateUrlSearchParams(`${param}=${username}`);
      const { result } = customRenderHook(() => useStringState(param, { defaultValue }));

      result.current.set(newValue);

      expect(window.location.search).toBe(`?${param}=${newValue}`);
    });
  });
});
