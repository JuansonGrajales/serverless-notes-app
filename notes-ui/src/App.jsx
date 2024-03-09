import './App.css';
import Header from './components/header';
import Search from './components/search';
import Notes from './components/notes';
import { useState } from 'react';
import { useNotes, GET_NOTES } from './hooks/useNotes';


function App() {
  const [searchText, setSearchText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [inputText, setInputText] = useState("");  
  const { notes, loading, error } = useNotes(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>
  
  // Callback that resets UI state, passed to the useNotes hook
  // const noteSavedHandler = () => {
  //   setEditingNoteId(null);
  //   setInputText("");
  // }

  // save or update note
  // const saveHandler = () => { 
  //   saveNote(editingNoteId, inputText);
  // }

  const deleteNote = (id) => {
    // setNotes(prev => prev.filter(note => note.id !== id));
  };

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
        // saveHandler={saveHandler}
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
