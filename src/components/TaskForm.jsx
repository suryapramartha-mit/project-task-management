import { Button, Grid, TextField, MenuItem, FormControl, InputLabel, Select, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";
import { createTask } from "../api";
import { employees, projects, priorities } from "../data";

export default function TaskForm({ onTaskCreated }) {
    
    const [projectId, setProjectId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState("");
    const [assignedToId, setAssignedToId] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        setFieldErrors({});
        
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
            if (error.response) {
            const { responseStatus, detailErrors } = error.response.data;

            setErrorMessage(responseStatus?.message || "Something went wrong.");

            if (detailErrors && Array.isArray(detailErrors)) {
                // Convert array into object for easy access: { fieldName: message }
                const errorMap = {};
                detailErrors.forEach(err => {
                    errorMap[err.field] = err.message;
                });
                setFieldErrors(errorMap);
            }
        } else {
            setErrorMessage("An unexpected error occurred.");
        }

        console.error("Error creating task:", errorMessage , error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel>Project</InputLabel>
                        <Select
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        label="Project"
                        >
                            {projects.map((project) => (
                                <MenuItem key={project.id} value={project.id}>
                                    {project.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        required
                        label="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        required
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <DesktopDatePicker
                        label="Due Date"
                        inputFormat="yyyy-MM-dd"
                        value={dueDate}
                        required
                        onChange={(newDate) => setDueDate(newDate)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid>
                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        label="Priority"
                        >
                            {priorities.map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                    {p.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel>Assign To</InputLabel>
                    <Select
                      value={assignedToId}
                      onChange={(e) => setAssignedToId(e.target.value)}
                      label="Assign To"
                    >
                      {employees.map((emp) => (
                        <MenuItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* {errorMessage && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                  {errorMessage} : {Object.values(fieldErrors)[0]}
                </Typography>
                  )} */}
               
                <Grid item>
                    <Button type="submit" variant="contained" color="primary" fullWidth
                    disabled={!projectId || !taskName || !description || !dueDate || !priority || !assignedToId}>
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
