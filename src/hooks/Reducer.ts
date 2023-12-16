import { Todo } from "../Models";
import { DropResult } from "react-beautiful-dnd";

export const Type = {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",
    DONE: "DONE",
    EDIT_TODO: "EDIT_TODO",
    ADD_COMPLETED_TODO: "ADD_COMPLETED_TODO"
};

export type EditTodoType = {
    todo: string;
    id: number;
};

export type ActionType =
    { type: "ADD_TODO"; payload: { todo: string } } |
    { type: "REMOVE_TODO"; payload: { id: number } } |
    { type: "DONE"; payload: { id: number } } |
    { type: "EDIT_TODO"; payload: EditTodoType } |
    { type: "ADD_COMPLETED_TODO"; payload: { id: number } } |
    { type: "REORDER_TODOS"; payload: { result: DropResult } };

export interface StateType {
    todos: Todo[],
    completedTodos: Todo[],
}

const swap = (array: Todo[], index1: number, index2: number) => {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

export const TodoReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    { id: Date.now(), todo: action.payload.todo, isDone: false }
                ]
            }

        case "REMOVE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            }

        case "DONE": {
            const sourceTodos = state.todos;
            const destinationTodos = state.completedTodos;

            const index = sourceTodos.findIndex(item => item.id === action.payload.id);
            if (index < 0) return state;
            const [removed] = sourceTodos.splice(index, 1);
            destinationTodos.push({ ...removed, isDone: true });

            return {
                ...state,
                todos: sourceTodos,
                completedTodos: destinationTodos,
            }
        }


        case "EDIT_TODO":
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo)
            }

        case "REORDER_TODOS": {
            const { source, destination } = action.payload.result;
            const sourceTodos = source.droppableId === "todosList" ? state.todos : state.completedTodos;
            const destinationTodos = destination?.droppableId === "todosList" ? state.todos : state.completedTodos;

            if (destination && destination.droppableId === source.droppableId) {
                swap(sourceTodos, source.index, destination.index);
                return {
                    ...state,
                    todos: source.droppableId === "todosList" ? sourceTodos : state.todos,
                    completedTodos: source.droppableId === "todosRemove" ? sourceTodos : state.completedTodos,
                };
            } else {
                const [removed] = sourceTodos.splice(source.index, 1);
                if (destination?.index || destination?.index === 0) {
                    destinationTodos.splice(destination.index, 0, { ...removed, isDone: !removed.isDone });
                }

                return {
                    ...state,
                    todos: source.droppableId === "todosList" ? sourceTodos : destinationTodos,
                    completedTodos: source.droppableId === "todosRemove" ? sourceTodos : destinationTodos,
                };
            }
        }

        default:
            return state;
    }
}