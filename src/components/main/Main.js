import React, { useEffect, useReducer, useState } from "react";
import ContactsForm from "../contactsForm/ContactsForm";
import ContactsList from "../contactsList/ContactsList";
import Search from "../search/Search";
import styles from "./Main.module.css";

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [inputData, setInputData] = useState({ name: "", number: "" });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts) setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (inputData.number.length < 8) {
      alert("your phone number length at least should be 8 characters");
    } else if (!inputData.name || !inputData.number) {
      alert("please filled out the inputs");
    } else {
      setContacts([
        ...contacts,
        {
          name: inputData.name,
          number: inputData.number,
          id: Math.floor(Math.random() * 1000),
        },
      ]);
    }
  };

  const removeHandler = (id) => {
    const removedContact = contacts.filter((contact) => contact.id !== id);
    setContacts(removedContact);
  };

  const editHandler = (id) => {
    const name = contacts.find((contact) => contact.id === id).name;
    const number = contacts.find((contact) => contact.id === id).number;
    setInputData({ name, number });
    setEditId(id);
  };

  const editSubmit = (e) => {
    e.preventDefault();
    const seletedContact = contacts.findIndex(
      (contact) => contact.id === editId
    );
    const contact = { ...contacts[seletedContact] };
    contact.name = inputData.name;
    contact.number = inputData.number;

    const updatedContacts = [...contacts];
    updatedContacts[seletedContact] = contact;
    setContacts(updatedContacts);
    setInputData({ name: "", number: "" });
    setEditId("");
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchedContact = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={styles.main}>
      <ContactsForm
        addContact={addContact}
        editId={editId}
        setEditId={setEditId}
        setContacts={setContacts}
        contacts={contacts}
        editSubmit={editSubmit}
        inputData={inputData}
        setInputData={setInputData}
      />

      <Search searchValue={searchValue} searchHandler={searchHandler} />

      <ContactsList
        contacts={contacts}
        searchedContact={searchedContact}
        removeHandler={removeHandler}
        editHandler={editHandler}
        editId={editId}
        setEditId={setEditId}
        setContacts={setContacts}
      />
    </div>
  );
};

export default Main;
