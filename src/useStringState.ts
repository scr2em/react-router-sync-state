import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function useStringState(searchParamName: string, options: { defaultValue: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName); // string | null

  const finalValue = acquiredSearchParam || options.defaultValue;

  /**
   * @description The set() method of the useStringState  interface set and remove duplicated the params value.
   * @param newValue
   * @param replace
   * @return void
   */
  const set = (newValue: string, replace = true) => {
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

      // acquiredSearchParam = string | null
    } else if (!acquiredSearchParam) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams);
    }
  }, []);

  return {
    value: finalValue,
    set,
  };
}
