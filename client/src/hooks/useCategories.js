import { useEffect, useState } from "react";

import useFetch from "./useFetch";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const onSuccess = (onReceived) => {
    setCategories(onReceived.result);
  };

  const { performFetch, cancelFetch } = useFetch("/categories", onSuccess);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  return categories;
};
export default useCategories;
