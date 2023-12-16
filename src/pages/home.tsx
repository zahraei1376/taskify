import React, { useReducer, useState } from "react";
import InputFeild from "../components/InputFeild";
// import { Todo } from "../Models";
import TodoList from "../components/TodoList";
import { TodoReducer } from "../hooks/Reducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { createInitialState } from "../utils/Reducer";

const Home: React.FC = () => {
    //// @ts-expect-error this is have error
    const [state, dispatch] = useReducer(TodoReducer, null, createInitialState);
    const [todo, setTodo] = useState<string>("");
    // const [todos, setTodos] = useState<Todo[]>([]);
    // const [complatedTodos, setComplatedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();

        if (todo) {
            dispatch({ type: "ADD_TODO", payload: { todo } })
            // setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }

    }

    // const swap = (array: Todo[], index1: number, index2: number) => {
    //     const temp = array[index1];
    //     array[index1] = array[index2];
    //     array[index2] = temp;
    // }

    const onDragEnd = (result: DropResult) => {
        const { destination } = result;

        if (!destination) return;

        dispatch({ type: "REORDER_TODOS", payload: { result } })
        // if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        // if (destination.droppableId === source.droppableId && source.droppableId === "todosList") {
        //     swap(todos, source.index, destination.index);
        //     return;
        // } else if (destination.droppableId === source.droppableId && source.droppableId === "todosRemove") {
        //     swap(complatedTodos, source.index, destination.index);
        //     return;
        // }


        // let add;
        // const active = todos;
        // const complated = complatedTodos;

        // if (source.droppableId === "todosList") {
        //     add = active[source.index];
        //     active.splice(source.index, 1);
        // } else {
        //     add = complated[source.index];
        //     complated.splice(source.index, 1);
        // }


        // if (destination.droppableId === "todosList") {
        //     active.splice(source.index, 0, add);
        // } else {
        //     complated.splice(source.index, 0, add);
        // }

        // setTodos(active);
        // setComplatedTodos(complated);
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