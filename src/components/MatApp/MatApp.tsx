import { ThemeProvider } from "@mui/material/styles"
import customTheme from "./customTheme"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"

const MatApp = () => {
	return (
		<ThemeProvider theme={customTheme}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Example React Intern 2023
					</Typography>
					<Button color="inherit">Board</Button>

					<Button color="inherit">Form</Button>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	)
}

export default MatApp
