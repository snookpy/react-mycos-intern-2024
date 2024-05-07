import { Button, Skeleton, Stack, TextField, Typography } from "@mui/material"
import MainContent from "../MatApp/MainContent/MainContent"
import { useForm } from "react-hook-form"
import { ITodo, todoApi } from "../../api/todoApi"
import { NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { FetchStatus } from "../ListPage/ListPage"

const UpsertTodoPage = () => {
	// Get the userId param from the URL.
	const { todoID } = useParams()
	const [fetchTodo, setFetchTodo] = useState(FetchStatus.IDLE)
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ITodo>()

	const onSubmitValid = async (data: ITodo) => {
		if (todoID) {
			await todoApi.updateTodo(todoID, data)
		} else {
			await todoApi.addTodo(data)
		}
	}

	const onSubmit = handleSubmit(onSubmitValid)

	const isLoading = fetchTodo === FetchStatus.LOADING

	useEffect(() => {
		if (todoID) {
			const getTodoByID = async () => {
				try {
					setFetchTodo(FetchStatus.LOADING)
					const todo = await todoApi.getTodo(todoID)
					reset(todo)
					setFetchTodo(FetchStatus.SUCCESS)
				} catch (error) {
					setFetchTodo(FetchStatus.FAILED)
				}
			}
			getTodoByID()
		}
	}, [todoID])

	return (
		<MainContent>
			<Stack mt={2} gap={2}>
				<Stack direction="row" gap={2}>
					<Button
						component={NavLink}
						variant="outlined"
						aria-label="go back to main lists page"
						to="/"
					>
						Back
					</Button>
					<Typography component={"h1"} variant="h4">
						Upsert Todo Page
					</Typography>
				</Stack>

				{isLoading ? (
					<Stack spacing={4}>
						<Skeleton variant="rectangular" width={"100%"} height={60} />
						<Skeleton variant="rectangular" width={"100%"} height={160} />
					</Stack>
				) : (
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
				)}
			</Stack>
		</MainContent>
	)
}

export default UpsertTodoPage
