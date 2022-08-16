import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cardService from "../service/cardService";

function DeleteCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function deleteCard() {
      await cardService.deleteCard(id);
      navigate("/");
    }
    deleteCard();
  });
  return null;
}

export default DeleteCard;
