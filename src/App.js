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
    };

    personService
      .create(newPerson)
      .then(returnedPerson => {
        showNewList();
        setNewName('');
        setNewNumber('');
      });
  };

  const existingName = () => {
    return persons.find(person => person.name === newName);
  };

  const editNumber = (e) => {
    e.preventDefault();

    const person = persons.find(p => p.name === newName);

    const updatedPerson = {
      name: newName,
      number: newNumber
    };

    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with the new one?`)) {
      personService
        .update(person.id, updatedPerson)
        .catch(error => {
          alert(`The person ${person.name} has already been deleted from the server`);
        });

      showNewList();
    }
  };

  const handleFilter = (e) => {
    if (e.target.value) {
      const newFilter = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilteredPersons(newFilter);
    } else {
      setFilteredPersons(persons);
    }
  };

  const removePerson = id => {
    const person = persons.find(person => person.id === id);

    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .deletePerson(id);

      showNewList();
    }
  }

  const handleSubmit = (e) => {
    existingName()
      ? editNumber(e) : addNewPerson(e);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm
        handleSubmit={handleSubmit}
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