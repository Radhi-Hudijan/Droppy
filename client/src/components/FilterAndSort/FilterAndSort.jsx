import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import style from "./FilterAndSort.module.css";
import QueriesContext from "../../context/QueriesContext";
import { useContext } from "react";

function FilterAndSort() {
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState({});
  const { setQueries } = useContext(QueriesContext);

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

  const changeHandler = (e) => {
    const el = e.target;
    const name = el.name;
    const value = el.value;
    setInputs((values) => ({ ...values, [name]: value.toUpperCase() }));
  };

  const filterHandler = () => {
    setQueries(inputs);
  };

  return (
    <div className={style.filters}>
      <div className={style.categories}>
        <h5>Categories</h5>
        <select name="category" onChange={changeHandler}>
          <option value="">All</option>
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={style.size}>
        <h5>Size (cm)</h5>
        <input
          name="width"
          className={style.whl}
          type="number"
          placeholder="w"
          onChange={changeHandler}
        />
        x
        <input
          name="height"
          className={style.whl}
          type="number"
          placeholder="h"
          onChange={changeHandler}
        />
        x
        <input
          name="length"
          className={style.whl}
          type="number"
          placeholder="l"
          onChange={changeHandler}
        />
      </div>
      <div className={style.date}>
        <div className={style.dates}>
          <h5>Date Start</h5>
          <input
            name="dateStart"
            type="date"
            required
            onChange={changeHandler}
          ></input>
        </div>
        <div className={style.dates}>
          <h5>Date End</h5>
          <input
            name="dateEnd"
            type="date"
            required
            onChange={changeHandler}
          ></input>
        </div>
      </div>
      <div className={style["btn-filter"]}>
        <button onClick={filterHandler}>Filter</button>
      </div>
    </div>
  );
}

export default FilterAndSort;
