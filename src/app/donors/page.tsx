import { Suspense } from 'react';
import DonorList from './components/DonorList';
import DonorStats from './components/DonorStats';
import styles from './donors.module.css';

export default function DonorsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Donor Management</h1>
      <div className={styles.content}>
        <Suspense fallback={<div>Loading statistics...</div>}>
          <DonorStats />
        </Suspense>
        <Suspense fallback={<div>Loading donors...</div>}>
          <DonorList />
        </Suspense>
      </div>
    </div>
  );
}