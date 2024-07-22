import React from "react";
import Card from "./Card";
import TextArea from "../input/TextArea";
import Input from "../input/Input";
import Button from "../button/Button";

const SelectedTaskForm = ({
  handleNewTask,
  id,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  handleEditTask,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      handleEditTask();
    } else {
      handleNewTask();
    }
  };

  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    onDescriptionChange(event.target.value);
  };

  return (
    <Card>
      <h2>{id ? "Edit" : "Create"} Todo</h2>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={handleTitleChange}
          placeholder="Title"
          type="text"
          name="title"
          value={title}
        />
        <TextArea
          onChange={handleDescriptionChange}
          placeholder="Description"
          name="description"
          value={description}
        />
        <Button type="submit">{id ? "Edit" : "Create"}</Button>
      </form>
    </Card>
  );
};

export default SelectedTaskForm;
