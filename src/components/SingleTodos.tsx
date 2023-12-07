import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { Todo } from "../Models";

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}
const SingleTodos = ({ todo, todos, setTodos }: Props) => {

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }

    const handleDelete = (id: number) => {

    }

    const handleEdit = (id: number) => {

    }
    return (
        <form className="rounded bg-amber-400 flex justify-between p-4 w-full sm:w-60 my-2">
            {
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
                <span className="cursor-pointer pr-1" onClick={() => handleDone(todo.id)}><FaCheck /></span>
                <span className="cursor-pointer pr-1" onClick={() => handleDelete(todo.id)}><MdDeleteForever /></span>
                <span className="cursor-pointer pr-1" onClick={() => handleEdit(todo.id)}><MdEdit /></span>
            </div>
        </form>
    )
};

export default SingleTodos;