import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { createTask } from "../api";

export default function TaskForm({ onTaskCreated }) {
    const [projectId, setProjectId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState("");
    const [assignedToId, setAssignedToId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTask({projectId, taskName, description, dueDate, priority, assignedToId });
            onTaskCreated(response.data);
            setProjectId("");
            setTaskName("");
            setDescription("");
            setDueDate(null);
            setPriority("");
            setAssignedToId("");
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Project ID"
                        type="number"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DesktopDatePicker
                        label="Due Date"
                        inputFormat="yyyy-MM-dd"
                        value={dueDate}
                        onChange={(newDate) => setDueDate(newDate)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Priority"
                        placeholder="1-High 5-Low"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Assigned to"
                        value={assignedToId}
                        onChange={(e) => setAssignedToId(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
