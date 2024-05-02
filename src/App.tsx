import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { addCountryToExcludeTax, addIsNonDecimalPrice, addTenTaxToNonIncludeTaxProduct, homeworkProducts, priceOver50, productNameUppercase, sumPriceIncludeTax } from "./basicAssignment/basicAssignment"

console.log(addIsNonDecimalPrice(homeworkProducts))
console.log(productNameUppercase(homeworkProducts))
console.log(addTenTaxToNonIncludeTaxProduct(homeworkProducts))
console.log(priceOver50(homeworkProducts))
console.log(addCountryToExcludeTax(homeworkProducts))
console.log(sumPriceIncludeTax(homeworkProducts))

function App() {
	const [count, setCount] = useState(0)

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
