'use client';

import React, { useState } from 'react';
import { CreateNoteData } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (data: CreateNoteData) => void;
  isLoading?: boolean; // Додаємо опціональний проп isLoading
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tag });
    // Очистити форму після відправки
    setTitle('');
    setContent('');
    setTag('general');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3>Create New Note</h3>
      
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={css.input}
          required
          disabled={isLoading}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={css.textarea}
          required
          disabled={isLoading}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className={css.select}
          disabled={isLoading}
        >
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="ideas">Ideas</option>
          <option value="reminders">Reminders</option>
        </select>
      </div>

      <button 
        type="submit" 
        className={css.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Note'}
      </button>
    </form>
  );
};

export default NoteForm;