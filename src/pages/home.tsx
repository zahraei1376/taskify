import React, { useState } from "react";
import InputFeild from "../components/InputFeild";
import { Todo } from "../Models";
import TodoList from "../components/TodoList";
// import { TodoReducer } from "../hooks/Reducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Home: React.FC = () => {
    // const createInitialState = () => {
    //     return { todos: [] }
    // }
    // //@ts-expect-error
    // const [state, dispatch] = useReducer(TodoReducer, null, createInitialState);
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [complatedTodos, setComplatedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }

    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let add;
        const active = todos;
        const complated = complatedTodos;

        if (source.droppableId === "todosList") {
            add = active[source.index];
            active.splice(source.index, 1);
            complated.splice(source.index, 0, add);
        } else {
            add = complated[source.index];
            complated.splice(source.index, 1);
            active.splice(source.index, 0, add);
        }

        setTodos(active);
        setComplatedTodos(complated);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="pt-5 w-full h-full bg-sky-500 flex flex-col items-center">
                <span className="font-bold text-center text-white">TASKIFY</span>
                <InputFeild value={todo} setValue={setTodo} handleAdd={handleAdd} />
                <TodoList todos={todos} setTodos={setTodos} complatedTodos={complatedTodos} setComplatedTodos={setComplatedTodos} />
            </div>
        </DragDropContext>
    )
}

export default Home;