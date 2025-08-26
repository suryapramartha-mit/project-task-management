import { Snackbar,Alert, Typography,Box,Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {
    const [refresh, setRefresh] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

    const handleTaskCreated = () => {
        setRefresh(!refresh);
        setSnack({ open: true, message: "Task created successfully!", severity: "success" });
        setOpenForm(false);
    };

    return (
        <div style={{ padding: 20 }}>
             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Project Task Management</Typography>
                <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
                    Create Task
                </Button>
            </Box>
            <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent dividers>
                    <TaskForm onTaskCreated={handleTaskCreated} />
                </DialogContent>
            </Dialog>
            <TaskList key={refresh} />
            <Snackbar
              open={snack.open}
              autoHideDuration={3000}
              onClose={() => setSnack({ ...snack, open: false })}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
            <Alert severity={snack.severity} sx={{ width: "100%" }}>
               {snack.message}
             </Alert>
            </Snackbar>
        </div>
    );
}
