import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import AddTodoDialog from "./NewTodoDialog";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList"; // Import TodoList component
import "./ListContainer.css";
import { Dayjs } from "dayjs";

export interface ITodo {
  id?: string;
  title?: string;
  isDone: boolean;
  description?: string;
  createDate?: Date;
  updateDate?: Date;
  dueDate?: Date | Dayjs | null;
  tags?: any[];
}

const ListContainer = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openAddToDoDialog, setOpenAddToDoDialog] = useState(false);
  const getTodos = useCallback(async () => {
    const result = await todoApi.getTodos();
    setTodos(result.data);
  }, []);

  const deleteTodo = async (id?: string) => {
    if (!id) return;
    await todoApi.removedTodo(id);
    setTodos(todos.filter((e: ITodo) => e.id !== id));
  };
  const navigate = useNavigate();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <div className="body">
        <Box px={4}>
          <Grid container justifyContent={"space-between"} spacing={2}>
            <Typography variant="h4">TODOS</Typography>
          </Grid>
          <Autocomplete
            freeSolo
            disableClearable
            options={todos.map((todo) => todo.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                margin="normal"
                variant="outlined"
                className="custom-search-input"
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C48201",
                  },
                }}
              />
            )}
          />
          <TodoList todos={todos} onDeleteTodo={deleteTodo} />
          <div id="create-button">
            <Grid container justifyContent={"space-between"} spacing={2}>
              <Grid item md={6} xs={12}></Grid>
              <Grid item md={"auto"} xs={12}>
                <Button
                  variant="contained"
                  onClick={() => setOpenAddToDoDialog(true)}
                  fullWidth={true}
                >
                  CREATE
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
        <AddTodoDialog
          open={openAddToDoDialog}
          onClose={() => setOpenAddToDoDialog(false)}
          onSuccess={getTodos}
        />
      </div>
    </>
  );
};

export default ListContainer;
