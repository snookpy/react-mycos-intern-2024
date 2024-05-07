import { Button, Grid, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../../api/TodoApi";
import { ITodo } from "./ListContainer";
import dayjs, { Dayjs } from "dayjs";

const UpsertTodoItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<ITodo | undefined>();
  const [todoName, setTodoName] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoDueDate, setTodoDueDate] = React.useState<Dayjs | null>(
    dayjs(null)
  );
  const onSave = async () => {
    if (!todo?.id && !todo) {
      await todoApi.addTodo({
        title: todoName,
        isDone: false,
        description: todoDetail,
      });
    } else {
      await todoApi.updateTodo(todo.id!, {
        ...todo,
        description: todoDetail,
        title: todoName,
      });
    }
    navigate("/todos");
  };
  const loadTodo = useCallback(async (id: string) => {
    const res = await todoApi.getTodo(id);
    setTodo(res.data);
    setTodoName(res.data.title ?? "");
    setTodoDetail(res.data.description ?? "");
    // setTodoDueDate(res.data.dueDate ?? null);
  }, []);

  useEffect(() => {
    if (id) {
      loadTodo(id);
    }
  }, [id, loadTodo]);

  return (
    <div className="body">
      <Grid container spacing={1} direction={"column"}>
        <Grid item>
          <TextField
            label="Title"
            variant="outlined"
            value={todoName}
            onChange={(e) => {
              setTodoName(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="description"
            variant="outlined"
            value={todoDetail}
            onChange={(e) => {
              setTodoDetail(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent={"end"} pt={3}>
        <Grid item>
          <Button onClick={onSave}>Confirm</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => navigate("/todos")} color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpsertTodoItem;
