import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from "../constants";
import Cookies from "js-cookie";

function AddStudentButton() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const token = Cookies.get("XSRF-TOKEN");
    const response = await fetch(`${SERVER_URL}/admin`, {
      method: "GET",
      headers: {
        "X-XSRF-TOKEN": token,
      },
      credentials: 'include'
    });

    if (response.ok) {
      setIsAdmin(true);
    } 
  }

  return (
    <div>
      <Link to={{pathname:"/addStudent", state: {admin: isAdmin} }}>
        { 
          isAdmin &&
          <Button id="addStudentButton" sx={{m:2}} variant="outlined">
            Add Student
          </Button>
        }
      </Link>
    </div>
  )
}

export default AddStudentButton