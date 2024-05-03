import './App.css';
import '@aws-amplify/ui-react/styles.css';
import Header from './components/header';
import Search from './components/search';
import Notes from './components/notes';
import config from './amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
import { createContext, useEffect, useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import Loading from './components/loading';

Amplify.configure(config);
export const AuthContext = createContext(undefined);

function App() {
  const [initalLoading, setInitialLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);  
  const { setUserId, getNotes, notes, loading, error } = useNotes();

  // Fetch current autehnticated user on component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        setUserId(user.userId);
        setInitialLoading(false);
      } catch (err) {
        console.error('Error fetching user: ', err);
      }
    };
    fetchUser();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>
  if (initalLoading) {
    return <Loading/>
  }
  return (
    <AuthContext.Provider value={currentUser}>
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
    </AuthContext.Provider>
  );
}

export default withAuthenticator(App);
