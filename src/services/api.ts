import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:11203', // Updated to HTTPS
    withCredentials: true,  // Ensures cookies/credentials are sent if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export const sendMessage = async (message: string) => {
    try {
        const response = await api.post('/chats', {message});
        return response.data;
    } catch (error) {
        console.error('Error in sendMessage:', error);  // Add error logging for better debugging
        throw new Error('Failed to send message');
    }
};

export const getChats = async () => {
    try {
        const response = await api.get('/chats');
        return response.data;
    } catch (error) {
        console.error('Error in getChats:', error);  // Add error logging for better debugging
        throw new Error('Failed to fetch chats');
    }
};
