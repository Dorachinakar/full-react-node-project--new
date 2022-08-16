import httpService from "./httpService";
export function createCard(card) {
  return httpService.post("/card/mycards/addCard", card);
}
export function getAll() {
  return httpService.get("/card/mycards");
}

export function deleteCard(id) {
  return httpService.delete(`/card/cardDelete/cardId/${id}`);
}
export function updateCard(id, values) {
  return httpService.put(`card/editCardById/cardId/${id}`, values);
}

const cardsService = {
  createCard,
  getAll,
  deleteCard,
  updateCard,
};

export default cardsService;
