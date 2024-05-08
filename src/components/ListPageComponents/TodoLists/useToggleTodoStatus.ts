import { useCallback, useState } from "react"
import { FetchStatus } from "../../../models/FetchStatus"
import { todoApi } from "../../../api/todoApi"


const useToggleTodoStatus = () => {
	const [toggleFetchStatus, setToggleFetchStatus] = useState<FetchStatus>(
		FetchStatus.IDLE
	)
    

    const toggleTodoStatus = useCallback(async (id: string, onToggleSuccess: () => Promise<boolean>) => {
		setToggleFetchStatus(FetchStatus.LOADING)
		try {
			await todoApi.updateTodoStatus(id)
			await onToggleSuccess()
			setToggleFetchStatus(FetchStatus.SUCCESS)
		} catch (error) {
			setToggleFetchStatus(FetchStatus.FAILED)
		}
	}, [])

    return [
        toggleTodoStatus,
        toggleFetchStatus
    ] as const
}

export default useToggleTodoStatus
