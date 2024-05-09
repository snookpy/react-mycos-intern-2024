import { ThemeProvider } from "@mui/material/styles"
import customTheme from "./customTheme"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListPage from "../ListPage/ListPage"
import UpsertTodoPage from "../UpsertTodoPage/UpsertTodoPage"

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
					<Route path="/add" element={<UpsertTodoPage />} />
					<Route path="/update/:todoID" element={<UpsertTodoPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default MatApp
