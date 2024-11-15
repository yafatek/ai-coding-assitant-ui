import React from 'react';
import { Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import type { Message } from '../../types/chat';

interface ChatMessageListProps {
  messages: Message[];
  loading: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, loading }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {loading && (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageList;