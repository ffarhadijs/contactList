import React from "react";
import man from "../../images/man.png";
import woman from "../../images/woman.png";
import removeContact from "../../images/removeContact.png";
import editContact from "../../images/editContact.png";
import styles from "./ContactList.module.css";

const ContactsList = (props) => {
  return (
    <div className={styles.contactList}>
      {props.contacts.length === 0 && <h2>add contact</h2>}
      {props.editId ? null : (
        <div>
          {props.searchedContact.map((contact) => (
            <div key={contact.id} className={styles.contact}>
              <div className={styles.infosection}>
                <div className={styles.profileImage}>
                  {contact.gender === "male" ? (
                    <img src={man} className={styles.image} />
                  ) : (
                    <img src={woman} className={styles.image} />
                  )}
                </div>
                <div className={styles.text}>
                  <p>
                    Name: <span>{contact.name}</span>
                  </p>
                  <p>
                    Number: <span>{contact.number}</span>
                  </p>
                </div>
              </div>
              <div className={styles.btns}>
                <button
                  className={styles.btn}
                  onClick={() => props.removeHandler(contact.id)}
                >
                  {<img src={removeContact} />}
                </button>
                <button
                  className={styles.btn}
                  onClick={() => props.editHandler(contact.id)}
                >
                  {<img src={editContact} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsList;
