import React from "react";
import { MAX_CHAR_LIMIT, MIN_CHAR_LIMIT } from "../constants";

const CreateNote = ({inputText, inputTextHandler, saveHandler}) => {
    const charCount = MAX_CHAR_LIMIT - inputText.length;
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
    </div>
  );
}

export default CreateNote