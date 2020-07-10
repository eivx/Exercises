/*
 * @Author: SileR
 * @Date: 2020-07-09 17:55:32
 * @Last Modified by: SileR
 * @Last Modified time: 2020-07-10 10:47:50
 */
import React, { useState } from "react";
const PersonsDisplay = ({ persons }) =>
  persons.map((person) => (
    <p key={person.name}>
      <span>{person.name}</span>
      <span> {person.number}</span>
    </p>
  ));
const Filter = ({ filter, filterInputChange }) => (
  <div>
    filter shown with: <input value={filter} onChange={filterInputChange} />
  </div>
);
const PersonForm = ({
  addPerson,
  newName,
  nameInputChange,
  newNumber,
  numberInputChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={nameInputChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={numberInputChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 12121212 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const ifFun = (arr) => {
    return arr.name.toString() === newName.toString();
  };
  const personsToShow = !filter
    ? persons
    : persons.filter((person) => person.name.indexOf(filter) !== -1);
  console.log(personsToShow);
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.findIndex(ifFun) === -1) {
      const personOj = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personOj));
      // 初始化
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    }
  };
  // input同步
  const nameInputChange = (event) => {
    setNewName(event.target.value);
  };
  const numberInputChange = (event) => {
    setNewNumber(event.target.value);
  };
  const filterInputChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} filterInputChange={filterInputChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        nameInputChange={nameInputChange}
        numberInputChange={numberInputChange}
      />
      <h2>Numbers</h2>
      <PersonsDisplay persons={personsToShow} />
    </div>
  );
};

export default App;
