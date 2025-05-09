'use client';
import { useState } from 'react';

const Page = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <Counter
        name='Increase 1'
        value={count1}
        onClick={() => setCount1((old) => ++old)}
      />
      <Counter
        name='Increase 2'
        value={count2}
        onClick={() => setCount2((old) => ++old)}
      />
    </div>
  );
};

export default Page;

const Counter = ({ name, value, onClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
      }}
    >
      {value}
      <button onClick={onClick}>{name}</button>
    </div>
  );
};
