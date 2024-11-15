import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {addMessage, createChat} from '../store/chatSlice';
import {v4 as uuidv4} from 'uuid';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import ChatMessageList from './chat/ChatMessageList';
import EmptyState from './chat/EmptyState';

const ChatInterface: React.FC = () => {
    const dispatch = useDispatch();
    const {chats, activeChat} = useSelector((state: RootState) => state.chat);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const wsUrl = 'ws://localhost:11203/chat'; // Replace with your WebSocket URL

    const activeMessages = chats.find((chat) => chat.id === activeChat)?.messages || [];

    const handleSendMessage = useCallback(
        async (content: string) => {
            if (!content.trim() || !socket) return;

            let currentChatId = activeChat;

            if (!currentChatId) {
                const newChat = {
                    id: uuidv4(),
                    title: content.slice(0, 30) + '...',
                    messages: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                dispatch(createChat(newChat));
                currentChatId = newChat.id;
            }

            const userMessage = {
                id: uuidv4(),
                role: 'user' as const,
                content,
                timestamp: Date.now(),
            };

            dispatch(addMessage({chatId: currentChatId, message: userMessage}));

            socket.send(content); // Send the message through the WebSocket
        },
        [activeChat, dispatch, socket],
    );

    useEffect(() => {
        const newSocket = new WebSocket(wsUrl);

        newSocket.addEventListener('open', () => {
            console.log('WebSocket connection opened');
            setSocket(newSocket);
        });

        newSocket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            dispatch(addMessage({chatId: activeChat!, message})); // Assuming activeChat is always set when receiving a message
        });

        newSocket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
            setSocket(null);
        });

        return () => {
            newSocket.close();
        };
    }, [dispatch, wsUrl, activeChat]);

    return (
        <div className="flex h-full">
            <ChatList/>
            <div className="flex-1 flex flex-col">
                {activeChat || chats.length === 0 ? (
                    <>
                        <ChatMessageList messages={activeMessages} loading={false}/>
                        <ChatInput onSendMessage={handleSendMessage}
                                   disabled={!socket}/> {/* Disable input if not connected */}
                    </>
                ) : (
                    <EmptyState/>
                )}
            </div>
        </div>
    );
};

export default ChatInterface;