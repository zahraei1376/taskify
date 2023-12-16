import React, { useReducer, useState } from "react";
import InputFeild from "../components/InputFeild";
import TodoList from "../components/TodoList";
import { TodoReducer } from "../hooks/Reducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { createInitialState } from "../utils/Reducer";

const Home: React.FC = () => {
    //// @ts-expect-error this is have error
    const [state, dispatch] = useReducer(TodoReducer, null, createInitialState);
    const [todo, setTodo] = useState<string>("");

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();

        if (todo) {
            dispatch({ type: "ADD_TODO", payload: { todo } })
            setTodo("");
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        dispatch({ type: "REORDER_TODOS", payload: { result } })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="pt-5 w-full h-full bg-sky-500 flex flex-col items-center">
                <span className="font-bold text-center text-white">TASKIFY</span>
                <InputFeild value={todo} setValue={setTodo} handleAdd={handleAdd} />
                <TodoList todos={state.todos} setTodos={dispatch} complatedTodos={state.completedTodos} setComplatedTodos={dispatch} />
            </div>
        </DragDropContext>
    )
}

export default Home;