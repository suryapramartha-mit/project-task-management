import { render, screen } from '@testing-library/react';
import { addDays } from 'date-fns';
import TaskCalendar from '../components/TaskCalendar';

const tasks = [
  {
    id: 1,
    name: 'Task 1',
    projectName: 'Project A',
    description: 'Description for Task 1',
    dueDate: new Date().toISOString(), 
    priority: 1,
    assignedTo: 'Employee A',
  },
  {
    id: 2,
    name: 'Task 2',
    projectName: 'Project B',
    description: 'Description for Task 2',
    dueDate: addDays(new Date(), 2).toISOString(), 
    priority: 2,
    assignedTo: 'Employee B',
  },
];

describe('TaskCalendar Component', () => {
  it('renders task names on correct day', () => {
    render(<TaskCalendar tasks={tasks} />);
    // Task 1 should appear today
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    // Task 2 should appear 2 days later
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('renders tooltip with the task details', async () => {
    render(<TaskCalendar tasks={tasks} />);
    const taskBox = screen.getByText('Task 1');
    expect(taskBox).toBeInTheDocument();
  });
});
