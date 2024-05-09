import { Fragment, useCallback, useEffect, useState } from "react"
import MainContent from "../MatApp/MainContent/MainContent"
import { ITodo, todoApi } from "../../api/todoApi"
import {
	Button,
	Checkbox,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

import { NavLink } from "react-router-dom"

export enum FetchStatus {
	IDLE = "idle",
	LOADING = "loading",
	FAILED = "failed",
	SUCCESS = "success",
}

const ListPage = () => {
	const [todos, setTodos] = useState<ITodo[]>([])
	const [fetchTodosStatus, setFetchTodosStatus] = useState<FetchStatus>(
		FetchStatus.IDLE
	)
	const fetchTodos = useCallback(async () => {
		setFetchTodosStatus(FetchStatus.LOADING)
		try {
			const todos = await todoApi.getTodos()
			setTodos(todos)
			setFetchTodosStatus(FetchStatus.SUCCESS)
		} catch (error) {
			setFetchTodosStatus(FetchStatus.FAILED)
		}
	}, [])

	const handleToggleTodo = async (id: string) => {
		try {
			setFetchTodosStatus(FetchStatus.LOADING)
			await todoApi.updateTodoStatus(id)
			fetchTodos()
		} catch (error) {
			setFetchTodosStatus(FetchStatus.FAILED)
		}
	}

	const todoLists = todos.filter((todo) => !todo.completed)
	const completeLists = todos.filter((todo) => todo.completed)

	const isLoading =
		fetchTodosStatus === FetchStatus.LOADING ||
		fetchTodosStatus === FetchStatus.IDLE

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])
	return (
		<MainContent>
			<>
				{isLoading ? (
					<Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={2}>
                                <Skeleton variant="rectangular" width={"100%"} height={60} />
                                <Skeleton variant="rectangular" width={"100%"} height={60} />
                                <Skeleton variant="rectangular" width={"100%"} height={60} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={2}>
                                <Skeleton variant="rectangular" width={"100%"} height={60} />
                                <Skeleton variant="rectangular" width={"100%"} height={60} />
                                <Skeleton variant="rectangular" width={"100%"} height={60} />
                            </Stack>
                        </Grid>
					</Grid>
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
							<List sx={{ width: "100%", bgcolor: "background.paper" }}>
								{todoLists.map((todo) => {
									const labelId = `checkbox-list-label-${todo.id}`
									return (
										<Fragment key={todo.id}>
											<ListItem
												alignItems="flex-start"
												secondaryAction={
													<IconButton
														component={NavLink}
														edge="end"
														aria-label={`edit ${todo.title}`}
														to={`/update/${todo.id}`}
													>
														<EditIcon />
													</IconButton>
												}
											>
												<ListItemButton
													role={undefined}
													onClick={() => handleToggleTodo(todo.id!)}
												>
													<ListItemIcon>
														<Checkbox
															edge="start"
															checked={todo.completed}
															tabIndex={-1}
															disableRipple
															inputProps={{ "aria-labelledby": labelId }}
														/>
													</ListItemIcon>
													<ListItemText
														id={labelId}
														primary={todo.title}
														secondary={todo.description}
													/>
												</ListItemButton>
											</ListItem>
											<Divider variant="fullWidth" component="li" />
										</Fragment>
									)
								})}
							</List>
						</Grid>

						<Grid item md={6} xs={12}>
							<Typography variant="h5" component="h2">
								Completed List
							</Typography>
							<List sx={{ width: "100%", bgcolor: "background.paper" }}>
								{completeLists.map((todo) => {
									const labelId = `checkbox-list-label-${todo.id}`
									return (
										<Fragment key={todo.id}>
											<ListItem
												alignItems="flex-start"
												secondaryAction={
													<IconButton
														component={NavLink}
														edge="end"
														aria-label={`edit ${todo.title}`}
														to={`/update/${todo.id}`}
													>
														<EditIcon />
													</IconButton>
												}
											>
												<ListItemButton
													role={undefined}
													onClick={() => handleToggleTodo(todo.id!)}
												>
													<ListItemIcon>
														<Checkbox
															edge="start"
															checked={todo.completed}
															tabIndex={-1}
															disableRipple
															inputProps={{ "aria-labelledby": labelId }}
														/>
													</ListItemIcon>
													<ListItemText
														id={labelId}
														primary={todo.title}
														secondary={todo.description}
													/>
												</ListItemButton>
											</ListItem>
											<Divider variant="fullWidth" component="li" />
										</Fragment>
									)
								})}
							</List>
						</Grid>
					</Grid>
				)}
			</>
		</MainContent>
	)
}

export default ListPage
