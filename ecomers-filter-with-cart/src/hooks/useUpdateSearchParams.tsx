import React from "react";
import { useSearchParams } from "react-router-dom";

export function useUpdateSearchParams() {
  const [serchParams, setSerchParams] = useSearchParams();

  const removeSearchParams = (keyList: string[]) => {
    console.log(keyList);
    // Create new Object for URLSearchParams
    const updatedSearchParams = new URLSearchParams(serchParams);
    // Using fol loop delete all the params
    keyList.forEach((key) => {
      updatedSearchParams.delete(key);
    });
    // set updated params
    setSerchParams(updatedSearchParams);
  };

  const updateSearchParams = (
    updatedParamObject = {},
    removeKeyList: string[] = []
  ) => {
    // Create new Object for URLSearchParams
    const updatedSearchParams = new URLSearchParams(serchParams);

    // Remove
    removeKeyList.forEach((key) => {
      updatedSearchParams.delete(key);
    });

    // update
    for (let key in updatedParamObject) {
      const value = updatedParamObject[key];
      updatedSearchParams.set(key, value);
    }

    // set updated params
    setSerchParams(updatedSearchParams);
  };

  return { removeSearchParams, updateSearchParams };
}
