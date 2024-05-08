import EditIcon from "@mui/icons-material/Edit"
import { IconButton } from "@mui/material"
import { NavLink } from "react-router-dom"

export type SecondaryTodoListButtonProps = {
	to: string
	ariaLabel?: string
}
const SecondaryTodoListButton = ({
	to,
	ariaLabel,
}: SecondaryTodoListButtonProps) => (
	<IconButton 
        component={NavLink} 
        edge="end" aria-label={ariaLabel} 
        to={to}
    >
		<EditIcon />
	</IconButton>
)

export default SecondaryTodoListButton
