import React, { useState, useEffect } from "react";
import Task from "./Task";
import "./styles.css";

const Todo = (props) => {
  const [lists, setLists] = useState([]);
  const [currListIndex, setCurrListIndex] = useState(undefined);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [editableTitle, setEditableTitle] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const serverURL = "http://localhost:9999/";

  /******** Functions for CRUD operations on List ********/
  // Create: List
  // TODO: function for Create List
  const addList = () => {
    fetch(`${serverURL}todoList/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listName: `List ${lists.length + 1}`,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...lists];
        temp.push(result.data.list);
        setLists(temp);
        setCurrListIndex(temp.length - 1);
        setEditableTitle(true);
      });
  };

  // Read: array of List
  useEffect(() => {
    fetch(`${serverURL}todoList/`, { credentials: "include" })
      .then((response) => response.json())
      .then((res) => {
        const sortedArr = res.data.lists.sort((a, b) => {
          const aDate = new Date(a.creationTime).valueOf();
          const bDate = new Date(b.creationTime).valueOf();
          return aDate - bDate;
        });
        setLists(sortedArr);
        setCurrListIndex(0);
      });
  }, []);

  // Update: name of ith List
  const updateTitle = () => {
    const id = lists[currListIndex]._id;
    fetch(`${serverURL}todoList/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listName: updatedTitle }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...lists];
        temp[currListIndex] = result.data.list;
        setLists(temp);
      });
    setEditableTitle(false);
  };

  // Delete: ith List
  const deleteList = (i) => {
    const id = lists[i]._id;
    fetch(`${serverURL}todoList/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...lists];
        temp.splice(i, 1);
        if (i >= temp.length) {
          setCurrListIndex(temp.length - 1);
        }
        if (temp.length <= 0) {
          setCurrListIndex(undefined);
        }
        setLists(temp);
      });
  };
  /******* End of CRUD operations on  List*******/

  /******** Functions for CRUD operations on Individual Todo ********/

  // Create: Add Item to List
  const add = () => {
    if (newTask !== "") {
      fetch(`${serverURL}todo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: newTask,
          listId: lists[currListIndex]._id,
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          const temp = [...tasks];
          temp.push(result.data.todo);
          setTasks(temp);
          setNewTask("");
        });
    }
  };

  // Read: array of Todo
  useEffect(() => {
    if (currListIndex !== undefined) {
      fetch(`${serverURL}todo/${lists[currListIndex]._id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((res) => {
          const sortedArr = res.data.todos.sort((a, b) => {
            const aDate = new Date(a.creationTime).valueOf();
            const bDate = new Date(b.creationTime).valueOf();
            return aDate - bDate;
          });
          setTasks(sortedArr);
        });
      setUpdatedTitle(lists[currListIndex].listName);
    }
  }, [currListIndex, lists]);

  // Update: 1) Edit ith item to updatedText.
  const editItem = (i, updatedText) => {
    const id = tasks[i]._id;
    fetch(`${serverURL}todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: updatedText }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...tasks];
        temp[i] = result.data.todo;
        setTasks(temp);
      });
  };

  // Update: 2) Toggle Completion of ith item.
  const toggleCompletion = (i) => {
    const id = tasks[i]._id;
    fetch(`${serverURL}todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !tasks[i].isDone }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...tasks];
        temp[i] = result.data.todo;
        setTasks(temp);
      });
  };

  // Delete: ith item from List
  const deleteItem = (i) => {
    const id = tasks[i]._id;
    fetch(`${serverURL}todo/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...tasks];
        temp.splice(i, 1);
        setTasks(temp);
      });
  };

  /******* End of CRUD operations on Individual Todo*******/

  //Keep Track of new task input
  const updateNewTask = ({ target }) => {
    setNewTask(target.value);
  };

  return (
    <div className="todo-main">
      <div className="todo-header">
        <i className="fas fa-external-link-alt"></i>
        {editableTitle ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            onBlur={updateTitle}
            autoFocus
            autoComplete="off"
          />
        ) : (
          <span onClick={() => setEditableTitle(true)}>
            {lists[currListIndex] && lists[currListIndex].listName}
          </span>
        )}
        <i
          className="fas fa-trash-alt"
          onClick={() => deleteList(currListIndex)}
        ></i>
      </div>
      <div className="todo-container">
        <ul>
          {tasks.map((val, index) => {
            return (
              <Task
                key={`${val._id}_${val.__v}`}
                text={val.task}
                index={index}
                isDone={val.isDone}
                toggleCompletion={toggleCompletion}
                deleteCallback={deleteItem}
                editCallback={editItem}
              />
            );
          })}
        </ul>
        <div className="new-todo">
          <input
            type="text"
            onChange={updateNewTask}
            placeholder="Enter new item here"
            autoComplete="off"
            autoFocus
            value={newTask}
          />
          <i className="fas fa-plus-circle ico-btn" onClick={add}></i>
        </div>
      </div>
      <div className="todo-footer">
        <button
          disabled={currListIndex <= 0}
          className="icon-btn"
          onClick={() => setCurrListIndex(currListIndex - 1)}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <i
          className="fas fa-plus-circle ico-btn add-todo-list"
          onClick={addList}
        ></i>
        <button
          disabled={currListIndex >= lists.length - 1}
          className="icon-btn"
          onClick={() => setCurrListIndex(currListIndex + 1)}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
