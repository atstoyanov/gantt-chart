'use client';

import Link from 'next/link';

export const People = ({ people }) => {
  return (
    <div>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <Link href={`${person.id}`}>{person.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
