import { createContext } from "react";


export type TodoContextState = {
    fetchTodoAfterToggle: () => Promise<boolean>
}
export const TodoContext = createContext<TodoContextState>({} as any)