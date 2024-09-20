import {
  addDays,
  compareAsc,
  compareDesc,
  differenceInDays,
  format,
} from 'date-fns';
import { uniq } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { fetchTasks } from '../lib/fetch-tasks';
import { GanttChartTestIds } from '../utils/constants';
import './gantt-chart.css';

const PriorityColors = {
  High: '#ff6252',
  Medium: '#2ecaac',
  Low: '#54c6f9',
};

export const GanttChart = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const data = await fetchTasks();
    setData(data.flatMap((x) => x.tasks) || []);
  });

  const startDate = useMemo(() => {
    const dates = data.map((task) => task.startDate);
    return dates.sort(compareAsc)[0];
  }, [data]);

  const endDate = useMemo(() => {
    const dates = data.map((task) => task.endDate);
    return dates.sort(compareDesc)[0];
  }, [data]);

  const periods = [];

  for (let i = 0; i <= differenceInDays(endDate, startDate); i++) {
    periods.push(format(addDays(startDate, i), 'dd MMM'));
  }

  const tasks = useMemo(() => {
    return data.reduce((acc, task) => {
      acc[task.type] = acc[task.type] || [];
      acc[task.type].push({
        ...task,
      });
      return acc;
    }, {});
  }, [data]);

  const rows = useMemo(() => {
    return uniq(data.map((task) => task.type));
  }, [data]);

  return (
    <div className={'container'}>
      <div className={'chart'}>
        {/* header */}
        <div className={'chart-row chart-period'}>
          <div className={'chart-row-item'}></div>
          <div
            className={'chart-row-bars'}
            style={{
              gridTemplateColumns: `repeat(${periods.length}, 1fr)`,
            }}
          >
            {periods.map((period) => (
              <span key={period} data-testid={GanttChartTestIds.periods}>
                {period}
              </span>
            ))}
          </div>
        </div>
        {/* lines */}
        <div
          className={'chart-row chart-lines'}
          style={{
            gridTemplateColumns: `150px repeat(${periods.length}, 1fr)`,
          }}
        >
          {periods.map((period) => (
            <span key={period} data-testid={GanttChartTestIds.lines}></span>
          ))}
        </div>
        {/* rows */}
        {rows.map((project) => (
          <div
            key={project}
            className={'chart-row'}
            data-testid={GanttChartTestIds.rows}
          >
            <div className={'chart-row-item'}>{project}</div>
            <ul
              className={'chart-row-bars'}
              style={{
                gridTemplateColumns: `repeat(${periods.length}, 1fr)`,
              }}
            >
              {tasks[project].map((task) => (
                <li
                  style={{
                    gridColumn: `${
                      differenceInDays(task.startDate, startDate) + 1
                    }/span ${
                      differenceInDays(task.endDate, task.startDate) + 1
                    }`,
                    backgroundColor: PriorityColors[task.priority],
                  }}
                  data-testid={GanttChartTestIds.taskBar}
                >
                  {task.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
