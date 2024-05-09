import React, { useCallback, useEffect, useState } from "react";
import { ITodo } from "./ListContainer";
import { Checkbox, FormControlLabel } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import { useNavigate } from "react-router-dom";
interface ITodoItemProps {
  todoItem: ITodo;
  onCompleteTodo: (innerTodo: ITodo, value: boolean) => void;
}
const TodoItem = (props: ITodoItemProps) => {
  const { todoItem, onCompleteTodo } = props;
  const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);

  const onChange = useCallback(
    async (value: boolean) => {
      const newTodo: ITodo = { ...innerTodo, completed: value };
      if (newTodo.id) {
        await onCompleteTodo(newTodo, value);
      }
      setInnerTodo(newTodo);
    },
    [innerTodo]
  );

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            checked={innerTodo.completed}
          />
        }
        label={undefined}
      />
    </>
  );
};

export default TodoItem;
