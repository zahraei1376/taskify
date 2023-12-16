import React, { useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";
import { FaCheckDouble } from "@react-icons/all-files/fa/FaCheckDouble";
import { Todo } from "../Models";
import { Draggable } from "react-beautiful-dnd";
import { ActionType } from "../hooks/Reducer";

type Props = {
    index: number,
    todo: Todo,
    setTodos: React.Dispatch<ActionType>,
}

const SingleTodos = ({ index, todo, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos({ type: "DONE", payload: { id } })
    }

    const handleDelete = (id: number) => {
        setTodos({ type: "REMOVE_TODO", payload: { id } });
    }

    const handleForm = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        handleEdit(id);
    }

    const handleEdit = (id: number) => {
        setTodos({ type: "EDIT_TODO", payload: { id, todo: editTodo } });
        setEdit(false);
    }

    const handleClose = () => {
        setEditTodo(todo.todo);
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
                        transition duration-0 hover:duration-100 hover:scale-[1.02] rounded bg-amber-400 flex justify-between items-center p-3 my-2`}
                        onSubmit={(e) => handleForm(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ?
                                <div className="flex items-center">
                                    <input ref={inputRef} className="p-1 outline-none" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                                    <span className="cursor-pointer text-green-500 pr-1 -ml-10" onClick={() => handleEdit(todo.id)}><FaCheck className={`text-sm`} /></span>
                                    <span className="cursor-pointer text-red-500 pr-1 -ml-1" onClick={handleClose}><IoIosClose className={`text-xl`} /></span>
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
                            {!todo.isDone && <span className="cursor-pointer pr-1" onClick={() => {
                                if (!edit) {
                                    setEdit(!edit);
                                }
                            }}><MdEdit /></span>}
                            {!todo.isDone && <span className="cursor-pointer pr-1" onClick={() => handleDelete(todo.id)}><MdDeleteForever /></span>}
                            {!todo.isDone && <span className="cursor-pointer pr-1" onClick={() => handleDone(todo.id)}><FaCheckDouble /></span>}
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
};

export default SingleTodos;