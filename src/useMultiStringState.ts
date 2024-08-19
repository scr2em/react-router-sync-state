import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { arraysAreIdentical } from "./utils";

export function useMultiStringState(searchParamName: string, options: { defaultValue: string[]; delimiter: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName); // string | null

  const finalValue = acquiredSearchParam ? acquiredSearchParam.split(options.delimiter) : options.defaultValue;

  const set = (newValue: string[], replace = true) => {
    // if we are setting the default value, don't add it to the url
    if (arraysAreIdentical(newValue, options.defaultValue)) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams, { replace });
    } else {
      searchParams.delete(searchParamName);
      searchParams.append(searchParamName, newValue.join(options.delimiter));
      setSearchParams(searchParams, { replace });
    }
  };

  useEffect(() => {
    // if the url has the default value, remove it
    if (arraysAreIdentical<string | number>(finalValue, options.defaultValue)) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams);
    }
  }, []);

  return {
    value: finalValue,
    set,
  };
}
