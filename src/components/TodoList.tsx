import React from "react";
import { Todo } from "../Models";
import SingleTodos from "./SingleTodos";

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}
const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
    return (
        <div className="w-11/12 flex">
            <div className="w-2/4 bg-sky-700 rounded mt-3 p-3 mr-1">
                <span className="text-2xl text-white">Active Tasks</span>
                <div className="flex flex-col mt-2">
                    {todos.map(todo => (
                        <SingleTodos todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />

                    ))}
                </div>
            </div>
            <div className="w-2/4 bg-red-500 rounded mt-3 p-3 ml-1">
                <span className="text-2xl text-white">Complated Tasks</span>
                <div className="flex flex-col mt-2">
                    {todos.map(todo => (
                        <SingleTodos todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />

                    ))}
                </div>
            </div>
        </div>
    )
}

export default TodoList;