import { Todo } from "../Models";

const TodoList = (todos: Todo[]) => {
    return (
        <>
            {todos.map(todo => (
                <li>
                    {todo.todo}
                </li>
            ))}
        </>
    )
}

export default TodoList;