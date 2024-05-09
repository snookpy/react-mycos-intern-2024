import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../../api/TodoApi";
import { ITodo } from "./ListContainer";
import dayjs, { Dayjs } from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const UpsertTodoItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<ITodo | undefined>();
  const [todoName, setTodoName] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoDueDate, setTodoDueDate] = useState<Dayjs | undefined>();
  const [error, setError] = useState(false);
  const [confirmTodo, setConfirmTodo] = useState(false);
  const date = dayjs(new Date()).locale("th");

  const confirm = () => {
    if (!todoName.length) {
      setError(true);
      return;
    } else {
      setConfirmTodo(true);
    }
  };

  const onSave = async () => {
    if (!todo?.id || !todo) {
      await todoApi.addTodo({
        title: todoName,
        completed: false,
        description: todoDetail,
        dueDate: todoDueDate,
      });
    } else {
      await todoApi.updateTodo(todo.id!, {
        ...todo,
        description: todoDetail,
        title: todoName,
        dueDate: todoDueDate,
      });
    }
    navigate("/todos");
  };
  const loadTodo = useCallback(async (id: string) => {
    const res = await todoApi.getTodo(id);
    setTodo(res.data);
    setTodoName(res.data.title ?? "");
    setTodoDetail(res.data.description ?? "");
    setTodoDueDate(res.data.dueDate ? dayjs(res.data.dueDate) : undefined);
  }, []);

  useEffect(() => {
    if (id) {
      loadTodo(id);
    }
  }, [id, loadTodo]);

  const onClose = (cancel: boolean = false) => {
    if (confirmTodo && !cancel) {
      onSave();
    }
    setError(false);
    setConfirmTodo(false);
  };

  return (
    <>
      {(error || confirmTodo) && (
        <Dialog open={error || confirmTodo}>
          <Grid
            sx={{
              "& .MuiDialogTitle-root": {
                backgroundColor: "#FFFDF2",
                borderRadius: "10px",
                width: "300px",
              },
              "& .MuiDialog-paper": {
                border: "5px solid #C48201",
              },
            }}
          >
            <DialogTitle sx={{ fontWeight: "bold" }}>
              {error && "Error"}
              {confirmTodo && "Confirm"}
            </DialogTitle>
            <DialogContent>
              {error && "Please input a title !"}
              {confirmTodo &&
                "Are you sure you want to confirm this item into your Todo?"}
            </DialogContent>

            <DialogActions>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <Button
                  onClick={() => {
                    onClose();
                  }}
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {error && "OK"}
                  {confirmTodo && "Confirm"}
                </Button>

                {confirmTodo && (
                  <Button
                    onClick={() => {
                      onClose(true);
                    }}
                    sx={{
                      backgroundColor: "gray",
                      color: "white",
                      marginTop: "10px",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    CANCEL
                  </Button>
                )}
              </div>
            </DialogActions>
          </Grid>
        </Dialog>
      )}

      <Box px={6} sx={{ height: "420px" }}>
        <Grid
          container
          alignItems="center"
          spacing={5}
          marginBottom={"35px"}
          marginLeft={"10px"}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Grid item sx={{ marginRight: "15px" }}>
              <FormatListBulletedIcon sx={{ fontSize: 50, color: "#ff7403" }} />
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#1E1200" }}
              >
                ADD TODO
              </Typography>
            </Grid>
          </div>
        </Grid>

        <Grid
          px={4}
          container
          spacing={1}
          direction={"column"}
          sx={{
            backgroundColor: "ffffff",
            width: "100%",
          }}
        >
          <Grid>
            <div
              style={{
                paddingBottom: "30px",
                maxHeight: "100%",
                backgroundColor: "#FFFFFB",
                borderRadius: "30px",
                paddingInline: "100px",
              }}
            >
              <Grid
                container
                alignItems="center"
                spacing={2}
                marginBottom={1.5}
              >
                <Typography variant="h5" marginLeft={"3px"} marginTop={"30px"}>
                  TITLE
                </Typography>
                <Typography
                  variant="h5"
                  marginLeft={"3px"}
                  color={"red"}
                  marginTop={"20px"}
                >
                  *
                </Typography>
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={todoName}
                  onChange={(e) => {
                    setTodoName(e.target.value);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderRadius: "50px",
                        borderWidth: "2.5px",
                      },
                  }}
                />
              </Grid>
            </div>
          </Grid>

          <div style={{ padding: "15px" }} />

          <Grid>
            <div
              style={{
                paddingBottom: "30px",
                maxHeight: "100%",
                backgroundColor: "#FFFFFB",
                borderRadius: "30px",
                paddingInline: "100px",
              }}
            >
              <Grid
                container
                alignItems="center"
                spacing={2}
                marginBottom={1.5}
              >
                <Typography variant="h5" marginLeft={"3px"} marginTop={"30px"}>
                  DESCRIPTION
                </Typography>
              </Grid>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={todoDetail}
                onChange={(e) => {
                  setTodoDetail(e.target.value);
                }}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "50px",
                    borderWidth: "2.5px",
                  },
                }}
              />
            </div>
          </Grid>
        </Grid>

        <div style={{ padding: "15px" }} />

        <Grid px={3}>
          <div
            style={{
              paddingBottom: "30px",
              maxHeight: "100%",
              backgroundColor: "#FFFFFB",
              borderRadius: "30px",
              paddingInline: "100px",

              marginRight: "15px",
            }}
          >
            <Grid container alignItems="center" spacing={2} marginBottom={3.5}>
              <Typography variant="h5" marginLeft={"3px"} marginTop={"30px"}>
                DUE DATE
              </Typography>
            </Grid>

            <Grid container alignItems="center" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <CalendarMonthIcon
                    sx={{ fontSize: 50, color: "#ff7403", marginLeft: "20px" }}
                  />
                  <div
                    style={{ marginTop: "3px", marginLeft: "20px", flex: 1 }}
                  >
                    <DatePicker
                      value={todoDueDate}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                        },
                      }}
                      minDate={date}
                      onChange={(newValue: Dayjs | null) =>
                        setTodoDueDate(newValue ? newValue : undefined)
                      }
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderRadius: "50px",
                            borderWidth: "2.5px",
                          },
                      }}
                    />
                  </div>
                </div>
              </LocalizationProvider>
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={2} justifyContent={"end"} pt={3}>
          <Grid item>
            <Button onClick={confirm}>Confirm</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => navigate("/todos")} color="secondary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UpsertTodoItem;
