import React from 'react';
import { Note } from '@/types/note';
import css from './NoteCard.module.css';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className={css.card}>
      <h3 className={css.title}>{note.title}</h3>
      <p className={css.content}>{note.content}</p>
      {note.tag && (
        <span className={css.tag}>
          {note.tag}
        </span>
      )}
    </div>
  );
};

export default NoteCard;