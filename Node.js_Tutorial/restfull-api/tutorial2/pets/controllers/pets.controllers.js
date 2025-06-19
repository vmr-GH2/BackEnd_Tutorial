//import { getItem, listItems, editItem, addItem, deleteItem } from '../models/pets.models.js'

const {
  getItem,
  listItems,
  editItem,
  addItem,
  deleteItem,
} = require("../models/pets.models.js");

const getPet = (req, res) => {
  try {
    const resp = getItem(parseInt(req.params.id));
    if (!resp) res.status(404).json("pet is not found");
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).send(err);
  }
};

const listPets = (req, res) => {
  try {
    const resp = listItems();
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).send(err);
  }
};

const editPet = (req, res) => {
  try {
    const resp = editItem(parseInt(req.params.id), req.body);
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addPet = (req, res) => {
  try {
    const resp = addItem(req.body);
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deletePet = (req, res) => {
  try {
    const resp = deleteItem(parseInt(req.params.id));
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { listPets, getPet, editPet, addPet, deletePet };
