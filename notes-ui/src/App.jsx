import './App.css';
import Header from './components/header';
import Search from './components/search';
import Notes from './components/notes';
import { useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState("");

  const searchHandler = (text) => {
    setSearchText(text);
  }
  return (
    <div className='main'>
      <Header/>
      <Search searchHandler={searchHandler}/>
      <Notes/>
    </div>
  );
}

export default App
