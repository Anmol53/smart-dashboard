import React, { useState, useEffect } from "react";
import SlideCard from "./../SlideCard";
import "./styles.css";

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [currIndex, setCurrIndex] = useState(undefined);
  const [editableNote, setEditableNote] = useState(false);
  const [updatedNote, setUpdatedNote] = useState("");
  const [willFetch, setWillFetch] = useState(true);

  useEffect(() => {
    if (currIndex !== undefined) {
      setUpdatedNote(notes[currIndex].note);
    }
  }, [notes, currIndex]);

  const serverURL = "http://localhost:9999/";

  /******** Functions for CRUD operations on Note ********/
  // Create: Note
  const addNote = () => {
    fetch(`${serverURL}note/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Title ${notes.length + 1}`,
        note: "",
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...notes];
        temp.push(result.data.note);
        setNotes(temp);
        setCurrIndex(temp.length - 1);
      });
  };

  // Read: array of Notes
  useEffect(() => {
    if (willFetch) {
      fetch(`${serverURL}note/`, { credentials: "include" })
        .then((response) => response.json())
        .then((res) => {
          const sortedArr = res.data.notes.sort((a, b) => {
            const aDate = new Date(a.creationTime).valueOf();
            const bDate = new Date(b.creationTime).valueOf();
            return aDate - bDate;
          });
          setNotes(sortedArr);
          setCurrIndex(0);
        });
    }
    setWillFetch(false);
  }, [willFetch]);

  // Update: Title
  const updateTitle = (updatedTitle) => {
    const id = notes[currIndex]._id;
    fetch(`${serverURL}note/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updatedTitle }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...notes];
        temp[currIndex] = result.data.note;
        setNotes(temp);
      });
  };

  // Update: Note
  const updateNote = () => {
    const id = notes[currIndex]._id;
    fetch(`${serverURL}note/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: updatedNote }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...notes];
        temp[currIndex] = result.data.note;
        setNotes(temp);
        setEditableNote(false);
      });
  };

  // Delete: ith Note
  const deleteNote = (i) => {
    const id = notes[i]._id;
    fetch(`${serverURL}note/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...notes];
        temp.splice(i, 1);
        if (temp.length <= 0) {
          setWillFetch(true);
          setCurrIndex(undefined);
        } else if (i >= temp.length) {
          setCurrIndex(temp.length - 1);
        }
        setNotes(temp);
      });
  };
  /******* End of CRUD operations on  List*******/

  return (
    <SlideCard
      list={notes.map((l) => l.title)}
      updateTitle={updateTitle}
      deleteItem={deleteNote}
      addItem={addNote}
      currIndex={currIndex}
      setCurrIndex={setCurrIndex}
      // TODO: Create function for fullscreen
      /*fullScreen= do something*/
    >
      {currIndex !== undefined && (
        <div className="note-container">
          {editableNote ? (
            <textarea
              onChange={(e) => setUpdatedNote(e.target.value)}
              value={updatedNote}
              placeholder="Add new note here..."
              autoFocus
              autoComplete="off"
              onBlur={updateNote}
            ></textarea>
          ) : (
            <span onClick={() => setEditableNote(true)}>
              {notes[currIndex].note}
            </span>
          )}
        </div>
      )}
    </SlideCard>
  );
};

export default Notes;
