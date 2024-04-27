import { useMutation, gql } from "@apollo/client";
import { GET_NOTES } from "./useNotes";

const UPDATE_NOTE = gql`
    mutation UpdateNote($id: ID!, $content: String!) {
        updateNote(id: $id, content: $content) {
            note {
                id
                userId
                content
            }
            success
            message
        }
    }
`;

export const useUpdateNote = () => {
    const [ updateNoteMutation,  {loading, error} ] = useMutation(UPDATE_NOTE, {
        update: (cache, { data: { updateNote } }) => {
            try {
                const existingNotesData = cache.readQuery({ 
                    query: GET_NOTES,
                    variables: { userId: updateNote.note.userId }
                 });
                if (existingNotesData && updateNote.note) {
                    const notes = existingNotesData.getNotes.filter(note => note.id !== updateNote.note.id);
                    const updatedNotes = [...notes, updateNote.note];
                    cache.writeQuery({
                        query: GET_NOTES,
                        data: { getNotes: updatedNotes},
                        variables: {
                            userId: updateNote.note.userId
                        }
                    })

                }
        } catch(e) {
                console.error('Error updating the cache', e);
                // handle the error or initialize state as needed
                // this might include user notification or logging
           }
        } 
    });
    // Wrap updateNoteMutation to simplify its calling signature
    const updateNote = (id, content) => {
        return updateNoteMutation({
            variables: { id, content }
        });
    }
    return { updateNote, loading, error };
} 