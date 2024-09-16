import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
   console.log('storedTodos',storedTodos)
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    } 
    else {
      fetch('https://dummyjson.com/todos')
        .then((response) => response.json())
        .then((data) => {
          const initialTodos = data.todos.map(todo => ({
            id: todo.id,
            text: todo.todo,
            completed: todo.completed
          }));
          setTodos(initialTodos);
          localStorage.setItem('todos', JSON.stringify(initialTodos));
        });
    }
  }, []);
  
// to add updated todos to local storage
  useEffect(() => {
    if(todos.length > 0) {
    localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Add new task
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  // Toggle task completion
  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Delete a task
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Filter tasks
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
