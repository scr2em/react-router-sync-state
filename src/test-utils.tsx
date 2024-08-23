import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export function updateUrlSearchParams(searchParams: string) {
  const url = new URL(window.location.href);
  url.search = searchParams;
  window.history.pushState({}, "", url);
}

export function customRenderHook<T>(hook: () => T) {
  return renderHook(hook, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  });
}
