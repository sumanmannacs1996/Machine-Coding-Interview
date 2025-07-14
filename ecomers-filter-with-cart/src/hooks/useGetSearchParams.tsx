import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetSearchParams = () => {
  const [searchParams] = useSearchParams();

  const searchParamsObj = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  return searchParamsObj;
};
