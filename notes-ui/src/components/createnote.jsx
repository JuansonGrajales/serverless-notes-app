import React from "react";

const CreateNote = ({inputText, setInputText, saveHandler}) => {
    const MAX_CHAR_LIMIT = 300;
    const MIN_CHAR_LIMIT = 10;
    const charCount = MAX_CHAR_LIMIT - inputText.length;
    return (
    <div className="note">
        <textarea 
        cols={10} 
        rows={5} 
        placeholder="Type.." 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
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