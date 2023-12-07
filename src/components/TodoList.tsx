import React from "react";
import { Todo } from "../Models";
import SingleTodos from "./SingleTodos";

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}
const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
    return (
        <div className="flex flex-wrap justify-evenly w-11/12 mt-2">
            {todos.map(todo => (
                <SingleTodos todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />

            ))}
        </div>
    )
}

export default TodoList;