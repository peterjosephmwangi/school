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

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassCapacity, setNewClassCapacity] = useState("");
  const [name, setName] = useState("");
  const [sections, setSections] = useState("");
  const [groups, setGroups] = useState("");
  const [subjects, setSubjects] = useState("");
  const [teacher, setTeacher] = useState("");
  const [studentCapacity, setStudentCapacity] = useState("");

  // Fetch classes data from the API
  useEffect(() => {
    fetch("/api/classes")
      .then((res) => res.json())
      .then(setClasses);
  }, []);

  // Handle form submission to add a new class
  const handleAddClass = () => {
    fetch("/api/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newClassName, capacity: newClassCapacity }),
    })
      .then((res) => res.json())
      .then((newClass) => {
        setClasses([...classes, newClass]);
        setOpen(false);
        setNewClassName("");
        setNewClassCapacity("");
      });
  };

  // Render the component
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Classes
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Class
      </Button>
      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.capacity}</TableCell>
                <TableCell>{/* Add edit and delete actions here */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog for adding a new class */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Sections"
            fullWidth
            value={sections}
            onChange={(e) => setSections(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Groups"
            fullWidth
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Subjects"
            fullWidth
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Teacher"
            fullWidth
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Student Capacity"
            fullWidth
            type="number"
            value={studentCapacity}
            onChange={(e) => setStudentCapacity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddClass} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
