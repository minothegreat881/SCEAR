"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle as Message, MessageSquare, Send, X, User, Bot as BotIcon, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Simulated bot responses (In a real app, these would come from an API like OpenAI)
const chatbotResponses = {
  greeting: [
    "Ave! Welcome to S.C.E.A.R. How may I assist you today?",
    "Salve! I'm the S.C.E.A.R. assistant. How can I help you with our Roman historical society?",
  ],
  events: [
    "Our next major event is the Summer Roman Festival on June 15-16, 2025 in Hyde Park. We also have weekly training sessions every Saturday at our headquarters. Would you like details on any specific event?",
    "We have several upcoming events! The Annual Reenactment is scheduled for May 20th, and our Educational Workshop Series begins on June 2nd. You can view our full calendar on the Events page.",
  ],
  membership: [
    "Joining S.C.E.A.R. is easy! We offer several membership types starting at £25/year. Benefits include training sessions, equipment loans, and participation in events. Visit our Join Us page to apply, or I can guide you through the membership options.",
    "To become a member, you can apply through our Join Us page. We offer Standard, Student, Family, and Supporter memberships with different benefits. Would you like me to explain each type?",
  ],
  equipment: [
    "Members typically need to acquire or create authentic Roman equipment. For beginners, we offer equipment loans and workshops on creating your own gear. We also provide guidance and resources on historical accuracy.",
    "We recommend starting with basic items like a tunic and caligae (Roman boots). The society can help with loaning equipment to new members and provide guidance on purchasing or crafting authentic items.",
  ],
  training: [
    "We hold regular training sessions every Saturday from 10am to 2pm. These cover formation drills, equipment use, and historical context. No experience is necessary for beginners - we welcome all skill levels!",
    "Our training program covers all aspects of Roman military reenactment, from basic drill to complex formations. Sessions are held weekly, and we also offer specialized workshops throughout the year.",
  ],
  history: [
    "The Roman auxiliary forces (auxilia) were non-citizen troops attached to the Roman legions. They provided specialized skills such as archery, cavalry, and scouting. By the end of their service, many auxiliaries were granted Roman citizenship.",
    "Roman military history spans over 1000 years, from the early Republic to the Byzantine era. Our society focuses primarily on the Imperial period (27 BCE - 476 CE), which featured the professional standing army and the famous legions."
  ],
  fallback: [
    "I don't have specific information on that topic. Perhaps you could email us at info@scear.org or visit our Contact page for more assistance?",
    "I'm not sure about that, but our team would be happy to help. Would you like me to direct you to our Contact page?",
    "That's beyond my current knowledge. Please consider reaching out through our Contact form for more detailed information.",
  ],
};

// Chat message interface
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
      
      setIsTyping(true);
      
      setTimeout(() => {
        setMessages([
          {
            id: Date.now().toString(),
            content: greeting,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Process user input and generate response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple response generation based on keywords
  const generateResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('event') || lowerInput.includes('festival') || lowerInput.includes('when') || lowerInput.includes('calendar') || lowerInput.includes('date')) {
      return chatbotResponses.events[Math.floor(Math.random() * chatbotResponses.events.length)];
    } else if (lowerInput.includes('join') || lowerInput.includes('membership') || lowerInput.includes('member') || lowerInput.includes('sign up') || lowerInput.includes('cost')) {
      return chatbotResponses.membership[Math.floor(Math.random() * chatbotResponses.membership.length)];
    } else if (lowerInput.includes('equipment') || lowerInput.includes('armor') || lowerInput.includes('weapon') || lowerInput.includes('uniform') || lowerInput.includes('costume')) {
      return chatbotResponses.equipment[Math.floor(Math.random() * chatbotResponses.equipment.length)];
    } else if (lowerInput.includes('train') || lowerInput.includes('practice') || lowerInput.includes('skill') || lowerInput.includes('learn') || lowerInput.includes('class')) {
      return chatbotResponses.training[Math.floor(Math.random() * chatbotResponses.training.length)];
    } else if (lowerInput.includes('history') || lowerInput.includes('roman') || lowerInput.includes('legion') || lowerInput.includes('auxiliary') || lowerInput.includes('empire')) {
      return chatbotResponses.history[Math.floor(Math.random() * chatbotResponses.history.length)];
    } else {
      return chatbotResponses.fallback[Math.floor(Math.random() * chatbotResponses.fallback.length)];
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
      
      {/* Chat widget */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-full sm:w-96 z-50 transition-all duration-300 ease-in-out transform",
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <Card className="border shadow-lg overflow-hidden h-[500px] flex flex-col">
          <CardHeader className="bg-primary text-primary-foreground py-4 px-4">
            <div className="flex items-center space-x-2">
              <BotIcon size={24} />
              <div>
                <h3 className="font-semibold">S.C.E.A.R. Assistant</h3>
                <p className="text-xs opacity-80">Ask me about events, membership, training...</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && (
                      <BotIcon size={16} className="mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p>{message.content}</p>
                      <div
                        className={cn(
                          "text-xs mt-1",
                          message.sender === 'user'
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <User size={16} className="mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <BotIcon size={16} />
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.2s]" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.4s]" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.6s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>
          
          <CardFooter className="border-t p-3">
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={inputValue.trim() === '' || isTyping}>
                <Send size={18} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ChatbotWidget;