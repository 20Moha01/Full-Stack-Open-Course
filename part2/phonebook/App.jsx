import { useState } from "react";

const ContactInfo = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const ContactList = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <ContactInfo key={person.id} person={person} />
      ))}
    </>
  );
};

const NewContactForm = ({ onSubmit, nameValue, numberValue, onChange }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <p>
            name:{" "}
            <input
              className="nameInput"
              value={nameValue}
              onChange={onChange}
            />
          </p>
          <p>
            number:{" "}
            <input
              className="numberInput"
              value={numberValue}
              onChange={onChange}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const FilterByName = ({ value, onChange }) => {
  return (
    <>
      filter shown with{" "}
      <input className="nameInput" value={value} onChange={onChange} />
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    { name: "Mohamed El Kanboui Bouaacha", number: "344-450138", id: 5 },
    { name: "Ilyas El Kanboui Bouaacha", number: "012-783494", id: 6 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const handleNewContact = (event) => {
    event.preventDefault();

    if (newName === "" || newPhone === "") return alert("Missing fields");
    if (persons.filter((person) => person.name === newName).length > 0) {
      setNewName("");
      setNewPhone("");
      return alert(`${newName} is already added to phonebook`);
    }

    const newContactObj = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newContactObj));
    setNewName("");
    setNewPhone("");
  };

  const handleFormChange = (event) => {
    if (event.target.className === "nameInput") setNewName(event.target.value);
    else if (event.target.className === "numberInput")
      setNewPhone(event.target.value);
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
      <FilterByName
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <h3>add a new</h3>
      <NewContactForm
        onSubmit={handleNewContact}
        nameValue={newName}
        numberValue={newPhone}
        onChange={handleFormChange}
      />
      <h3>Numbers</h3>
      <ContactList persons={filteredContacts} />
    </>
  );
};

export default App;
