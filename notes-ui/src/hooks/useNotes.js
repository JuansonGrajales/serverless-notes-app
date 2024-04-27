import { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

export const GET_NOTES = gql`
    query GetNotes($userId: String!) {
        getNotes(userId: $userId) {
            id
            content
        }
    }
`;

export const useNotes = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    // Lazy query to fetch notes only when triggered
    const [fetchNotes, { data, loading, error }] = useLazyQuery(GET_NOTES);
    // Function to get notes for specific user
    const getNotes = (userId) => {
        fetchNotes({ variables: { userId }});
    };
    // Watch for changes in currentUser and trigger query when set
    useEffect(() => {
        if (currentUserId) {
            getNotes(currentUserId); // Trigger fetch when user ID is available
        }
    }, [currentUserId]);
    return { 
        setUserId: setCurrentUserId, // Function to set current user
        getNotes, // Function to manually fetch notes
        notes: data?.getNotes || [], 
        loading, 
        error 
    };
};
