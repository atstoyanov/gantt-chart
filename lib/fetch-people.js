export const fetchPeople = async () => {
  const data = await fetch(`http://localhost:3000/api/people`);
  return await data.json();
};
