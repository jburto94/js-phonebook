const DeleteButton = ({ handleClick, id }) => {
  return (
    <button onClick={() => handleClick(id)}>Delete</button>
  )
}

export default DeleteButton;