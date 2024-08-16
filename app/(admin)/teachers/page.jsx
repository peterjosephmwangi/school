"use client";
import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddTeacherForm from "./AddTeacherForm";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch teachers data from the API
  useEffect(() => {
    fetch("/api/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data.data || []))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  // Handle form submission to add a new teacher
  //   const handleAddTeacher = (newTeacher) => {
  //     fetch("/api/teachers", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newTeacher),
  //     })
  //       .then((res) => res.json())
  //       .then((addedTeacher) => {
  //         setTeachers([...teachers, addedTeacher.data]);
  //         setOpen(false);
  //       })
  //       .catch((error) => console.error("Error adding teacher:", error));
  //   };
  const handleAddTeacher = () => {
    fetch("/api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "joe",
        email: "joe@gmail.com",
        password: "123seee",
        profileImage: "urlilinke",
        subjects: ["weee"],
        assignedClasses: ["2"],
        contactInfo: { phone: "21548722222", address: "gilg" },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Handle response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Teachers
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Teacher
      </Button>
      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Subjects</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.contactInfo.phone}</TableCell>
                <TableCell>{teacher.contactInfo.address}</TableCell>
                <TableCell>{teacher.subjects.join(", ")}</TableCell>
              
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </Paper>

      {/* Dialog for adding a new teacher */}
      <AddTeacherForm
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddTeacher}
      />
    </Box>
  );
}
