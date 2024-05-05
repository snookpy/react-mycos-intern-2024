import React, { useCallback, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Box, Button, Grid, Typography } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import AddTodoDialog from "./NewTodoDialog";
import { useNavigate } from "react-router-dom";
import "./ListContainer.css";
// import { ROUTES } from "../../App";
export interface ITodo {
  id?: string;
  title: string;
  isDone: boolean;
  description?: string;
  createDate?: Date;
  updateDate?: Date;
  dueDate?: Date;
  tags?: any[];
}

const ListContainer = () => {
  // let todos: ITodo[] = [];
  // const todoList = async () => {
  //   todos = (await todoApi.getTodos()).data;
  // };
  // todoList();

  //use for keep the vairable value
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openAddToDoDialog, setOpenAddToDoDialog] = useState(false);
  const getTodos = useCallback(async () => {
    const result = await todoApi.getTodos();
    setTodos(result.data);
  }, []);
  const navigate = useNavigate();
  // const addItem = useCallback(async () => {
  //   setOpenAddToDoDialog(true);
  // }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <div className="body">
        <Box px={4}>
          <Grid container justifyContent={"space-between"} spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography variant="h4">TODOS</Typography>
            </Grid>
          </Grid>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button type="button" className="search-button"></button>
          </div>

          <div id="boxTodos">
            <div className="boxShowTodos">
              <Grid container spacing={1} direction={"column"}>
                {todos.map((t) => {
                  return (
                    <Grid key={"todo-" + t.title} item pl={2}>
                      <TodoItem todoItem={t} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>

          <div id="create-button">
            <Grid container justifyContent={"space-between"} spacing={2}>
              <Grid item md={6} xs={12}></Grid>
              <Grid item md={"auto"} xs={12}>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/todos/new");
                  }}
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
