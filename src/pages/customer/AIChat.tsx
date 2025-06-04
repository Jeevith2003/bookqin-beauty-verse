
import React, { useState, useRef, useEffect } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles, Send, Bot, User, Camera } from 'lucide-react';
import VoiceRecognition from '@/components/ai/VoiceRecognition';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Bookqin AI assistant. I can help you find the perfect salon, recommend services, answer beauty questions, or assist with your bookings. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'booking': "I can help you with booking! You can search for salons near you, check their services, and book appointments directly through the app. Would you like me to guide you to the search page?",
    'services': "We offer a wide range of beauty services including haircuts, styling, coloring, manicures, pedicures, facials, eyebrow threading, and much more. What specific service are you looking for?",
    'payment': "You can pay through your Bookqin wallet, credit/debit cards, or cash at the salon. We also offer special discounts and cashback through our rewards program!",
    'cancel': "You can cancel your booking from the 'My Bookings' section. Cancellations made 24 hours before the appointment are free. Need help finding your bookings?",
    'offers': "Check out our Offers & Rewards section for the latest deals! We have referral bonuses, first-time user discounts, and seasonal promotions.",
    'location': "We have partner salons across the city. Use our search feature to find salons near your location with ratings and reviews from other customers.",
    'ai style': "Our AI Style Matcher can recommend hairstyles and looks based on your face shape and preferences! Want me to guide you to the AI Style Recommendation page?",
    'wallet': "Your Bookqin wallet lets you add money, get cashback, and pay for services easily. You can also earn rewards points that convert to wallet credits!"
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you with all your beauty and salon needs. What would you like to know about?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with today?";
    }
    
    return "I'd be happy to help you with that! For specific questions about salons, services, bookings, payments, or beauty tips, feel free to ask. You can also explore our app features like AI Style Recommendations, nearby salon search, and exclusive offers!";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Find salons near me",
    "Book a haircut",
    "Check my bookings",
    "Payment methods",
    "AI style recommendations",
    "Current offers"
  ];

  return (
    <CustomerLayout>
      <div className="flex flex-col h-screen pb-20">
        {/* Header */}
        <div className="premium-gradient p-6 rounded-b-3xl text-white mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Beauty Assistant</h1>
              <p className="text-white/90 text-sm">Your personal beauty companion</p>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="px-4 mb-4">
          <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs rounded-full"
                onClick={() => setInputText(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 px-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className={message.sender === 'user' ? 'bg-bookqin-secondary text-white' : 'bg-bookqin-light'}>
                  {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-bookqin-secondary text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-bookqin-light">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Camera className="w-5 h-5" />
            </Button>
            <VoiceRecognition
              onTranscript={(text) => setInputText(text)}
              isListening={isListening}
              onListeningChange={setIsListening}
            />
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about beauty and salons..."
              className="flex-1 rounded-full border-gray-200"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-bookqin-secondary hover:bg-bookqin-secondary/90 rounded-full"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default AIChat;
