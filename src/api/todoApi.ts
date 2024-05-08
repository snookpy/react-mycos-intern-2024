function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface ITodo {
	id?: string
	title: string
    description?: string
	completed: boolean
}

let TODOS: ITodo[] = [
	{
		id: "1",
		title: "Buy a Milk",
        description: 'go to Lotus and buy some milk for my mom',
		completed: false,
	},
	{
		id: "2",
		title: "Go to the store",
		completed: false,
	},
	{
		id: "3",
		title: "Teach React",
        description: 'Teach interns how to use React',
		completed: true,
	},
]

export const todoApi = {
	getTodos: async () => {
		await sleep(2000)
		return TODOS
	},
	getTodo: async (id: string) => {
		await sleep(1500)
		return { ...TODOS.find((t) => t.id === id) } as ITodo
	},
	addTodo: async (todo: ITodo) => {
		await sleep(1500)
		TODOS = [...TODOS, { ...todo, id: (TODOS.length + 1).toString() }]

		return todo
	},
	updateTodo: async (id: string, todo: ITodo) => {
		await sleep(1500)
		TODOS = TODOS.map((t) => (t.id === id ? todo : t))

		return todo
	},
    updateTodoStatus: async (id: string) => {
        await sleep(1500)
        TODOS = TODOS.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))

        return TODOS
    }
}
