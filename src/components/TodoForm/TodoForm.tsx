import { Button, Stack, TextField } from "@mui/material"
import useTodoForm from "../../hooks/useTodoForm/useTodoForm"
import { ITodo } from "../../api/todoApi"

export type TodoFormProps = {
	defaultTodo?: ITodo
}

const TodoForm = ({ defaultTodo }: TodoFormProps) => {
	const { onSubmit, errors, register, isSubmitting } = useTodoForm(defaultTodo)

	return (
		<form onSubmit={onSubmit}>
			<Stack gap={2} mt={4}>
				<TextField
					error={!!errors?.title}
					label="name"
					variant="outlined"
					autoComplete="off"
					{...register("title", { required: true })}
					helperText={errors?.title ? "title is required" : ""}
				/>
				<TextField
					label="description"
					variant="outlined"
					autoComplete="off"
					{...register("description")}
					multiline
					rows={4}
				/>
			</Stack>
			<Button
				type="submit"
				disabled={isSubmitting}
				variant="contained"
				sx={{
					mt: 4,
				}}
			>
				Submit
			</Button>
		</form>
	)
}

export default TodoForm
