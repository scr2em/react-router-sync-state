import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { isNumeric } from "./utils";

export function useNumberState(searchParamName: string, options: { defaultValue: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName);

  const finalValue = isNumeric(acquiredSearchParam) ? (Number(acquiredSearchParam) as number) : options.defaultValue;

  const set = (newValue: number, replace = true) => {
    // if we are setting the default value, don't add it to the url
    if (newValue === options.defaultValue) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams, { replace });
    } else {
      searchParams.delete(searchParamName);
      searchParams.append(searchParamName, newValue.toString());
      setSearchParams(searchParams, { replace });
    }
  };

  useEffect(() => {
    // if the url has the default value, remove it
    if (finalValue === options.defaultValue) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams);
    } else {
      // if the url has an invalid value, remove it
      if (acquiredSearchParam && !isNumeric(acquiredSearchParam)) {
        searchParams.delete(searchParamName);
        setSearchParams(searchParams);
      }
    }
  }, []);

  return {
    value: finalValue,
    set,
  };
}
