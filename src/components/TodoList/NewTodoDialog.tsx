import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { todoApi } from "../../api/TodoApi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th";

const date = dayjs(new Date()).locale("th");
const AddTodoDialog = ({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) => {
  const [todoName, setTodoName] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoDueDate, setTodoDueDate] = React.useState<Dayjs | null>(
    dayjs(null)
  );

  const onSave = async () => {
    await todoApi.addTodo({
      title: todoName,
      completed: false,
      description: todoDetail ?? null,
      dueDate: todoDueDate ?? null,
    });
    onSuccess?.();
    onClose();
  };

  useEffect(() => {
    if (open) {
      setTodoName("");
      setTodoDetail("");
      setTodoDueDate(null);
    }
  }, [open]);

  return (
    <div className="body">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>TODO</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <TextField
                fullWidth
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
                fullWidth
                label="Description"
                variant="outlined"
                value={todoDetail}
                onChange={(e) => {
                  setTodoDetail(e.target.value);
                }}
              />
            </Grid>

            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={todoDueDate}
                  minDate={date}
                  onChange={setTodoDueDate}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            CONFIRM
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddTodoDialog;
