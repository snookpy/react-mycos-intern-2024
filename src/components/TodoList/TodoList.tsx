import React from "react";
import { ITodo } from "./ListContainer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, List, Typography } from "@mui/material";
import MenuDropdown from "./Dropdown";
import CompleteTodoItem from "./TodoItem";
import moment from "moment-timezone";

interface Props {
  todos: ITodo[];
  onDeleteTodo: (id?: string) => void;
  onCompleteTodo: (innerTodo: ITodo, value: boolean) => void;
}

const TodoList: React.FC<Props> = ({ todos, onDeleteTodo, onCompleteTodo }) => {
  return (
    <div style={{ paddingTop: "25px", paddingBottom: "15px" }}>
      <List dense={false}>
        {todos.map((t: ITodo, index: number) => (
          <div
            id="boxTodos"
            style={{ backgroundColor: t.completed ? "#f1f1f1" : "#ffe1a8" }}
          >
            <ListItem
              key={"todo-" + t.title}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ListItemText
                sx={{
                  "& .MuiListItemText-primary": {
                    textDecoration: t.completed ? "line-through" : null,
                  },
                }}
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
                        ? moment
                            .utc(t.dueDate)
                            .tz("Asia/Bangkok")
                            .format("dddd DD/MM/yyyy")
                        : "No due date"}
                    </Typography>
                  </Box>
                }
              />
              <div
                style={{
                  display: "flex",
                  gap: "25px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <MenuDropdown
                  todo={t}
                  onDeleteTodo={onDeleteTodo}
                ></MenuDropdown>

                <CompleteTodoItem
                  todoItem={t}
                  onCompleteTodo={onCompleteTodo}
                ></CompleteTodoItem>
              </div>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
