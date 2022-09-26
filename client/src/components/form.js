import { useState } from "react";

const Form = (props) => {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
  });

  //create functions that handle the event of the user typing into the form
  const handleNameChange = (event) => {
    const firstname = event.target.value;
    setStudent((student) => ({ ...student, firstname }));
  };

  const handleLastnameChange = (event) => {
    const lastname = event.target.value;
    setStudent((student) => ({ ...student, lastname }));
  };

  //A function to handle the post request
  const postStudent = async (newStudent) => {
    const response = await fetch("http://localhost:4000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    const data = await response.json();
    console.log("From the post ", data);
    props.addStudent(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postStudent(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>First Name</label>
        <input
          type="text"
          id="add-user-name"
          placeholder="First Name"
          required
          value={student.name}
          onChange={handleNameChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          id="add-user-lastname"
          placeholder="Last Name"
          required
          value={student.lastname}
          onChange={handleLastnameChange}
        />
      </fieldset>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
