import React from "react";
import { MAX_CHAR_LIMIT, MIN_CHAR_LIMIT } from "../constants";
import { useCreateNote } from "../hooks/useCreateNote";
import { useUpdateNote } from "../hooks/useUpdateNote";

const CreateNote = ({inputText, inputTextHandler, editHandler, id}) => {
    const { createNote, loading, error } = useCreateNote();
    const { updateNote, updateloading, updateError } = useUpdateNote();
    const charCount = MAX_CHAR_LIMIT - inputText?.length;
    
    const saveHandler = async () => {
        if (!inputText.trim() || inputText.length < MIN_CHAR_LIMIT) {
            alert("Please enter a valid note with more than 20 characters.")
            return
        }
        try {
            if (id) { // update exisiting notes
                await updateNote(id, inputText);
                editHandler(null);
            } else { // create new note
                await createNote(inputText);
            }
            // Reset inputText for edit and create
            inputTextHandler('');
        } catch (err) {
            console.error("Error creating note: ", err);
            // Handle error feedback, possibly with a more user-friendly notification
        }
    };
    
    return (
    <div className="note new_note">
        <textarea 
        cols={10} 
        rows={5} 
        placeholder="Type.." 
        value={inputText}
        onChange={(e) => inputTextHandler(e.target.value)}
        minLength={MIN_CHAR_LIMIT} 
        maxLength={MAX_CHAR_LIMIT}>
        </textarea>
        <div className="note_footer">
            <span className="label">{charCount} left</span>
            <button className="note_button" onClick={saveHandler}>Save</button>
        </div>
        {loading && <p>Saving...</p>}
        {error && <p>Error saving note: {error.message}</p>}
    </div>
  );
}

export default CreateNote