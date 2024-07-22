import React, { useState } from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = ({
  id,
  title,
  description,
  completed,
  onEdit,
  onDelete,
  isEditing,
}) => {
  const handleCheckboxChange = (value) => {
    console.log(value);
  };

  return (
    <div
      className={`todo-item ${completed && "todo-completed"} ${
        isEditing && "editing"
      }`}
    >
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox checked={!!completed} onChange={handleCheckboxChange} />
          <h4>
            #{id} {title}
          </h4>
        </div>
        <div>
          <div onClick={(e) => onEdit(id, e)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </div>
          <div onClick={(e) => onDelete(id, e)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div className="separator"></div>
      <p>{description}</p>
    </div>
  );
};

export default TodoItem;
