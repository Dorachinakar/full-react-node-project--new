import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import EditCard from "./edit";

function Card({
  card: { _id, businessName, businessDiscribe, businessAdress, businessPhone, businessPicture },
  editCard,
  card,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={businessPicture} className="card-img-top" alt={businessName} />
      <div className="card-body">
        <h5 className="card-title">{businessName}</h5>
        <p className="card-text">{businessDiscribe}</p>

        <ul className="list-group list-group-flush">
          <div className="list-group-item">{businessAdress}</div>
          <div className="list-group-item">{businessPhone}</div>
        </ul>

        <button
          type="button"
          className="btn btn-warning mx-2"
          data-bs-toggle="modal"
          data-bs-target="#editmodal"
        >
          edit <i className="bi bi-pencil-fill"></i>
        </button>
        <EditCard card={card} editCard={editCard}></EditCard>

        <Link to={`/mycards/delete/${_id}`} className="card-link">
          delete
        </Link>
      </div>
    </div>
  );
}

export default Card;
