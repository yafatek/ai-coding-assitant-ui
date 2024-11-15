import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { createChat, setActiveChat } from '../store/chatSlice';
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from './chat/ChatHeader';
import ChatListItem from './chat/ChatListItem';

const ChatList: React.FC = () => {
  const dispatch = useDispatch();
  const { chats, activeChat } = useSelector((state: RootState) => state.chat);

  const handleNewChat = () => {
    const newChat = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch(createChat(newChat));
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      <ChatHeader onNewChat={handleNewChat} />
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            id={chat.id}
            title={chat.title}
            isActive={activeChat === chat.id}
            onClick={() => dispatch(setActiveChat(chat.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;