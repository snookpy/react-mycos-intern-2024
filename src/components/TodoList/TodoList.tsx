// TodoList.tsx
import React from "react";
import { ITodo } from "./ListContainer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, List, Typography } from "@mui/material";
import "./ListContainer.css";

interface Props {
  todos: ITodo[];
  onDeleteTodo: (id?: string) => void;
}
const TodoList: React.FC<Props> = ({ todos, onDeleteTodo }) => {
  const deleteTodo = async (id?: string) => {
    if (!id) return;
    await onDeleteTodo(id);
  };
  return (
    <div style={{ marginTop: "40px" }}>
      <List dense={false}>
        {todos.map((t: ITodo, index: number) => (
          <div id="boxTodos">
            <ListItem
              key={"todo-" + t.title}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(t.id)}
                >
                  <DeleteIcon />
                </IconButton>
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
                        ? t.dueDate
                            // .toString()
                            .toLocaleString("en-GB", {
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
