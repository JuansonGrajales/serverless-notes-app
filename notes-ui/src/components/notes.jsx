import { useEffect, useState } from 'react'
import React from 'react'
import CreateNote from './createnote'
import './notes.css'
import {v4 as uuid} from 'uuid'
import Note from './note'


const Notes = () => {
    const [inputText, setInputText] = useState("");
    const [notes, setNotes] = useState([]);
    const [editToggle, setEditToggle] = useState(null);

    const editHandler = (id, text) => {
        setEditToggle(id);
        setInputText(text);
    }
    const saveHandler = () => {
        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ? 
                {...note, text: inputText} : note
            )));
        } else {
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    text: inputText,
                }
            ]);
        }
        
        setInputText("");
        setEditToggle(null);
    }

    const deleteHandler = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    }
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
            setNotes(data);
        }
    }, []);
    
    useEffect(() => {
        window.localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes])
    return (
    <div className='notes'>
        {
            notes.map((note) => (
                editToggle === note.id ?
                <CreateNote 
                inputText={inputText}
                setInputText={setInputText}
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
            editToggle === null ?
            <CreateNote 
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
            />
            : <></>
        }
    </div>
  )
}

export default Notes