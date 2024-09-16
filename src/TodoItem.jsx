
const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
      >
        {todo.text}
      </span>

      <span
        style={{
          marginRight: '10px',
          fontWeight: 'bold',
          color: todo.completed ? 'green' : 'red'
        }}
      >
        {todo.completed ? 'Completed' : 'Pending'}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;