import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetSearchParams = () => {
  const [searchParams, setSerchParams] = useSearchParams();

  const serchParams = useMemo(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      console.log(`Parameter Name: ${key}, Value: ${value}`);
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  return serchParams;
};
