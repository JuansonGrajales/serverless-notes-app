import React from 'react';
import { useDeleteNote } from '../hooks/useDeleteNote';

const Note = ({id, text, editHandler}) => {
    const { deleteNote, loading, error } = useDeleteNote();
    
    const deleteHandler = async () => {
        try {
            await deleteNote(id);
        } catch(e) {
            console.error("Error deleting note: ", e);
        }
    };

    return (
        <div className='note'>
            <div className='note_body'>{text}</div>
            <div className='note_footer'>
                <button className='note_button' onClick={() => editHandler(id, text)}>Edit</button>
                <button className='note_button' onClick={deleteHandler}>Delete</button>
                {loading && <p>Saving...</p>}
                {error && <p className="error">Error deleting note.</p>}
            </div>
        </div>
    );
}

export default Note