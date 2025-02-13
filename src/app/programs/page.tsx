import ProgramStats from "@/app/programs/component/ProgramStats";
import styles from "./programs.module.css";
import ProgramList from "@/app/programs/component/ProgramList";

export default function ProgramsPage() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1>Program Management</h1>
        </div>
        <div className={styles.content}>
          <ProgramStats />
          <ProgramList />
        </div>
      </div>
    );
  }