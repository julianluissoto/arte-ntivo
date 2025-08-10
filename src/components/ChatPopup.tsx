'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles, User, Loader2, MessageCircle } from 'lucide-react';
import { chat, ChatInput } from '@/ai/flows/chat';
import { useAuth } from '@/hooks/useAuth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ChatPopup() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 1).toUpperCase();
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatResponse = (text: string) => {
    const boldedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return boldedText.replace(/\n/g, '<br />');
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history: { role: string; content: string }[] = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const chatInput: ChatInput = {
        history: history,
        message: input,
      };

      const response = await chat(chatInput);
      const aiMessage: Message = { role: 'model', content: response.message };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling chat flow:', error);
      const errorMessage: Message = { role: 'model', content: 'Lo siento, algo salió mal. Por favor, intenta de nuevo.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-[8%] right-6 z-50 bg-primary text-primary-foreground p-0 w-16 h-16 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[400px] w-[320px] rounded-t-2xl p-0 border-t-4 border-primary">
        <Card className="w-full h-full flex flex-col shadow-2xl rounded-t-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b px-4 py-2">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Sparkles />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-primary text-lg">Asistente de Arte Nativo</CardTitle>
                <p className="text-xs text-muted-foreground">Pregúntame sobre productos o diseños.</p>
              </div>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" aria-label="Cerrar chat">
                ✕
              </Button>
            </SheetClose>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'model' && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Sparkles className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-3 py-2 max-w-[75%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {msg.role === 'model' ? (
                        <p className="text-xs" dangerouslySetInnerHTML={{ __html: formatResponse(msg.content) }} />
                      ) : (
                        <p className="text-xs">{msg.content}</p>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={user?.photoURL ?? ''} />
                        <AvatarFallback>{user ? getInitials(user.displayName) : <User />}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Sparkles className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-3 bg-muted flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-3 px-4">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                placeholder="Escribe tu mensaje..."
                className="flex-1 text-sm"
                autoComplete="off"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading} aria-label="Enviar mensaje">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
