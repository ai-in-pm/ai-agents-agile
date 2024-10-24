import React, { useState } from 'react';
import { MessageSquare, Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  sender: 'human' | 'ai';
  content: string;
  timestamp: Date;
}

const HumanAICollaboration: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'ai', content: "Hello! I'm your AI assistant. How can I help you today?", timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const humanMessage: Message = {
        id: messages.length + 1,
        sender: 'human',
        content: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages([...messages, humanMessage]);
      setNewMessage('');

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 2,
          sender: 'ai',
          content: `I understand your message: "${newMessage.trim()}". How would you like to proceed?`,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Human-AI Collaboration Interface</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4 h-96 overflow-y-auto border rounded p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === 'human' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === 'human'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.sender === 'human' ? (
                    <User size={16} className="mr-2" />
                  ) : (
                    <Bot size={16} className="mr-2" />
                  )}
                  <span className="font-semibold">
                    {message.sender === 'human' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            onClick={sendMessage}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HumanAICollaboration;