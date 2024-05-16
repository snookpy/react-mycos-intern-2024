import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import useThaiWin from "./hooks/useThaiWin/useThaiWin"

function App() {
	const [count, setCount] = useState(0)
	const [isLogin, setEnter, setExit] = useThaiWin();

	console.log("before : ", isLogin, setEnter, " : after", isLogin)
	console.log("before : ", isLogin, setExit, " : after", isLogin)

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Mycos Frontend Internship 2024</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
