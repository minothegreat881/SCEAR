"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, User, Phone, Video, Paperclip, Smile, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

const admins = [
  {
    id: 1,
    name: 'Marcus Aurelius',
    role: 'Lead Instructor',
    avatar: 'https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg',
    online: true,
  },
  {
    id: 2,
    name: 'Julia Augusta',
    role: 'Event Coordinator',
    avatar: 'https://images.pexels.com/photos/5599613/pexels-photo-5599613.jpeg',
    online: true,
  },
];

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(admins[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        content: `Ave! I'm ${selectedAdmin.name}, ${selectedAdmin.role} at S.C.E.A.R. How can I assist you today?`,
        sender: 'admin',
        timestamp: new Date(),
        status: 'read',
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, selectedAdmin]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate admin typing and response
    setTimeout(() => {
      const adminMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your message. I'll get back to you shortly.`,
        sender: 'admin',
        timestamp: new Date(),
        status: 'sent',
      };
      setMessages(prev => [...prev, adminMessage]);
    }, 2000);
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-full sm:w-[320px] z-50"
          >
            <Card className="border shadow-lg h-[480px] flex flex-col">
              <CardHeader className="bg-primary text-primary-foreground p-3 flex flex-row items-center gap-3">
                <Image
                  src={selectedAdmin.avatar}
                  alt={selectedAdmin.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-sm">{selectedAdmin.name}</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <span>Online</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-grow overflow-y-auto p-3 space-y-3">
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
                        "max-w-[80%] rounded-lg p-2",
                        message.sender === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'user' && (
                          <span className="text-[10px]">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              <CardFooter className="p-2 border-t">
                <div className="flex items-center gap-1 w-full">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow text-sm h-8"
                  />
                  <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}