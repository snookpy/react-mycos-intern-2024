// TodoList.tsx
import React from "react";
import { ITodo } from "./ListContainer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, List, Typography } from "@mui/material";
import MenuDropdown from "./Dropdown";

interface Props {
  todos: ITodo[];
  onDeleteTodo: (id?: string) => void;
}
const TodoList: React.FC<Props> = ({ todos, onDeleteTodo }) => {
  return (
    <div style={{ paddingTop: "25px", paddingBottom: "15px" }}>
      <List dense={false}>
        {todos.map((t: ITodo, index: number) => (
          <div id="boxTodos">
            <ListItem
              key={"todo-" + t.title}
              secondaryAction={
                <>
                  <MenuDropdown
                    todo={t}
                    onDeleteTodo={onDeleteTodo}
                  ></MenuDropdown>

                  {/* <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(t.id)}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </>
              }
            >
              <ListItemText
                primary={t.title}
                secondary={
                  <Box>
                    {t.description ? t.description : "-"}
                    <br />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="span"
                    >
                      {t.dueDate
                        ? t.dueDate.toLocaleString("en-GB", {
                            timeZone: "UTC+07:00",
                          })
                        : "No due date"}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
