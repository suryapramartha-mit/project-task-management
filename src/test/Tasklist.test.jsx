import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { render, screen, waitFor } from '@testing-library/react';
import { fetchTasks } from '../apis/taskApi.js';
import TaskList from '../components/TaskList.jsx';

vi.mock('../apis/taskApi.js', () => ({
  fetchTasks: vi.fn(),
}));

describe('TaskList Component', () => {
  const mockTasks = [
    {
      id: 1,
      name: 'Task 1',
      projectName: 'Project A',
      description: 'Description 1',
      dueDate: new Date().toISOString(),
      priority: 1,
      status: 'PENDING',
      assignedTo: 'Employee A',
    },
  ];

  it('renders tasks in table view', async () => {
    fetchTasks.mockResolvedValueOnce({ data: { content: mockTasks, totalElements: 1 } });

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TaskList refresh={0} />
      </LocalizationProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Project A/i)).toBeInTheDocument();
    });
  });

  it('shows error snackbar on fetch failure', async () => {
    fetchTasks.mockRejectedValueOnce(new Error('Fetch failed'));

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TaskList refresh={0} />
      </LocalizationProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch tasks/i)).toBeInTheDocument();
    });
  });
});
