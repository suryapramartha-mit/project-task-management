import { Grid, Paper, Typography, Box, Tooltip } from "@mui/material";
import { format, startOfWeek, addDays } from "date-fns";

export default function TaskCalendar({ tasks }) {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 }); 
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <Grid container spacing={1}>
      {days.map(day => (
        <Grid item xs={12 / 7} key={day}>
          <Paper  sx={{ padding: 1, minHeight: 100, minWidth:120 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {format(day, "EEE dd/MM")}
            </Typography>

            {tasks
              .filter(task => new Date(task.dueDate).toDateString() === day.toDateString())
              .map(task => (
                <Tooltip
                  key={task.id}
                  title={
                    <Box>
                      <Typography variant="body2"><strong>Project:</strong> {task.projectName}</Typography>
                      <Typography variant="body2"><strong>Priority:</strong> {task.priority}</Typography>
                      <Typography variant="body2"><strong>Assignee:</strong> {task.assignedTo}</Typography>
                      <Typography variant="body2"><strong>Description:</strong> {task.description}</Typography>
                    </Box>
                  }
                  arrow
                >
                  <Box
                    sx={{
                      mt: 0.5,
                      p: 0.5,
                      bgcolor: "wheat",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="body2" noWrap>
                      {task.name}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
