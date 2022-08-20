import React, { useState, useEffect } from "react";
import Task from "./Task";
import SlideCard from "./../SlideCard";
import "./styles.css";

const Todo = (props) => {
  const [lists, setLists] = useState([]);
  const [currListIndex, setCurrListIndex] = useState(undefined);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [willFetch, setWillFetch] = useState(true);

  const serverURL = "http://localhost:9999/";

  /******** Functions for CRUD operations on List ********/
  // Create: List
  const addList = () => {
    fetch(`${serverURL}todoList/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listName: `Title ${lists.length + 1}`,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...lists];
        temp.push(result.data.list);
        setLists(temp);
        setCurrListIndex(temp.length - 1);
      });
  };

  // Read: array of List
  useEffect(() => {
    if (willFetch) {
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
    }
    setWillFetch(false);
  }, [willFetch]);

  // Update: name of ith List
  const updateTitle = (updatedTitle) => {
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
        if (temp.length <= 0) {
          setWillFetch(true);
          setCurrListIndex(undefined);
        } else if (i >= temp.length) {
          setCurrListIndex(temp.length - 1);
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
    if (lists && lists.length > 0 && currListIndex !== undefined) {
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
    <SlideCard
      list={lists.map((l) => l.listName)}
      updateTitle={updateTitle}
      deleteItem={deleteList}
      addItem={addList}
      currIndex={currListIndex}
      setCurrIndex={setCurrListIndex}
      // TODO: Create function for fullscreen
      /*fullScreen= do something*/
    >
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
    </SlideCard>
  );
};

export default Todo;
