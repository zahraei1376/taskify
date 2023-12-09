import { Todo } from "../Models";

const Type = {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",
    DONE: "DONE",
};

type ActionType =
    | { type: "ADD_TODO"; payload: string }
    | { type: "REMOVE_TODO"; payload: number }
    | { type: "DONE"; payload: number };

interface StateType {
    todos: Todo[],
}

export const TodoReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case Type.ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    { id: Date.now(), todo: action.payload, isDone: false }
                ]
            }

        case Type.REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case Type.DONE:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, isDone: true } : todo)
            }
        default:
            return { ...state };
    }
}