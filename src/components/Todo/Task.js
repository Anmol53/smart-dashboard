import React, { useState, Fragment } from "react";

export default function Task(props) {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(props.text);

  //Callback edittext & reset states if updated text is not empty.
  const editText = () => {
    if (text !== "") {
      props.editCallback(props.index, text);
      setEditable(false);
    }
  };

  return (
    <li className={`task-item ${props.isDone && "todo-done"}`}>
      <span
        className={`bullet`}
        onClick={() => {
          props.toggleCompletion(props.index);
        }}
      >
        {props.isDone && <i className="fas fa-check todo-done-tick"></i>}
      </span>

      {editable ? (
        <>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="This can't be empty"
            autoFocus
            autoComplete="off"
            onBlur={editText}
          />
        </>
      ) : (
        <>
          <span className={`todo-task`} onClick={() => setEditable(true)}>
            {text}
          </span>
        </>
      )}
      <i
        className="fas fa-trash-alt ico-btn"
        onClick={() => props.deleteCallback(props.index)}
      ></i>
    </li>
  );
}
