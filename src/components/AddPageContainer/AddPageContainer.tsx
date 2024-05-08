import { Button, Stack, Typography } from "@mui/material"
import MainContent from "../MatApp/MainContent/MainContent"
import TodoForm from "../TodoForm/TodoForm"
import { NavLink } from "react-router-dom"

const AddPageContainer = () => {
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
						Add Todo Page
					</Typography>
				</Stack>
				<TodoForm />
			</Stack>
		</MainContent>
	)
}

export default AddPageContainer
