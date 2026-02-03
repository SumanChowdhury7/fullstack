import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description 1",
    },
    {
      title: "test title 2",
      description: "test description 2",
    },
    {
      title: "test title 3",
      description: "test description 3",
    },
    {
      title: "test title 4",
      description: "test description 4",
    },
  ]);
  axios.get("http://localhost:3000/notes").then((res) => {
    setNotes(res.data.data);
  });
  return (
    <>
      <div className="notes">
        {notes.map((e, idx) => {
          return (
            <div key={idx} className="note">
              <h2>{e.title}</h2>
              <p>{e.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
