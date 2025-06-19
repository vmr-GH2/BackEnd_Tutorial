//import db from '../../db/db.js'
const db = require("../../db/db.js");

const getItem = (id) => {
  try {
    const pet = db?.pets?.filter((pet) => pet?.id === id)[0];
    return pet;
  } catch (err) {
    console.log("Error", err);
  }
};

const listItems = () => {
  try {
    return db?.pets;
  } catch (err) {
    console.log("Error", err);
  }
};

const editItem = (id, data) => {
  try {
    const index = db.pets.findIndex((pet) => pet.id === id);

    if (index === -1) throw new Error("Pet not found");
    else {
      const editedData = {id,...data};
      db.pets[index] = editedData;
      return db.pets[index];
    }
  } catch (err) {
    console.log("Error", err);
  }
};

const addItem = (data) => {
  try {
    const newPet = { id: db.pets.length + 1, ...data };
    db.pets.push(newPet);
    return newPet;
  } catch (err) {
    console.log("Error", err);
  }
};

const deleteItem = (id) => {
  try {
    // delete item from db
    const index = db.pets.findIndex((pet) => pet.id === id);

    if (index === -1) throw new Error("Pet not found");
    else {
      db.pets.splice(index, 1);
      return db.pets;
    }
  } catch (error) {}
};

module.exports = { getItem, listItems, editItem, addItem, deleteItem };
