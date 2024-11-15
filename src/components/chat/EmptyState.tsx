import React from 'react';
import { Bot } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center text-gray-500">
      <div className="text-center">
        <Bot size={48} className="mx-auto mb-4" />
        <p>Select a chat or start a new one to begin</p>
      </div>
    </div>
  );
};

export default EmptyState;