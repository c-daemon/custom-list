import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faStar, faUser } from "@fortawesome/free-solid-svg-icons";

import "./card.css";

export default function Card(props) {
  const { item, removeItem, addFav } = props;

  return (
    <div className="card">
      <div className="card-description">
        <div className="name">{item.name}</div>
        <div className="desc">{`is your ${
          item.fav ? "favourite" : ""
        } friend`}</div>
      </div>
      <div className="card-action">
        <button className="btn" onClick={() => addFav(item.id)}>
          {item.fav ? (
            <FontAwesomeIcon icon={faStar} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </button>
        <button className="btn" onClick={() => removeItem(item.id)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
}
