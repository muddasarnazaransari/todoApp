import { useState, useEffect } from 'react'
import TodoItems from './components/TodoItems';
import './App.css'
import { TodoProvider } from './context'

function App() {
  const [inCompleteCount, setIncompleteCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), todo: "", isCompleted: false, isTodoEditable: true }, ...prev])
  }

  const updateTodo = (id, newTodoMsg) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, todo: newTodoMsg } : prevTodo))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map(
        (prevTodo) => prevTodo.id === id && prevTodo.todo !== "" ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const updateTodoEditable = (id, isEditable) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isTodoEditable: isEditable } : todo
      )
    );
  };


  useEffect(() => {
    const inComplete = todos.filter(todo => !todo.isCompleted).length;
    setIncompleteCount(inComplete);

  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, toggleComplete, updateTodo, deleteTodo , updateTodoEditable }}>
      <div className='screen'>
        <div className='container'>
          <div className='todo-container'>
            <div className='navbar'>
              <div className='logo'>
                <img src='/logo.svg' />
              </div>
              <div className='nav-heading'>
                <h1>ToDo</h1>
              </div>
            </div>

            <div className='greeting'>
              <h1>👋 Good Morning, Muddasar</h1>
            </div>

            <div className='task-number'>
              <img src='/bell-icon.svg' />
              <p>You have got {inCompleteCount} things to conquer today</p>
            </div>

            <div className='add-task'>
              <div className='add-task-btn' onClick={addTodo}>
                + Add Task
              </div>
            </div>

            <div className='todo-heading'>
              <h1>Today's Tasks</h1>
            </div>

            <div className='checkbox-container'>
              {
                todos.map((todo) => (
                  <div key={todo.id}
                    className='w-full'
                  >
                    <TodoItems todo={todo} />
                  </div>
                ))
              }
            </div>


          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
