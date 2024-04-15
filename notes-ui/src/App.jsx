import './App.css';
import Header from './components/header';
import Search from './components/search';
import Notes from './components/notes';
import { useState } from 'react';
import { useNotes, GET_NOTES } from './hooks/useNotes';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

function App() {
  const [searchText, setSearchText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [inputText, setInputText] = useState("");  
  const { notes, loading, error } = useNotes(GET_NOTES);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

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
        inputText={inputText}
        inputTextHandler={inputTextHandler} 
        editingNoteId={editingNoteId}
        editHandler={editHandler}
        searchText={searchText}/>
    </div>
  );
}

export default withAuthenticator(App);
