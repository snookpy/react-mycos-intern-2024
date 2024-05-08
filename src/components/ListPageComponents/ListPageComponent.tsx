import MainContent from "../MatApp/MainContent/MainContent"
import {
	Button,
	Grid,
	Stack,
	Typography,
} from "@mui/material"
import { NavLink } from "react-router-dom"
import TodoLists from "./TodoLists/TodoLists"
import TodoListLoading from "./TodoListLoading/TodoListLoading"
import useFetchTotoList from "./useFetchTotoList"
import { getIsLoading } from "./getIsLoading"
import { TodoContext } from "../TodoContext"
import { useEffect } from "react"

const ListPageComponent = () => {
	const [todos, fetchTodos, fetchTodosStatus, onToggleStatusSuccess] = useFetchTotoList()
	const todoLists = todos.filter((todo) => !todo.completed)
	const completeLists = todos.filter((todo) => todo.completed)

	const isLoading = getIsLoading(fetchTodosStatus)

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

	return (
		<MainContent>
			<TodoContext.Provider value={{ fetchTodoAfterToggle: onToggleStatusSuccess }}>
				{isLoading ? (
					<TodoListLoading />
				) : (
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Stack direction="row" justifyContent="space-between">
								<Typography variant="h4" component="h1">
									List Page
								</Typography>

								<Button
									component={NavLink}
									variant="outlined"
									aria-label="go to add todo page"
									to="/add"
								>
									Add Todo
								</Button>
							</Stack>
						</Grid>
						<Grid item md={6} xs={12}>
							<Typography variant="h5" component="h2">
								Todo List
							</Typography>
							<TodoLists 
								todoLists={todoLists} 
							/>
						</Grid>

						<Grid item md={6} xs={12}>
							<Typography variant="h5" component="h2">
								Completed List
							</Typography>
							<TodoLists 
								todoLists={completeLists} 
							/>
						</Grid>
					</Grid>
				)}
			</TodoContext.Provider>
		</MainContent>
	)
}

export default ListPageComponent
