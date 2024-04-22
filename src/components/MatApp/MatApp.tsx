import { ThemeProvider } from "@mui/material/styles"
import customTheme from "./customTheme"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import MainContent from "./MainContent/MainContent"

const MatApp = () => {
	return (
		<ThemeProvider theme={customTheme}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Example React Intern 2024
					</Typography>
					<Button color="inherit">Main</Button>

					<Button color="inherit">Form</Button>
				</Toolbar>
			</AppBar>
			<MainContent />
		</ThemeProvider>
	)
}

export default MatApp
