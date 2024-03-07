import React from 'react';
import CreateNote from './createnote';
import Note from './note';
import './notes.css';


const Notes = ({notes, saveHandler, deleteHandler, inputText, inputTextHandler, editingNoteId, editHandler, searchText}) => {
    // filter notes based on searchText
    const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()));
    return (
    <div className='notes'>
        {
            filteredNotes.map((note) => (
                editingNoteId === note.id ?
                <CreateNote
                key={`edit-${note.id}`} // unique key for editing note
                inputText={inputText}
                inputTextHandler={inputTextHandler}
                saveHandler={saveHandler}
                />
                :
                <Note
                    key={note.id} 
                    id={note.id} 
                    text={note.text}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}>
                </Note>
            ))
        }
        {
            // Render CreateNote onli if editToggle is null and searchText is empty
            // This ensures CreateNote is not displayed when user is searching for a note
            editingNoteId === null && searchText === ''  ?
            <CreateNote 
            key="new-note" // Unique key for new note
            inputText={inputText}
            inputTextHandler={inputTextHandler}
            saveHandler={saveHandler}
            />
            : <></>
        }
    </div>
  );
}

export default Notes