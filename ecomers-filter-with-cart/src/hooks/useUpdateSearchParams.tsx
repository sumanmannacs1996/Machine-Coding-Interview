import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useUpdateSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Removes the specified keys from the search params.
   */
  const removeSearchParams = useCallback(
    (keyList: string[]) => {
      if (!Array.isArray(keyList) || keyList.length === 0) return;
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      keyList.forEach((key) => {
        updatedSearchParams.delete(key);
      });
      setSearchParams(updatedSearchParams);
    },
    [searchParams, setSearchParams]
  );

  /**
   * Updates the search params with the provided key-value pairs and optionally removes specified keys.
   */
  const updateSearchParams = useCallback(
    (
      updatedParamObject: Record<string, string> = {},
      removeKeyList: string[] = []
    ) => {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      // Remove specified keys
      removeKeyList.forEach((key) => {
        updatedSearchParams.delete(key);
      });
      // Set new/updated params
      Object.entries(updatedParamObject).forEach(([key, value]) => {
        updatedSearchParams.set(key, value);
      });
      setSearchParams(updatedSearchParams);
    },
    [searchParams, setSearchParams]
  );

  return { removeSearchParams, updateSearchParams };
}
