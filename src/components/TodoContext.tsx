import { createContext, useContext } from "react";


export type TodoContextState = {
    fetchTodoAfterToggle: () => Promise<boolean>
}
export const TodoContext = createContext<TodoContextState>({} as any)

export const useTodoContext = () => {
    return useContext(TodoContext)
}