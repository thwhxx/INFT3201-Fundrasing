// src/app/programs/components/ProgramForm.tsx
'use client';
import { useState } from 'react';

// Types for form data and props
interface ProgramFormData {
  name: string;
  category: 'energy_research' | 'education_research' | 'undergraduate' | 'graduate';
  description: string;
  campus_location: 'main' | 'downtown' | 'east' | 'west';
}

interface ProgramFormProps {
  onSubmit: (data: ProgramFormData) => void;
  onClose: () => void;
  initialData?: ProgramFormData;
}

interface FormErrors {
  name?: string;
  description?: string;
}

export default function ProgramForm({ onSubmit, onClose, initialData }: ProgramFormProps) {
  // Form state
  const [formData, setFormData] = useState<ProgramFormData>(initialData || {
    name: '',
    category: 'undergraduate',
    description: '',
    campus_location: 'main'
  });

  // Error state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Program name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="program-form" onClick={e => e.stopPropagation()}>
        <h2>{initialData ? 'Edit Program' : 'Add New Program'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Program Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter program name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="energy_research">Energy Research</option>
              <option value="education_research">Education Research</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter program description"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="campus_location">Campus Location:</label>
            <select
              id="campus_location"
              name="campus_location"
              value={formData.campus_location}
              onChange={handleChange}
            >
              <option value="main">Main Campus</option>
              <option value="downtown">Downtown Campus</option>
              <option value="east">East Campus</option>
              <option value="west">West Campus</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Program' : 'Create Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}