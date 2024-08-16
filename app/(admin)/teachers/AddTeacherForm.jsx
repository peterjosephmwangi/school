"use client";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

export default function AddTeacherForm({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [subjects, setSubjects] = useState("");
  const [assignedClasses, setAssignedClasses] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    const newTeacher = {
      name,
      email,
      password,
      profileImage,
      subjects: subjects.split(",").map((subject) => subject.trim()), // Convert comma-separated string to array
      assignedClasses: assignedClasses
        .split(",")
        .map((classId) => classId.trim()), // Convert comma-separated string to array
      contactInfo: { phone, address },
    };

    onAdd(newTeacher); // Pass the new teacher data back to the parent
    setName("");
    setEmail("");
    setPassword("");
    setProfileImage("");
    setSubjects("");
    setAssignedClasses("");
    setPhone("");
    setAddress("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Teacher</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Profile Image URL"
          fullWidth
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Subjects (comma separated)"
          fullWidth
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Assigned Classes (comma separated Class IDs)"
          fullWidth
          value={assignedClasses}
          onChange={(e) => setAssignedClasses(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+1</InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
