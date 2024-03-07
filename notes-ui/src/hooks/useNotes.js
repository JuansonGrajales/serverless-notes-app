import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useNotes = (onNoteSaved) => {
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(notes);
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const saveNote = (id, text) => {
        setNotes(prev => id ? prev.map(note => note.id === id ? {...note, text} : note) : [...prev, {id: uuidv4(), text}]);
        // Notify component after note is saved
        onNoteSaved(); 
    };

    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    return {notes, saveNote, deleteNote};
};