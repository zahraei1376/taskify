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
    return (
        <form className="rounded bg-amber-400 flex justify-between p-4 w-full sm:w-60 my-2">
            <span className="text-white flex-wrap">
                {todo.todo}
            </span>
            <div className="flex">
                <span className="cursor-pointer pr-1"><FaCheck /></span>
                <span className="cursor-pointer pr-1"><MdDeleteForever /></span>
                <span className="cursor-pointer pr-1"><MdEdit /></span>
            </div>
        </form>
    )
};

export default SingleTodos;