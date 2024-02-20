import { useEffect, useRef } from "react";

function areEqual(prevDepArr, nextDepArr) {
  if (prevDepArr === null) return false;
  if (prevDepArr.length !== nextDepArr.length) return false;
  for (let i = 0; i < prevDepArr.length; i++) {
    if (prevDepArr[i] !== nextDepArr[i]) return false;
  }
  return true;
}

function useCustomMemo(cb, depArr) {
  // create a state for storing the value
  const memoizedRef = useRef(null);

  // compare the changes
  if (!memoizedRef.current || !areEqual(memoizedRef.current.depArr, depArr)) {
    memoizedRef.current = {
      value: cb(),
      depArr,
    };
  }

  //cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the value
  return memoizedRef.current.value;
}

export default useCustomMemo;
