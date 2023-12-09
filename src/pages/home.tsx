import React, { useReducer, useState } from "react";
import InputFeild from "../components/InputFeild";
import { Todo } from "../Models";
import TodoList from "../components/TodoList";
import { TodoReducer } from "../hooks/Reducer";

const Home: React.FC = () => {
    const createInitialState = () => {
        return { todos: [] }
    }
    // @ts-expect-error
    const [state, dispatch] = useReducer(TodoReducer, null, createInitialState);
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }

    }

    return (
        <div className="pt-5 w-full h-full bg-sky-500 flex flex-col items-center">
            <span className="font-bold text-center text-white">TASKIFY</span>
            <InputFeild value={todo} setValue={setTodo} handleAdd={handleAdd} />
            <TodoList todos={todos} setTodos={setTodos} />
        </div>
    )
}

export default Home;