import React, { useEffect } from "react";
import styles from "./ContactsForm.module.css";
import addContact from "../../images/addContact.png";
import editContact from "../../images/editContact.png";

const ContactsForm = (props) => {
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [props.editId]);

  const changeHandler = (e) => {
    props.setInputData({ ...props.inputData, [e.target.name]: e.target.value });
  };

  const addSubmit = (e) => {
    e.preventDefault();
    props.addContact(props.inputData);
    props.setInputData({ name: "", number: "" });
  };

  return (
    <div className={styles.contactForm}>
      {props.editId ? <h1>Edit contacts list</h1> : <h1>Add contacts list</h1>}
      <form className={styles.form} onSubmit={props.editId ? (e) => props.editSubmit(e) : addSubmit}>
        <input
          minLength={3}
          ref={inputRef}
          type={"text"}
          name="name"
          placeholder={props.editId ? "edit name" : "add name"}
          value={props.inputData.name}
          onChange={changeHandler}
        />
        <input
          type={"number"}
          name="number"
          placeholder={props.editId ? "edit number" : "add number"}
          value={props.inputData.number}
          onChange={changeHandler}
        />
        {props.editId ? (
          <button type="submit">{<img src={editContact} />}</button>
        ) : (
          <button type="submit">{<img src={addContact} />}</button>
        )}
      </form>
    </div>
  );
};

export default ContactsForm;
