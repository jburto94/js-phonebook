import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

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
    if (persons.find(person => person.name == newName)) {
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
      filter shown with: <input onChange={handleFilter} />
      <h2>Add new contact</h2>
      <form onSubmit={addNewPerson}>
        <div>
          <label>name:</label> <input onChange={handleNewName} value={newName} />
          <br />
          <label>number:</label> <input onChange={handleNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
