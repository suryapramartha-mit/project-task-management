import { CircularProgress, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTasks } from "../apis/taskApi.js";
import TaskTable from "../components/TaskTable.jsx";
import TaskCalendar from "../components/TaskCalendar.jsx";
import { projects } from "../data.js";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";


export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("table");

  //filters
  const [projectId, setProjectId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortBy, setSortBy] = useState("");

  //pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const filters = { projectId, startDate, endDate, sortBy };
      const response = await fetchTasks(page, size, filters);
      setTasks(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [refresh, projectId, startDate, endDate, sortBy, page, size]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeSize = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  }

  // Quick filters
  const filterToday = () => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
    setPage(0);
  };

  const filterThisWeek = () => {
    setStartDate(startOfWeek(new Date()));
    setEndDate(endOfWeek(new Date()));
    setPage(0);
  };

  const filterThisMonth = () => {
    setStartDate(startOfMonth(new Date()));
    setEndDate(endOfMonth(new Date()));
    setPage(0);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box mb={2}>
      <Box mb={2}>
        <Button size="small" onClick={() => setViewMode("table")} variant={viewMode==="table" ? "contained":"outlined"}>Table View</Button>
        <Button size="small" onClick={() => setViewMode("calendar")} variant={viewMode==="calendar" ? "contained":"outlined"}>Calendar View (Week)</Button>
      </Box>
      {/* Filters */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <FormControl sx={{minWidth: 150}}>
          <InputLabel>Project</InputLabel>
          <Select value={projectId} onChange={(e) => setProjectId(e.target.value)} label="Project">
            <MenuItem value="">All</MenuItem>
            {projects.map((proj) => (
              <MenuItem key={proj.id} value={proj.id}>
                {proj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DesktopDatePicker sx={{maxWidth:200}}
          label="Start Date"
          inputFormat="yyyy-MM-dd"
          value={startDate}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker sx={{maxWidth:200}}
          label="End Date"
          inputFormat="yyyy-MM-dd"
          value={endDate}
          onChange={setEndDate}
          renderInput={(params) => <TextField {...params} />}
        />

        <FormControl sx={{minWidth: 120}}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="DUE_DATE">Due Date</MenuItem>
            <MenuItem value="PRIORITY">Priority</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={loadTasks}>
          Apply
        </Button>  
      </Box>
      {/* quick filter */}
      <Box display="flex" gap={1} mb={1} >
        <Button variant="outlined" size="small" onClick={filterToday}>
          Due Today
        </Button>
        <Button variant="outlined" size="small" onClick={filterThisWeek}>
          Due This Week
        </Button>
        <Button variant="outlined" size="small" onClick={filterThisMonth}>
          Due This Month
        </Button>
      </Box>
      
      
      
  
      {loading && <CircularProgress />}

      {!loading && tasks.length === 0 && <Typography>No tasks found</Typography>}

      {!loading && tasks.length > 0 && (
        viewMode === "table" ? <TaskTable tasks={tasks} /> : <TaskCalendar tasks={tasks} projects={projects} />
      )}
    {/* Pagination */}
      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={size}
        onRowsPerPageChange={handleChangeSize}/>
    </Box>
  );
}
