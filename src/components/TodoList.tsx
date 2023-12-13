import React from "react";
import { Todo } from "../Models";
import SingleTodos from "./SingleTodos";
import { Droppable } from "react-beautiful-dnd";

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    complatedTodos: Todo[],
    setComplatedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}
const TodoList: React.FC<Props> = ({ todos, setTodos, complatedTodos, setComplatedTodos }) => {
    return (
        <div className="w-11/12 flex items-start">
            <Droppable droppableId="todosList">
                {
                    (provided) => (
                        <div
                            className="w-1/2 bg-sky-700 rounded mt-3 p-3 mr-1"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="text-2xl text-white">Active Tasks</span>
                            <div className="flex flex-col mt-2">
                                {todos.map((todo, index) => (
                                    <SingleTodos
                                        index={index}
                                        todo={todo}
                                        key={todo.id}
                                        todos={todos}
                                        setTodos={setTodos} />
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>
            <Droppable droppableId="todosRemove">
                {
                    (provided) => (
                        <div
                            className="w-1/2 bg-red-500 rounded mt-3 p-3 ml-1"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="text-2xl text-white">Complated Tasks</span>
                            <div className="flex flex-col mt-2">
                                {complatedTodos.map((todo, index) => (
                                    <SingleTodos
                                        index={index}
                                        todo={todo}
                                        key={todo.id}
                                        todos={complatedTodos}
                                        setTodos={setComplatedTodos} />
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default TodoList;