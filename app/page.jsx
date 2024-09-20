'use client';
import { GanttChart } from '../components/gantt-chart';
import { People } from '../components/people';
import { fetchPeople } from '../lib/fetch-people';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  const [people, setPeople] = useState([]);

  useEffect(async () => {
    const data = await fetchPeople();
    setPeople(data);
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href='/'>Home</Link>
        <People people={people} />
      </header>
      <main className={styles.main}>
        <GanttChart />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
