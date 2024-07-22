import React, { useState, useEffect } from "react";
import Card from "./components/card/Card";
import TodoItem from "./components/todo-item/TodoItem";
import Button from "./components/button/Button";
import SelectedTaskForm from "./components/card/SelectedTaskForm";
import Modal from "./components/modal/Modal";

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

function TaskManager() {
  const [openModal, setOpenModal] = useState(false);
  let savedTodos = localStorage.getItem("todos");
  savedTodos = savedTodos ? JSON.parse(savedTodos) : todoMocks;
  const [todos, setTodos] = useState(savedTodos);
  const [selectedTask, setSelectedTask] = useState({
    id: "",
    title: "",
    description: "",
  });
  let completedTodos, regularTodos;
  completedTodos = todos.filter((todo) => todo.completed);
  regularTodos = todos.filter((todo) => !todo.completed);

  const selectedTaskTitleChange = (title) => {
    setSelectedTask({ ...selectedTask, title });
  };
  const selectedTaskDescriptionChange = (description) => {
    setSelectedTask({ ...selectedTask, description });
  };
  const handleNewTask = () => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: selectedTask.title,
        description: selectedTask.description,
        completed: false,
      },
    ]);
    setSelectedTask({ id: "", title: "", description: "" });
    setOpenModal(false);
  };

  const handleEditTask = () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === selectedTask.id) {
        todo.title = selectedTask.title;
        todo.description = selectedTask.description;
      }
      return todo;
    });
    setTodos(newTodos);
    setSelectedTask({ id: "", title: "", description: "" });
    setOpenModal(false);
  };

  const handleActiveTaskEdit = (id) => {
    setOpenModal(true);
    const task = todos.find((task) => {
      return task.id === id;
    });
    setSelectedTask(task);
  };
  const handleDelete = (taskId, event) => {
    const newTasks = todos.filter((task) => {
      return task.id !== taskId;
    });
    setTodos(newTasks);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="task-manager-container">
      {/* 
            This is your Create Card component.
          */}

      <Modal isOpen={openModal} onClose={onModalClose}>
        <SelectedTaskForm
          handleNewTask={handleNewTask}
          id={selectedTask.id}
          title={selectedTask.title}
          description={selectedTask.description}
          onTitleChange={selectedTaskTitleChange}
          onDescriptionChange={selectedTaskDescriptionChange}
          handleEditTask={handleEditTask}
        />
      </Modal>

      {/* 
          My Todos
        */}
      <Card>
        <h1>My todos</h1>
        <Button onClick={() => setOpenModal(true)}>Add +</Button>
        <div className="list-container">
          {regularTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
              onEdit={handleActiveTaskEdit}
              onDelete={handleDelete}
              isEditing={selectedTask.id === todo.id}
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
              onEdit={handleActiveTaskEdit}
              onDelete={handleDelete}
              isEditing={selectedTask.id === todo.id}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default TaskManager;
