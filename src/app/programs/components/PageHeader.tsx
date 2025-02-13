'use client';

interface PageHeaderProps {
  onAddClick: () => void;
}

export default function PageHeader({ onAddClick }: PageHeaderProps) {
  return (
    <header className="programs-header">
      <h1>Program Management</h1>
      <button 
        className="add-program-btn"
        onClick={onAddClick}
      >
        Add New Program
      </button>
    </header>
  );
}