import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '888-456-5123'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
