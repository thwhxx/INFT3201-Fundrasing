'use client';
import { useState, useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramForm from './ProgramForm';
import PageHeader from './PageHeader';
import { Program, ProgramFormData } from '@/types';

export default function ProgramManager() {
  const [showForm, setShowForm] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProgram = async (programData: ProgramFormData) => {
    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      });
      if (response.ok) {
        fetchPrograms();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  return (
    <>
      <PageHeader onAddClick={() => setShowForm(true)} />
      
      {loading ? (
        <div className="loading">Loading programs...</div>
      ) : (
        <ProgramList 
          programs={programs} 
          onRefresh={fetchPrograms} 
        />
      )}

      {showForm && (
        <ProgramForm
          onSubmit={handleAddProgram}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
