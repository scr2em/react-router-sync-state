import { useQueryBooleanState } from "./useBooleanState";
import { act, renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

function updateUrlSearchParams(searchParams: string) {
  const url = new URL(window.location.href);
  url.search = searchParams;
  window.history.pushState({}, "", url);
}

function customRenderHook<T>(hook: () => T) {
  return renderHook(hook, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  });
}
describe("useBooleanState", () => {
  beforeEach(() => {
    updateUrlSearchParams("");
  });

  it("should not set the default value (false) in the url", async () => {
    const { result } = customRenderHook(() => useQueryBooleanState("testParam", { defaultValue: false }));

    expect(result.current.value).toBe(false);
    expect(window.location.search).toBe("");
  });

  it("should set the default value (true) in the url", async () => {
    const { result } = customRenderHook(() => useQueryBooleanState("testParam", { defaultValue: true }));

    expect(result.current.value).toBe(true);
    expect(window.location.search).toBe("");
  });

  it("should replace the string parameter if it's not true or false with the default value (true)", async () => {
    updateUrlSearchParams("testParam=1234");
    expect(global.location.search).toBe("?testParam=1234");

    const { result } = customRenderHook(() => useQueryBooleanState("testParam", { defaultValue: true }));

    expect(result.current.value).toBe(true);
    expect(window.location.search).toBe("");
  });

  it("should replace the string parameter if it's not true or false with the default value (false)", async () => {
    updateUrlSearchParams("testParam=1234");
    expect(global.location.search).toBe("?testParam=1234");

    const { result } = customRenderHook(() => useQueryBooleanState("testParam", { defaultValue: false }));

    expect(result.current.value).toBe(false);
    expect(window.location.search).toBe("");
  });

  it("should toggle the value", async () => {
    const { result } = customRenderHook(() => useQueryBooleanState("testParam", { defaultValue: false }));

    expect(result.current.value).toBe(false);
    expect(window.location.search).toBe("");

    act(() => result.current.toggle());

    expect(result.current.value).toBe(true);
    expect(window.location.search).toBe("?testParam=true");
    //
    act(() => result.current.toggle());
    expect(result.current.value).toBe(false);
    expect(window.location.search).toBe("");
  });

  it("should set the value and param correctly to true ", async () => {
    const { result } = customRenderHook(() => useQueryBooleanState("testParam", { defaultValue: false }));

    expect(window.location.search).toBe("");

    const { set } = result.current;

    act(() => set(true));

    expect(result.current.value).toBe(true);
    expect(window.location.search).toBe("?testParam=true");
  });

  it("should set the value and param correctly to false ", async () => {
    const { result } = customRenderHook(() => useQueryBooleanState("testParam", { defaultValue: false }));

    expect(window.location.search).toBe("");

    const { set } = result.current;

    act(() => set(false));

    expect(result.current.value).toBe(false);
    expect(window.location.search).toBe("");
  });
});
