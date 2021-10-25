import React, { useState, useEffect } from "react";
import Card from "../card";
import "./customContainer.css";
import Paginator from "../paginator";

export default function CustomContainer() {
  const [data, setData] = useState(init);
  const [friend, setFriend] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredText, setFilteredText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [paginatedData, setPaginatedData] = useState([]);

  const sortByIndex = (a, b) => a.id - b.id;
  useEffect(() => {
    setData(init.sort(sortByIndex));
  }, []);

  useEffect(() => {
    const filteredItem = data.filter((i) => i.name.includes(filteredText));
    setFilteredData(filteredItem);
  }, [filteredText, data]);

  useEffect(() => {
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const items = (filteredText ? filteredData : data).slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setPaginatedData(items);
  }, [currentPage, perPage, data, filteredText, filteredData]);

  const addFav = (id) => {
    const item = data.find((item) => item.id === id);
    const filterItems = data.filter((item) => item.id !== id);
    const updatedFavItem = {
      ...item,
      fav: !item.fav,
    };
    setData([...filterItems, updatedFavItem].sort(sortByIndex));
  };

  const removeItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData.sort(sortByIndex));
  };

  const addFriend = () => {
    const payload = {
      id: Date.now(),
      name: friend,
      fav: false,
    };
    setData((prev) => [...prev, payload].sort(sortByIndex));
    setFriend("");
  };

  const sortByFav = () => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.sort((x, y) => (x.fav === y.fav ? 0 : x.fav ? -1 : 1));
    setData(dataCopy);
    setCurrentPage(1);
  };

  return (
    <div className="list-container">
      <header className="list-header">
        <h1>Friends List</h1>
      </header>
      <div className="action-container">
        <button onClick={sortByFav}>sort by fav</button>
        <input
          value={filteredText}
          onChange={(e) => setFilteredText(e.target.value)}
          type="search"
          placeholder="Search Friend"
        ></input>
        <input
          type="text"
          value={friend}
          onChange={(e) => setFriend(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addFriend();
            }
          }}
          placeholder="Add friend"
        ></input>
      </div>
      <div className="card-container">
        {(filteredText ? filteredData : paginatedData).map((item) => (
          <Card
            key={item.id}
            item={item}
            addFav={addFav}
            removeItem={removeItem}
          ></Card>
        ))}
      </div>
      <Paginator
        length={filteredText ? filteredData.length : data.length}
        perPage={perPage}
        currentPage={currentPage}
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

const init = [
  { id: 1, name: "vinamra", fav: true },
  { id: 2, name: "bharati", fav: false },
  { id: 3, name: "vivek", fav: false },
  { id: 4, name: "sunny", fav: true },
  { id: 5, name: "nitesh", fav: true },
  { id: 7, name: "utsav", fav: false },
];
