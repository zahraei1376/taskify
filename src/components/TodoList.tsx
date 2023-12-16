import React, { Dispatch } from "react";
import { Todo } from "../Models";
import SingleTodos from "./SingleTodos";
import { Droppable } from "react-beautiful-dnd";
import { ActionType } from "../hooks/Reducer";

interface Props {
    todos: Todo[],
    setTodos: Dispatch<ActionType>,
    complatedTodos: Todo[],
    setComplatedTodos: Dispatch<ActionType>,
}

const TodoList: React.FC<Props> = ({ todos, setTodos, complatedTodos, setComplatedTodos }) => {
    return (
        <div className="w-11/12 flex items-start">
            <Droppable droppableId="todosList">
                {
                    (provided, snapshot) => (
                        <div
                            className={`w-1/2 rounded mt-3 p-3 mr-1 ${snapshot.isDraggingOver ? "bg-sky-600" : "bg-sky-700"}`}
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
                    (provided, snapshot) => (
                        <div
                            className={`w-1/2 rounded mt-3 p-3 ml-1 ${snapshot.isDraggingOver ? "bg-red-400" : "bg-red-500"}`}
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