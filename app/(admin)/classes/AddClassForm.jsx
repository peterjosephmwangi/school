// app/admin/classes/AddClassForm.js
"use client";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";

export default function AddClassForm({ open, onClose }) {
  const [name, setName] = useState("");
  const [sections, setSections] = useState("");
  const [groups, setGroups] = useState("");
  const [subjects, setSubjects] = useState("");
  const [teacher, setTeacher] = useState("");
  const [studentCapacity, setStudentCapacity] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          sections,
          groups,
          subjects,
          teacher,
          studentCapacity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add class");
      }

      // Handle successful response
      onClose();
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
