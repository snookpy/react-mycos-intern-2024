import { useForm } from "react-hook-form"
import { ITodo, todoApi } from "../../api/todoApi"

const useTodoForm = (defaultTodo?: ITodo) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<ITodo>({
		defaultValues: defaultTodo,
	})

	const onSubmitValid = async (data: ITodo) => {
		if (data.id) {
			await todoApi.updateTodo(data.id, data)
		} else {
			await todoApi.addTodo(data)
		}
	}

	const onSubmit = handleSubmit(onSubmitValid)
	return {
		onSubmit,
		register,
		errors,
		isSubmitting,
	}
}

export default useTodoForm
