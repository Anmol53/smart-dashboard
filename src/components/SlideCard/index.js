import React, { useState, useEffect } from "react";
import "./styles.css";

const SlideCard = (props) => {
  /*
   * List of Props
   *    > children : main body content
   *    > list : array of titles
   *    > updateTitle(i, updatedTitle) : callback for edit ith title
   *    > fullScreen() : function to fullscreen
   *    > deleteItem(i) : delete ith item
   *    > addItem() : add item to list
   *    > currIndex : slide index
   *    > setCurrIndex : update slide index of parent
   */
  const [editableTitle, setEditableTitle] = useState(false);
  const list = props.list || [];
  const [updatedTitle, setUpdatedTitle] = useState(list[props.currIndex]);

  useEffect(() => {
    setUpdatedTitle(list[props.currIndex]);
  }, [props.currIndex, list]);

  return (
    <div className="slide-card-main">
      <div className="slide-card-header">
        <i
          className="fas fa-external-link-alt"
          onClick={() => props.fullScreen()}
        ></i>
        {editableTitle ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            onBlur={() => {
              props.updateTitle(updatedTitle);
              setEditableTitle(false);
            }}
            autoFocus
            autoComplete="off"
          />
        ) : (
          <span onClick={() => setEditableTitle(true)}>
            {list[props.currIndex]}
          </span>
        )}
        <i
          className="fas fa-trash-alt"
          onClick={() => props.deleteItem(props.currIndex)}
        ></i>
      </div>
      <div className={`slide-card-container`}>{props.children}</div>
      <div className="slide-card-footer">
        <button
          disabled={props.currIndex <= 0}
          className="icon-btn"
          onClick={() => props.setCurrIndex(props.currIndex - 1)}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <i
          className="fas fa-plus-circle ico-btn slide-card-add-item"
          onClick={() => {
            props.addItem();
            setEditableTitle(true);
          }}
        ></i>
        <button
          disabled={props.currIndex >= props.list.length - 1}
          className="icon-btn"
          onClick={() => props.setCurrIndex(props.currIndex + 1)}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SlideCard;
