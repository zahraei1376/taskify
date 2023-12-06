import React, { useState } from "react";
import InputFeild from "../components/InputFeild";
import { Todo } from "../Models";

const Home: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
        }
        setTodo("");
    }

    return (
        <div className="pt-5 w-full h-full bg-sky-500 flex flex-col items-center">
            <span className="font-bold text-center text-white">TASKIFY</span>
            <InputFeild value={todo} setValue={setTodo} handleAdd={handleAdd} />
        </div>
    )
}

export default Home;