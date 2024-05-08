import {
	Checkbox,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
} from "@mui/material"
import { ITodo } from "../../../api/todoApi"
import useToggleTodoStatus from "./useToggleTodoStatus"
import { FetchStatus } from "../../../models/FetchStatus"
import SecondaryTodoListButton from "./SecondaryTodoListButton"
import { useTodoContext } from "../../TodoContext"

export type TodoListItemProps = {
	todo: ITodo
}

const TodoListItem = ({ todo }: TodoListItemProps) => {
	const [toggleAPI, toggleFetchStatus] = useToggleTodoStatus()

    const {
        fetchTodoAfterToggle: onToggleSuccess
    } = useTodoContext()

	const handleToggleTodo = async (id: string) => {
		try {
			await toggleAPI(id, onToggleSuccess)
		} catch (error) {
			// setFetchTodosStatus(FetchStatus.FAILED)
		}
	}

	const labelId = `checkbox-list-label-${todo.id}`

	const isLoading = FetchStatus.LOADING === toggleFetchStatus

	return (
		<>
			{isLoading ? (
				<Skeleton variant="rectangular" width={"100%"} height={60} />
			) : (
				<ListItem
					alignItems="flex-start"
					secondaryAction={
						<SecondaryTodoListButton
							to={`/update/${todo.id}`}
							ariaLabel={`edit ${todo.title}`}
						/>
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
			)}
		</>
	)
}

export default TodoListItem
