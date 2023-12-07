import React, { useState } from "react";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaCheckDouble } from "@react-icons/all-files/fa/FaCheckDouble";
import { Todo } from "../Models";

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}
const SingleTodos = ({ todo, todos, setTodos }: Props) => {
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

    return (
        <form className="rounded bg-amber-400 flex justify-between items-center p-3 w-full sm:w-80 my-2" onSubmit={(e) => handleForm(e, todo.id)}>
            {
                edit ?
                    <div className="flex items-center">
                        <input className="p-1 outline-none" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
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
};

export default SingleTodos;