import React, { useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaCheckDouble } from "@react-icons/all-files/fa/FaCheckDouble";
import { Todo } from "../Models";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodos = ({ index, todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleForm = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        handleEdit(id);
    }

    const handleEdit = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: editTodo } : todo));
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form
                        className={`${snapshot.isDragging ? "shadow-2xl" : "shadow"} 
                        transition duration-100 hover:scale-[1.02] rounded bg-amber-400 flex justify-between items-center p-3 my-2`}
                        onSubmit={(e) => handleForm(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ?
                                <div className="flex items-center">
                                    <input ref={inputRef} className="p-1 outline-none" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                                    <span className="cursor-pointer pr-1 -ml-6" onClick={() => handleEdit(todo.id)}><FaCheck /></span>
                                </div>
                                :
                                todo.isDone ?
                                    <s>
                                        {todo.todo}
                                    </s>
                                    :
                                    <span>
                                        {todo.todo}
                                    </span>
                        }

                        <div className="flex">
                            <span className="cursor-pointer pr-1" onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }
                            }}><MdEdit /></span>
                            <span className="cursor-pointer pr-1" onClick={() => handleDelete(todo.id)}><MdDeleteForever /></span>
                            <span className="cursor-pointer pr-1" onClick={() => handleDone(todo.id)}><FaCheckDouble /></span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
};

export default SingleTodos;