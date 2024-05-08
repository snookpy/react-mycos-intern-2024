import { Divider, List } from "@mui/material"
import { ITodo } from "../../../api/todoApi"
import TodoListItem from "./TodoListItem"
import { Fragment } from "react/jsx-runtime"

export type TodoListsProps = {
	todoLists: ITodo[]
}

const TodoLists = ({ todoLists }: TodoListsProps) => {
	return (
		<List sx={{ width: "100%", bgcolor: "background.paper" }}>
			{todoLists.map((todo, index) => {
				return (
					<Fragment key={todo.id}>
						<TodoListItem 
                            todo={todo}
                        />
						{index !== todoLists.length - 1 && <Divider variant="fullWidth" component="li" />}
					</Fragment>
				)
			})}
		</List>
	)
}

export default TodoLists
