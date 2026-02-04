import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [notes, setnNotes] = useState([]);

  const fetchNotes = () => {
    axios.get("http://localhost:3000/notes").then((res) => {
      console.log("hello");
      setnNotes(res.data.note);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);
const submitHandler = (e)=>{
e.preventDefault();

const {title, description} = e.target.elements;
console.log(title.value,description.value)
axios.post('http://localhost:3000/notes',{
  title: title.value,
  description: description.value
})
.then(res=>{
  console.log(res.data);
  fetchNotes()
})

}

const deleteHandler = (noteId)=>{
axios.delete(`http://localhost:3000/notes/${noteId}`)
.then(()=>{
  fetchNotes();
})
}

const updateHandler = (noteId)=>{
  const newDesc = prompt("Enter your new description");

  axios.patch(`http://localhost:3000/notes/${noteId}`, {
    description: newDesc
  })
  .then(()=>{
    fetchNotes();
  })
}

  return (
    <>
    <form onSubmit={submitHandler} className="note-create-form">
      <input name="title" type="text" placeholder="Enter Title" />
      <input name="description" type="text" placeholder="Enter Description" />
      <button>Create Note</button>
    </form>

      <div className="notes">
        {notes.map((e, idx) => {
          return (
            <div key={idx} className="note">
              <h2>{e.title}</h2>
              <p>{e.description}</p>
              <div className="buttons">
                <button onClick={()=>{updateHandler(e._id)}}className="update">Update</button>
                <button onClick={()=>{deleteHandler(e._id)}} className="delete">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
