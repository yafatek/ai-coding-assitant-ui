import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

interface ChatHeaderProps {
  onNewChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewChat }) => {
  return (
    <div className="p-4">
      <button
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
      >
        <MessageSquarePlus size={20} />
        New Chat
      </button>
    </div>
  );
};

export default ChatHeader;