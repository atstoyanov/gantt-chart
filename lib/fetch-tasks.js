export const fetchTasks = async () => {
  const data = await fetch(`http://localhost:3000/api/tasks`);
  return await data.json();
};
