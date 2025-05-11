import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { useChat, Message } from '../contexts/ChatContext';
import { motion } from 'framer-motion';

const Chat: React.FC = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'sad': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'anxious': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'angry': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const renderMessage = (message: Message) => {
    if (message.sender === 'user') {
      return (
        <motion.div 
          key={message.id} 
          className="flex justify-end mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-xs md:max-w-md lg:max-w-lg">
            <p className="text-sm md:text-base">{message.text}</p>
            <p className="text-xs mt-1 opacity-70 text-right">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          key={message.id} 
          className="flex justify-start mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`border ${getEmotionColor(message.emotion)} px-4 py-3 rounded-2xl rounded-tl-none max-w-xs md:max-w-md lg:max-w-lg`}>
            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">{message.text}</p>
            <p className="text-xs mt-1 opacity-70 text-left text-gray-500 dark:text-gray-400">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat with MindMate</h1>
        <button 
          onClick={clearChat}
          className="btn flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          <RefreshCw size={16} />
          <span>New Chat</span>
        </button>
      </div>
      
      <div className="card flex-1 overflow-auto mb-4">
        <div className="p-4">
          {messages.map(renderMessage)}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="form-input pr-12"
          disabled={isTyping}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
          disabled={!input.trim() || isTyping}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;