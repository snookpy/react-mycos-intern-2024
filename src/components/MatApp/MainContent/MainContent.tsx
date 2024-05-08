import { Container } from "@mui/material"

type MainContentProps = {
	children: React.ReactNode
}
const MainContent = ({ children }: MainContentProps) => {
	return (
		<main>
			<Container sx={{
				mt: 2
			}}>
				{children}
			</Container>
		</main>
	)
}

export default MainContent
