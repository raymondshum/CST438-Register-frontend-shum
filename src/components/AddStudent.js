import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_URL } from "../constants";

function AddStudent() {
  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    studentEmail: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmailError(false);
    setStudentInfo({
      studentName: "",
      studentEmail: ""
    })
  };

  const handleChange = (e) => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    // addStudent(studentInfo);
    if(studentInfo.studentEmail === "" 
      || !isValidEmail(studentInfo.studentEmail)) {
      setEmailError(true)
    } else {
      addStudent(studentInfo);
      handleClose();
    }
  };

  const addStudent = async (studentInfo) => {
    const token = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`${SERVER_URL}/student`, {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentInfo),
    });

    if (response.ok) {
      toast.success(`Student has been added: ${studentInfo.studentName ? studentInfo.studentName : studentInfo.studentEmail}`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.log(studentInfo)
    } else {
      const data = await response.json();
      toast.error(`Error: ${data.message}`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  // regex from: https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
  const isValidEmail = (emailAddress) => {
    return /.+@.+\.[A-Za-z]+$/.test(emailAddress)
  }
  
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Add Student
          </Typography>
        </Toolbar>
      </AppBar>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleOpen}
      >
        Add Student
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="add-student-dialogue-title">Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={studentInfo.studentName}
            onChange={handleChange}
            name="studentName"
            label="Name"
            fullWidth
          />
          <TextField
            error={emailError}
            helperText={emailError && "Invalid email address format!"}
            autoFocus
            margin="dense"
            value={studentInfo.studentEmail}
            onChange={handleChange}
            name="studentEmail"
            label="Email(*)"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Submit</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default AddStudent;
