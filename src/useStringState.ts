import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { assertString } from "./utils";

export function useStringState<T extends string>(
  searchParamName: string,
  options: { defaultValue: T; validator?: (acquiredString: string) => acquiredString is T },
) {
  const { defaultValue, validator = assertString } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName); // string | null

  const finalValue = acquiredSearchParam && validator(acquiredSearchParam) ? acquiredSearchParam : defaultValue;

  const set = (newValue: string, replace = true) => {
    // if we are setting the default value, don't add it to the url
    if (newValue === defaultValue) {
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
    if (finalValue === defaultValue) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams);

      // acquiredSearchParam = string | null
    } else if (!acquiredSearchParam) {
      searchParams.delete(searchParamName);
      setSearchParams(searchParams);
    }
  }, []);

  return [finalValue, set] as const;
}
