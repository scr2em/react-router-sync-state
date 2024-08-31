import { act } from "@testing-library/react";
import { useBooleanState } from "../src";
import { customRenderHook, updateUrlSearchParams } from "../src/test-utils";

describe("useBooleanState", () => {
  beforeEach(() => {
    updateUrlSearchParams("");
  });

  it("should not set the default value (false) in the url", async () => {
    const { result } = customRenderHook(() => useBooleanState("testParam", { defaultValue: false }));

    expect(result.current[0]).toBe(false);
    expect(window.location.search).toBe("");
  });

  it("should set the default value (true) in the url", async () => {
    const { result } = customRenderHook(() => useBooleanState("testParam", { defaultValue: true }));

    expect(result.current[0]).toBe(true);
    expect(window.location.search).toBe("");
  });

  it("should replace the string parameter if it's not true or false with the default value (true)", async () => {
    updateUrlSearchParams("testParam=1234");
    expect(global.location.search).toBe("?testParam=1234");

    const { result } = customRenderHook(() => useBooleanState("testParam", { defaultValue: true }));

    expect(result.current[0]).toBe(true);
    expect(window.location.search).toBe("");
  });

  it("should replace the string parameter if it's not true or false with the default value (false)", async () => {
    updateUrlSearchParams("testParam=1234");
    expect(global.location.search).toBe("?testParam=1234");

    const { result } = customRenderHook(() => useBooleanState("testParam", { defaultValue: false }));

    expect(result.current[0]).toBe(false);
    expect(window.location.search).toBe("");
  });

  it("should toggle the value", async () => {
    const { result } = customRenderHook(() => useBooleanState("testParam", { defaultValue: false }));

    expect(result.current[0]).toBe(false);
    expect(window.location.search).toBe("");

    act(() => result.current[2]());

    expect(result.current[0]).toBe(true);
    expect(window.location.search).toBe("?testParam=true");
    //
    act(() => result.current[2]());
    expect(result.current[0]).toBe(false);
    expect(window.location.search).toBe("");
  });

  it("should set the value and param correctly to true ", async () => {
    const { result } = customRenderHook(() => useBooleanState("testParam", { defaultValue: false }));

    expect(window.location.search).toBe("");

    const set = result.current[1];

    act(() => set(true));

    expect(result.current[0]).toBe(true);
    expect(window.location.search).toBe("?testParam=true");
  });

  it("should set the value and param correctly to false ", async () => {
    const { result } = customRenderHook(() => useBooleanState("testParam", { defaultValue: false }));

    expect(window.location.search).toBe("");

    const set = result.current[1];

    act(() => result.current[1](false));

    expect(result.current[0]).toBe(false);
    expect(window.location.search).toBe("");
  });
});
