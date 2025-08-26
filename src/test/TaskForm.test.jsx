import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../components/TaskForm';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { employees, priorities, projects } from '../data';

// Mock the data
vi.mock('../data', () => ({
  projects: [{ id: '1', name: 'Project A' }],
  employees: [{ id: '101', name: 'Employee test A' }],
  priorities: [
    { id: 1, name: "Highest" },
    { id: 2, name: "High" },
    { id: 3, name: "Medium" },
    { id: 4, name: "Low" },
    { id: 5, name: "Lowest" },
  ],
}));

vi.mock("../api", () => ({
  createTask: vi.fn().mockResolvedValue({ data: { id: 1, name: "New Task" } }),
}));

describe("TaskForm Component", () => {
  it("enables Add Task button after all fields are filled", async () => {
    const user = userEvent.setup();
    const mockOnTaskCreated = vi.fn();

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TaskForm onTaskCreated={mockOnTaskCreated} />
      </LocalizationProvider>
    );

    // Select project
    const projectSelect = screen.getByLabelText(/project/i);
    await user.click(projectSelect);
    const projectOption = screen.getByRole("option", { name: projects[0].name });
    await user.click(projectOption);

    // Type task name
    const taskNameInput = screen.getByLabelText(/task name/i);
    await user.type(taskNameInput, "Test Task");

    // Type description
    const descInput = screen.getByLabelText(/description/i);
    await user.type(descInput, "Test description");

    // Select priority
    const prioritySelect = screen.getByLabelText(/priority/i);
    await user.click(prioritySelect);
    const priorityOption = screen.getByRole("option", { name: priorities[0].name });
    await user.click(priorityOption);

    // Select assignee
    const assignSelect = screen.getByLabelText(/assign to/i);
    await user.click(assignSelect);
    const assignOption = screen.getByRole("option", { name: employees[0].name });
    await user.click(assignOption);

    // Fill due date (DesktopDatePicker uses input)
    const dateInput = screen.getAllByLabelText(/due date/i)[0];
    await user.type(dateInput, "2025-08-26");

    // Assert button is enabled
    const addButton = screen.getByRole("button", { name: /add task/i });
    expect(addButton).toBeEnabled();
  });
});
