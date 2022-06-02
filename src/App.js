import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
  }, []);

  const handleNewName = e => {
    setNewName(e.target.value);
  }

  const handleNewNumber = e => {
    setNewNumber(e.target.value);
  }

  const addNewPerson = e => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (existingName()) {
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const existingName = () => {
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return true;
    }
    return false;
  }

  const handleFilter = (e) => {
    if (e.target.value) {
      const newFilter = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilteredPersons(newFilter);
    } else {
      setFilteredPersons(persons);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm
        handleSubmit={addNewPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
