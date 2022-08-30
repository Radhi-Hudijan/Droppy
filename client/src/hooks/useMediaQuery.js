import { useEffect, useState } from "react";

export const QUERIES = {
  sm: "(min-width: 360px)",
  md: "(min-width: 840px)",
  lg: "(min-width: 1200px)",
};

const useMediaQuery = (query) => {
  const getMatch = (query) => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [isMatch, setIsMatch] = useState(getMatch(query));

  const resizeHandler = () => setIsMatch(getMatch(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    setIsMatch(getMatch(query));

    matchMedia.addEventListener &&
      matchMedia.addEventListener("change", resizeHandler);
    return () => {
      matchMedia.addEventListener &&
        matchMedia.removeEventListener("change", resizeHandler);
    };
  }, [query]);
  return isMatch;
};
export default useMediaQuery;
