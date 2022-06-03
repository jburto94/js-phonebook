import { useState, useEffect } from 'react';
import personService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    showNewList();
  }, []);

  const showNewList = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
      });
  }

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

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setFilteredPersons(filteredPersons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
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

  const removePerson = id => {
    const person = persons.find(person => person.id === id);

    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .deletePerson(id);

      showNewList();
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
      <Persons persons={filteredPersons} handleDelete={removePerson} />
    </div>
  );
};

export default App;
