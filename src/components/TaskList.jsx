import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTasks } from "../api";
import TaskTable from "../components/TaskTable.jsx";

export default function TaskList({ refresh, filters }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await fetchTasks(0, 10, filters);
      setTasks(response.data.content || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [refresh, filters]);

  if (loading) return <CircularProgress />;

  if (!tasks.length)
    return <Typography>No tasks found</Typography>;

  return (
    <TaskTable tasks={tasks} />
  );
}
