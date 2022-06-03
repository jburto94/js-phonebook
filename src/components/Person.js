import DeleteButton from "./DeleteButton";

const Person = ({ person, handleDelete }) => {
  return (
    <li>{person.name} {person.number} <DeleteButton handleClick={handleDelete} id={person.id} /></li>
  );
};

export default Person;