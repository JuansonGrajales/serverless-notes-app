import React from 'react';

const Note = ({id, text, editHandler, deleteHandler}) => {
    return (
        <div className='note'>
            <div className='note_body'>{text}</div>
            <div className='note_footer'>
                <button className='note_button' onClick={() => editHandler(id, text)}>Edit</button>
                <button className='note_button' onClick={()=> deleteHandler(id)}>Delete</button>
            </div>
        </div>
    );
}

export default Note