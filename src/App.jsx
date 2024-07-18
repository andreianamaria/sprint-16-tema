import React, { useState, useEffect } from "react";
import Card from "./components/card/Card";
import Input from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";
import TextArea from "./components/input/TextArea";
import Button from "./components/button/Button";
import "./App.css";

const todoMocks = [
  {
    id: "1",
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
];

function App() {
  let savedTodos = localStorage.getItem("todos");
  savedTodos = savedTodos ? JSON.parse(savedTodos) : todoMocks;
  const [todos, setTodos] = useState(savedTodos);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let completedTodos, regularTodos;
  completedTodos = todos.filter((todo) => todo.completed);
  regularTodos = todos.filter((todo) => !todo.completed);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: title,
        description: description,
        completed: false,
      },
    ]);
  };
  const handleEdit = (event) => {};
  const handleDelete = (event) => {
    const elParent = event.target.parentNode ? event.target.parentNode : null;
    if (elParent) {
      const classes = Array.from(elParent.classList);
      const deleteClasses = classes.filter((item) => item.includes("delete-"));
      let elemId = null;
      if (deleteClasses[0]) {
        elemId = deleteClasses[0].slice(-1);
      }
      console.log(elemId);
      if (elemId) {
        const newTasks = todos.filter((task) => {
          console.log(task.id);
          return task.id != elemId;
        });
        console.log(newTasks);
        setTodos(newTasks);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <div className="app-container">
        {/* 
            This is your Create Card component.
          */}
        <Card>
          <h2>Create Todo</h2>
          <form onSubmit={handleSubmit}>
            <Input
              onChange={handleTitleChange}
              placeholder="Title"
              type="text"
              name="title"
            />
            <TextArea
              onChange={handleDescriptionChange}
              placeholder="Description"
              name="description"
            />
            <Button type="submit">Create</Button>
          </form>
        </Card>

        {/* 
          My Todos
        */}
        <Card>
          <h1>My todos</h1>
          <Button onClick={() => console.log("Open Modal")}>Add +</Button>
          <div className="list-container">
            {regularTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className="list-container">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
