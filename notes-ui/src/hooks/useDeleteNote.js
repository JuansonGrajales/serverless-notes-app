import { useMutation, gql } from "@apollo/client";


const DELETE_NOTE = gql`
    mutation DeleteNote($id: ID!) {
        deleteNote(id: $id) {
            success
            message
        }
    }
`;

export const useDeleteNote = () => {
    const [deleteNoteMutation, { loading, error }] = useMutation(DELETE_NOTE, {
        update: (cache, { data: { deleteNote } }, variables) => {
            if (deleteNote?.success) {
                const deleteNoteId = variables.variables.id;
                cache.modify({
                    fields: {
                        getNotes(existingNotesRefs = [], { readField }) {
                            return existingNotesRefs.filter(
                                noteRef => deleteNoteId !== readField('id', noteRef));
                        }
                    },
                });
            }
        },
    });
    const deleteNote = (id) => {
        return deleteNoteMutation({
            variables: { id }
        });
    }
    return { deleteNote, loading, error };
};