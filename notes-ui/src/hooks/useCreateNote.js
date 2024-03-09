import { useMutation, gql } from "@apollo/client";
import { GET_NOTES } from "./useNotes";

const CREATE_NOTE = gql`
    mutation CreateNote($content: String!) {
        createNote(content: $content) {
            note {
                id
                content
                createdAt
            }
            success
            message
        }
    }
`;

export const useCreateNote = () => {
    const [createNoteMutation, { loading, error }] = useMutation(CREATE_NOTE, {
        update: (cache, { data: { createNote } }) => {
            try {
                // Attempt to read the existing notes from the cache
                const existingNotesData = cache.readQuery({ query: GET_NOTES });
                if (existingNotesData && createNote.note) {
                    // Next, add the new note to the array of notes
                    const updatedNotes = [...existingNotesData.getNotes, createNote.note];
                    // Finally, write the updated array of notes back to the cache
                    cache.writeQuery({
                        query: GET_NOTES,
                        data: { getNotes: updatedNotes }
                    });
                }
            } catch(e) {
                console.error('Error updating the cache', e);
                // handle the error or initialize state as needed
                // this might include user notification or logging
            }
        }
    });
    // Wrap createNoteMutation to simplify its calling signature
    const createNote = (content) => {
        return createNoteMutation({
            variables: { content }
        });
    }
    return { createNote, loading, error };
};