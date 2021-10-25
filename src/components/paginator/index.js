import React, { useState, useEffect } from "react";
import "./paginator.css";

export default function Paginator({
  length,
  perPage,
  setPerPage,
  currentPage,
  setCurrentPage,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);
  useEffect(() => {
    let page = [];
    for (let i = 1; i <= Math.ceil(length / perPage); i++) {
      page.push(i);
    }
    setPageNumbers(page);
  }, [length, perPage]);

  if (length < 1) {
    return <div></div>;
  }

  return (
    <ul className="paginator">
      {pageNumbers.map((number) => (
        <li
          className={number === currentPage ? "active" : ""}
          key={number}
          id={number}
          onClick={() => setCurrentPage(~~number)}
        >
          {number}
        </li>
      ))}
      <li>
        Go To{" "}
        <input
          className="paginator-input"
          type="number"
          min={1}
          value={currentPage}
          onChange={(e) =>
            setCurrentPage(
              Math.min(Math.max(~~e.target.value, 1), ~~pageNumbers.at(-1))
            )
          }
        ></input>
      </li>
      <li>
        Per page{" "}
        <input
          className="paginator-input"
          type="number"
          min={1}
          value={perPage}
          onChange={(e) => {
            setPerPage(Math.max(~~e.target.value, 1));
            setCurrentPage(1);
          }}
        ></input>
      </li>
    </ul>
  );
}
