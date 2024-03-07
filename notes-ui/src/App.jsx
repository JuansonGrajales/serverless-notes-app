import './App.css';
import Header from './components/header';
import Search from './components/search';
import Notes from './components/notes';
import { useState } from 'react';
import { useNotes } from './hooks/useNotes';


function App() {
  const [searchText, setSearchText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [inputText, setInputText] = useState("");
  
  // Callback that resets UI state, passed to the useNotes hook
  const noteSavedHandler = () => {
    setEditingNoteId(null);
    setInputText("");
  }
  
  const { notes, saveNote, deleteNote } = useNotes(noteSavedHandler);
  
  // save or update note
  const saveHandler = () => { 
    saveNote(editingNoteId, inputText);
  }

  // edit note
  const editHandler = (id, text) => {
    setEditingNoteId(id);
    setInputText(text);
  }

  // update note's input text
  const inputTextHandler = (text) => {
    setInputText(text);
  }

  // update search text
  const searchHandler = (text) => {
    setSearchText(text);
  }

  return (
    <div className='main'>
      <Header/>
      <Search searchHandler={searchHandler}/>
      <Notes 
        notes={notes}
        saveHandler={saveHandler}
        deleteHandler={deleteNote}
        inputText={inputText}
        inputTextHandler={inputTextHandler} 
        editingNoteId={editingNoteId}
        editHandler={editHandler}
        searchText={searchText}/>
    </div>
  );
}

export default App
