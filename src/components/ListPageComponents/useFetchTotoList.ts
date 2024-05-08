import { useCallback, useState } from "react"

import { ITodo, todoApi } from "../../api/todoApi"
import { FetchStatus } from "../../models/FetchStatus"

const  useFetchTotoList = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
	const [fetchTodosStatus, setFetchTodosStatus] = useState<FetchStatus>(
		FetchStatus.IDLE
	)
    

    const fetchTodos = useCallback(async () => {
		setFetchTodosStatus(FetchStatus.LOADING)
		try {
			const _todos = await todoApi.getTodos()
			setTodos(_todos)
			setFetchTodosStatus(FetchStatus.SUCCESS)
		} catch (error) {
			setFetchTodosStatus(FetchStatus.FAILED)
		}
	}, [])

    const onToggleStatusSuccess = useCallback(async () => {
        try {
			const _todos = await todoApi.getTodos()
			setTodos(_todos)
			setFetchTodosStatus(FetchStatus.SUCCESS)
		} catch (error) {
			setFetchTodosStatus(FetchStatus.FAILED)
		} finally {
            return true
        }
    }, [])

    return [
        todos,
        fetchTodos,
        fetchTodosStatus,
        onToggleStatusSuccess
    ] as const
}

export default useFetchTotoList