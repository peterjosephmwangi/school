// app/(admin)/layout.js
"use client";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            School Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              "Classes",
              "Sections",
              "Groups",
              "Students",
              "Teachers",
              "Attendance",
              "Results",
              "Library",
              "Transport",
              "Accounting",
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                href={`/admin/${text.toLowerCase()}`}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>{children}</Container>
      </Box>
    </Box>
  );
}
