import React, { useEffect, useRef } from "react";

const useClickOutside = (elRef, callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e) => {
      // check if the element on which this hook is used, contains the element,on which click happened
      // If the target of the click is inside the elRef, then clicked inside, or else clicked outside event happened
      if (!elRef?.current?.contains(e.target) && callbackRef.current) {
        callbackRef.current(e);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callbackRef, elRef]);

  return <div>useClickOutside</div>;
};

export default useClickOutside;
