import { useEffect } from "react"
import TodoForm from "../TodoForm/TodoForm"
import useFetchTodoByID from "./useFetchTodoByID"
import { getIsLoading } from "../ListPageComponents/getIsLoading"
import MainContent from "../MatApp/MainContent/MainContent"
import { Button, Skeleton, Stack, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"

export type UpdatePageContainerProps = {
	todoID: string
}

const UpdatePageContainer = ({ todoID }: UpdatePageContainerProps) => {
	const [todo, fetchTodo, fetchStatus] = useFetchTodoByID()

	const isLoading = getIsLoading(fetchStatus)

	useEffect(() => {
		if (todoID) {
			fetchTodo(todoID)
		}
	}, [fetchTodo])

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
						Update Todo Page
					</Typography>
				</Stack>

				{isLoading ? (
					<Stack spacing={4}>
						<Skeleton variant="rectangular" width={"100%"} height={60} />
						<Skeleton variant="rectangular" width={"100%"} height={160} />
					</Stack>
				) : (
					<TodoForm defaultTodo={todo} />
				)}
			</Stack>
		</MainContent>
	)
}

export default UpdatePageContainer
