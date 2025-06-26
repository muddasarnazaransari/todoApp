import { createContext, useContext } from "react";

// Define a default context value
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Hello",
            isCompleted: false,
            isTodoEditable: true,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    toggleComplete: (id) => {},
    deleteTodo : (id) => {},
    updateTodoEditable : (id, isEditable) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
};

// Corrected spelling and capitalization (should be PascalCase)
export const TodoProvider = TodoContext.Provider;
