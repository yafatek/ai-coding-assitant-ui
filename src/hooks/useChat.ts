import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addMessage, setLoading, setError } from '../store/chatSlice';
import { sendMessage } from '../services/api';
import type { Message } from '../types/chat';

export const useChat = (chatId: string | null) => {
  const dispatch = useDispatch();

  const sendChatMessage = useCallback(
    async (content: string) => {
      if (!chatId) return;

      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      dispatch(addMessage({ chatId, message: userMessage }));
      dispatch(setLoading(true));

      try {
        const response = await sendMessage(content);
        const assistantMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: response.message,
          timestamp: Date.now(),
        };
        dispatch(addMessage({ chatId, message: assistantMessage }));
      } catch (error) {
        dispatch(setError('Failed to get response from AI'));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [chatId, dispatch]
  );

  return { sendChatMessage };
};