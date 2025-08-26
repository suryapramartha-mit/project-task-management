import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../components/TaskForm';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Mock data for projects and employees
vi.mock('../data', () => ({
  projects: [{ id: '1', name: 'Project A' }],
  employees: [{ id: '101', name: 'Employee test A' }]
}));

// Mock the API
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

    const button = screen.getByRole("button", { name: /add task/i });
    expect(button).toBeDisabled();

    // Fill the fields
    await user.click(screen.getByLabelText(/project/i));
    await user.click(screen.getByText("Project A"));

    await user.type(screen.getByLabelText(/task name/i), "New Task");
    await user.type(screen.getByLabelText(/description/i), "Some description");
    await user.type(screen.getByLabelText(/priority/i), "3");

    await user.click(screen.getByLabelText(/assign to/i));
    await user.click(screen.getByText("Employee test A"));

    // For DatePicker (direct input)
    const dateInput = screen.getByLabelText(/due date/i);
    await user.type(dateInput, "2025-08-26");
    await user.tab(); // to trigger blur

    expect(button).toBeEnabled();

    // Submit the form
    await user.click(button);

    expect(mockOnTaskCreated).toHaveBeenCalledWith({ id: 1, name: "New Task" });
  });
});