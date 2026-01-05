import { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import FilterByName from "./components/FilterByName";
import contactServices from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const fetchPersons = () => {
    contactServices.getAll().then((contacts) => {
      setPersons(contacts);
    });
  };

  const handleShowNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 3000);
  };

  useEffect(fetchPersons, []);

  const handleNewContact = (event) => {
    event.preventDefault();

    if (newName === "" || newPhone === "") {
      handleShowNotification("Missing field(s)", "warning");
      return;
    }
    const contact = persons.find((person) => person.name === newName);
    if (contact) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        handleUpdateContact(contact);
      } else {
        setNewName("");
        setNewPhone("");
      }
      return;
    }

    // Dejamos al servidor que se encargue de la generación de un id único
    const newContactObj = {
      name: newName,
      number: newPhone,
    };

    contactServices
      .create(newContactObj)
      .then((newContact) => {
        setPersons(persons.concat(newContact));
        setNewName("");
        setNewPhone("");
        handleShowNotification(`${newName} was successfully added`, "success");
      })
      .catch((error) => console.log(error));
  };

  const handleFormChange = (event) => {
    if (event.target.className === "nameInput") setNewName(event.target.value);
    else if (event.target.className === "numberInput")
      setNewPhone(event.target.value);
  };

  const handleDeleteContact = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`
      )
    ) {
      contactServices
        .deleteContact(id)
        .then((deletedContact) => {
          setPersons(persons.filter((person) => person.id !== id));
          handleShowNotification(
            `${deletedContact.name} was successfully deleted`,
            "success"
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateContact = (contact) => {
    contactServices
      .update(contact.id, { ...contact, number: newPhone })
      .then((updatedContact) => {
        setPersons(
          persons.map((person) => {
            return person.id === contact.id ? updatedContact : person;
          })
        );
        setNewName("");
        setNewPhone("");
      })
      .catch(() => {
        handleShowNotification(
          `Information of ${contact.name} has already been removed from the server`,
          "error"
        );
      });
  };

  const filteredContacts =
    nameFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        );

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <FilterByName
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <h3>add a new</h3>
      <ContactForm
        onSubmit={handleNewContact}
        nameValue={newName}
        numberValue={newPhone}
        onChange={handleFormChange}
      />
      <h3>Numbers</h3>
      <ContactList persons={filteredContacts} onDelete={handleDeleteContact} />
    </>
  );
};

export default App;
