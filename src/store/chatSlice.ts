import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Chat, Message } from '../types/chat';

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
      state.activeChat = action.payload.id;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
      const chat = state.chats.find(c => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        chat.updatedAt = Date.now();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { createChat, setActiveChat, addMessage, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;