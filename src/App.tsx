import "./App.css"
import useThaiWin from "./hooks/useThaiWin/useThaiWin"

function App() {
	const [isLogin, enter, exit] = useThaiWin()
	console.log(isLogin)

	return (
		<>
			<button onClick={enter}>
				Enter
			</button>
			<button onClick={exit}>
				Exit
			</button>
		</>
	)
}

export default App
