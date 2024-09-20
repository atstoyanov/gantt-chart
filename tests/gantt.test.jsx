import '@testing-library/jest-dom';
import { getAllByTestId, render, waitFor } from '@testing-library/react';

import { GanttChartTestIds } from '../utils/constants';
import tasks from '../app/api/tasks/tasks.json';

import { GanttChart } from '../components/gantt-chart';
import { fetchTasks } from '../lib/fetch-tasks';

jest.mock('../lib/fetch-tasks');

fetchTasks.mockImplementation(() => {
  return {
    then: (callback) => callback(tasks),
  };
});

it('renders GanttChart component', async () => {
  const { getAllByTestId } = render(<GanttChart />);

  expect(getAllByTestId(GanttChartTestIds.periods)).toHaveLength(30);
  expect(getAllByTestId(GanttChartTestIds.lines)).toHaveLength(30);
  expect(getAllByTestId(GanttChartTestIds.rows)).toHaveLength(3);
  expect(getAllByTestId(GanttChartTestIds.taskBar)).toHaveLength(9);
});
