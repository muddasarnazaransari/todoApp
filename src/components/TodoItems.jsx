import React, { useEffect, useState , useRef } from 'react'
import { X } from 'lucide-react';
import { useTodo } from '../context';

function TodoItems({ todo }) {
    const { deleteTodo, toggleComplete , updateTodo , updateTodoEditable } = useTodo()
    const [isCompleted, setIsCompleted] = useState(false)
    const [isTodoEditable, setTodoEditable] = useState(todo.isTodoEditable)
    const [editableText , setEditableText] = useState(todo.todo)
    const inputRef = useRef(null)

    const toggleCompleted = (id) => {
        setIsCompleted(prev => !prev)
        toggleComplete(id)
    }

    const handleInputBlur = () => {
        updateTodo(todo.id , editableText)
        updateTodoEditable(todo.id , false)
    }

    const handleToggleEditable = () => {
        updateTodoEditable(todo.id , true)
    }

    useState(() => {
        if(todo.isTodoEditable && editableText)
        {
            inputRef.current.focus();
        }
    }, [todo.isTodoEditable]);

    return (
        <>
            <div className={`todo ${isCompleted && todo.todo !== "" ? 'completed' : ""}`}>
                <div className={`checkbox ${isCompleted && todo.todo !== "" ? 'task-completed' : ""}`} onClick={() => toggleCompleted(todo.id)}>
                    {isCompleted && todo.todo !== "" && <span className="checkmark">✔</span>}
                </div>

                <div className='todo-name'
                    onClick={
                        () => {
                            handleToggleEditable
                        }
                    }
                >
                    {
                        isTodoEditable ? (
                            <input
                                type="text"
                                className='todo-input'
                                value={editableText}
                                onChange={(e) => setEditableText(e.target.value)}
                                onBlur={handleInputBlur}
                                autoFocus
                            />
                        ) : (
                            <h2>{todo.todo}</h2>
                        )
                    }
                    
                </div>

                {/* ❌ Cross button */}
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                    <X size={32} color="red" />
                </button>
            </div>
        </>
    )
}

export default TodoItems
