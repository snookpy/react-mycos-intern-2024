import { useCallback, useState } from "react"
import { ITodo, todoApi } from "../../api/todoApi"
import { FetchStatus } from "../../models/FetchStatus"

const useFetchTodoByID = () => {
    const [todo, setTodo] = useState<ITodo>()
    
	const [fetchTodo, setFetchTodo] = useState(FetchStatus.IDLE)

    const fetchTodoByID = useCallback(async (id: string) => {
        setFetchTodo(FetchStatus.LOADING)
        try {
            const _todo = await todoApi.getTodo(id)
            setTodo(_todo)
            setFetchTodo(FetchStatus.SUCCESS)
        } catch (error) {
            setFetchTodo(FetchStatus.FAILED)
        }
    }, [])

    return [todo, fetchTodoByID, fetchTodo] as const
}

export default useFetchTodoByID