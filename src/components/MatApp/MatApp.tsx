import { ThemeProvider } from "@mui/material/styles"
import customTheme from "./customTheme"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListPage from "../../pages/ListPage"
import AddTodoPage from "../../pages/AddTodoPage"
import UpdateTodoPage from "../../pages/UpdateTodoPage"

const MatApp = () => {
	return (
		<ThemeProvider theme={customTheme}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Example React Intern 2024
					</Typography>
				</Toolbar>
			</AppBar>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ListPage />} />
					<Route path="/add" element={<AddTodoPage />} />
					<Route path="/update/:todoID" element={<UpdateTodoPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default MatApp
