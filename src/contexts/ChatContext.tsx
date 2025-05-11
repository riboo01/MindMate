import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotion?: 'happy' | 'sad' | 'anxious' | 'angry' | 'neutral';
}

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load messages from localStorage when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedMessages = localStorage.getItem(`chat_messages_${user.id}`);
      if (savedMessages) {
        try {
          // Convert string timestamps back to Date objects
          const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(parsedMessages);
        } catch (error) {
          console.error('Error parsing saved messages:', error);
        }
      } else {
        // Add welcome message for new chats
        const welcomeMessage: Message = {
          id: 'welcome',
          text: "Hi there! I'm MindMate, your mental health assistant. How are you feeling today?",
          sender: 'bot',
          timestamp: new Date(),
          emotion: 'neutral'
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [isAuthenticated, user]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user && messages.length > 0) {
      localStorage.setItem(`chat_messages_${user.id}`, JSON.stringify(messages));
    }
  }, [messages, isAuthenticated, user]);

  // Mock AI response generator
  const generateResponse = async (userMessage: string): Promise<Message> => {
    // Detect emotion from message (very simplified)
    let emotion: Message['emotion'] = 'neutral';
    
    if (userMessage.toLowerCase().includes('happy') || 
        userMessage.toLowerCase().includes('good') ||
        userMessage.toLowerCase().includes('great')) {
      emotion = 'happy';
    } else if (userMessage.toLowerCase().includes('sad') || 
               userMessage.toLowerCase().includes('depressed') ||
               userMessage.toLowerCase().includes('unhappy')) {
      emotion = 'sad';
    } else if (userMessage.toLowerCase().includes('nervous') || 
               userMessage.toLowerCase().includes('anxious') ||
               userMessage.toLowerCase().includes('worried')) {
      emotion = 'anxious';
    } else if (userMessage.toLowerCase().includes('angry') || 
               userMessage.toLowerCase().includes('frustrated') ||
               userMessage.toLowerCase().includes('mad')) {
      emotion = 'angry';
    }

    // Generate appropriate response based on emotion
    let responseText = '';
    
    switch(emotion) {
      case 'happy':
        responseText = "It's wonderful to hear you're feeling good! What's been bringing you joy lately?";
        break;
      case 'sad':
        responseText = "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way, and these feelings will pass. Would you like to talk about what's bothering you?";
        break;
      case 'anxious':
        responseText = "I understand anxiety can be challenging. Let's try a quick breathing exercise: Take a deep breath in for 4 counts, hold for 2, and exhale for 6. How about we try this together?";
        break;
      case 'angry':
        responseText = "I can see you're feeling frustrated. It's natural to feel this way sometimes. Would it help to talk through what triggered these feelings?";
        break;
      default:
        responseText = "Thank you for sharing. How else have you been feeling lately?";
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      emotion
    };
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate bot response
      const botResponse = await generateResponse(text);
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm sorry, I couldn't process your message. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        emotion: 'neutral'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    if (isAuthenticated && user) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hi there! I'm MindMate, your mental health assistant. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date(),
        emotion: 'neutral'
      };
      setMessages([welcomeMessage]);
      localStorage.removeItem(`chat_messages_${user.id}`);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};