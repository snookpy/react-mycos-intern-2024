import { useParams } from "react-router-dom"
import UpdatePageContainer from "../components/UpdatePageContainer/UpdatePageContainer"


const UpdateTodoPage = () => {
    const { todoID } = useParams()
    
    return (
        <UpdatePageContainer todoID={todoID!} />
    )
}

export default UpdateTodoPage