import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function useStringState<T extends string>(
  searchParamName: string,
  options: { defaultValue: T; validator: (acquiredString: string) => acquiredString is T },
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName); // string | null

  const finalValue =
    acquiredSearchParam && options.validator(acquiredSearchParam) ? acquiredSearchParam : options.defaultValue;

  /**
   * @description The set() method of the useStringState  interface set and remove duplicated the params value.
   * @param newValue
   * @param replace
   * @return void
   */
  const set = (newValue: string, replace = true) => {
    // if we are setting the default value, don't add it to the url
    if (newValue === options.defaultValue) {
      setSearchParams(
        (prev) => {
          prev.delete(searchParamName);
          return prev;
        },
        { replace },
      );
    } else {
      setSearchParams(
        (prev) => {
          prev.delete(searchParamName);
          prev.append(searchParamName, newValue.toString());
          return prev;
        },
        { replace },
      );
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
