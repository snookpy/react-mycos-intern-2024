export const enterThaiWin = () => {
	return true
}

export const exitThaiWin = () => {
	return true
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export const fetchTodoUser = async () => {
	await sleep(5000)
	return [
		{
			title: "Buy Stellar Blade game",
			completed: false,
		},
		{
			title: "teach unit-testing with vitest",
			completed: false,
		},
	]
}
