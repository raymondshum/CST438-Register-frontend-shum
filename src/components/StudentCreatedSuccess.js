import React from "react";

function StudentCreatedSuccess(returnedStudent) {
  const { student_id, studentName, studentEmail, studentStatus, studentCode } =
    returnedStudent.returnedStudent;

  return <div> 
    <h1>
      Student Created!
    </h1>
    <p>
      StudentID: {student_id}<br/>
      Name: {studentName ? studentName : "No name provided, yet."}<br/>
      Email: {studentEmail}<br/>
      Status: {studentStatus ? studentStatus : "No status set, yet"}<br/>
      Code: {studentCode}<br/>
    </p>
  </div>;
}

export default StudentCreatedSuccess;
