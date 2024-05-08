import { Grid, Skeleton, Stack } from "@mui/material"

const TodoListLoading = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6}>
				<Stack spacing={2}>
					<Skeleton variant="rectangular" width={"100%"} height={60} />
					<Skeleton variant="rectangular" width={"100%"} height={60} />
					<Skeleton variant="rectangular" width={"100%"} height={60} />
				</Stack>
			</Grid>
			<Grid item xs={12} md={6}>
				<Stack spacing={2}>
					<Skeleton variant="rectangular" width={"100%"} height={60} />
					<Skeleton variant="rectangular" width={"100%"} height={60} />
					<Skeleton variant="rectangular" width={"100%"} height={60} />
				</Stack>
			</Grid>
		</Grid>
	)
}

export default TodoListLoading
