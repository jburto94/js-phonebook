const PersonForm = ({ handleSubmit, handleNewName, handleNewNumber, newName, newNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label>name:</label> <input onChange={handleNewName} value={newName} />
      <br />
      <label>number:</label> <input onChange={handleNewNumber} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm;