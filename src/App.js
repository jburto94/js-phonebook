import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleNewName = e => {
    setNewName(e.target.value);
  }

  const addNewPerson = e => {
    e.preventDefault();
    const newPerson = {
      name: newName
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleNewName} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
