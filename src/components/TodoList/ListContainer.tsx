import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import AddTodoDialog from "./NewTodoDialog";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import "./ListContainer.css";
import { Dayjs } from "dayjs";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

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
  const [fliterTodo, setfliterTodo] = useState<ITodo[]>([]);
  const [openAddToDoDialog, setOpenAddToDoDialog] = useState(false);
  const getTodos = useCallback(async () => {
    const result = await todoApi.getTodos();
    setTodos(result.data);
    setfliterTodo(result.data);
  }, []);
  const searchTodos = async (title: any) => {
    if (!title) {
      setfliterTodo(todos);
      return;
    }
    const result = await todoApi.searchTodo(title);
    setfliterTodo(result.data);
  };

  const deleteTodo = async (id?: string) => {
    if (!id) return;
    await todoApi.removedTodo(id);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getTodos();
  }, [getTodos, deleteTodo]);

  return (
    <>
      <Box px={4} sx={{ height: "420px" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <FormatListBulletedIcon sx={{ fontSize: 50, color: "#ff7403" }} />
          </Grid>
          <Grid item>
            <Typography variant="h4">TODOS</Typography>
          </Grid>
        </Grid>

        <Autocomplete
          freeSolo
          options={todos.map((todo) => todo.title)}
          onChange={(event, title) => searchTodos(title)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Search"
              margin="normal"
              variant="outlined"
              className="searchInput"
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C48201",
                  borderRadius: "30px",
                  borderWidth: "3px",
                },
              }}
            />
          )}
        />

        <div className="showTodos">
          <Box
            id="scrollable-content"
            component="div"
            sx={{
              marginTop: "5px",
            }}
          >
            <TodoList todos={fliterTodo} onDeleteTodo={deleteTodo} />
          </Box>
        </div>

        <div>
          <Grid container justifyContent={"space-between"} spacing={2}>
            <Grid item md={6} xs={12}></Grid>
            <Grid item md={"auto"} xs={12} mt={2}>
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
    </>
  );
};

export default ListContainer;
