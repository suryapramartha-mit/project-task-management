import { render, screen } from '@testing-library/react';
import TaskTable from '../components/TaskTable';

describe('TaskTable Component', () => {
  const mockTasks = [
    {
      id: 1,
      projectName: 'Project A',
      name: 'Task 1',
      description: 'Description 1',
      dueDate: '2025-08-26',
      priority: 1,
      status: 'PENDING',
      assignedTo: 'Employee A',
    },
    {
      id: 2,
      projectName: 'Project B',
      name: 'Task 2',
      description: 'Description 2',
      dueDate: '2025-08-27',
      priority: 2,
      status: 'IN_PROGRESS',
      assignedTo: 'Employee B',
    },
  ];

  it('renders table headers correctly', () => {
    render(<TaskTable tasks={[]} />);
    expect(screen.getByText(/Project Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Due Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Priority/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Assignee/i)).toBeInTheDocument();
  });

  it('renders all tasks passed as props', () => {
    render(<TaskTable tasks={mockTasks} />);

    mockTasks.forEach(task => {
      expect(screen.getByText(task.projectName)).toBeInTheDocument();
      expect(screen.getByText(task.name)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
      expect(screen.getByText(task.dueDate)).toBeInTheDocument();
      expect(screen.getByText(task.priority.toString())).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
      expect(screen.getByText(task.assignedTo)).toBeInTheDocument();
    });
  });

  it('renders no rows if tasks array is empty', () => {
    render(<TaskTable tasks={[]} />);
    // Only header row should exist
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1);
  });
});
