import React from 'react';

interface ChatListItemProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-lg truncate ${
        isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'
      }`}
    >
      {title}
    </button>
  );
};

export default ChatListItem;