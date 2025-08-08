// src/components/ChatPopup.tsx
'use client';

import { useState } from 'react';
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

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 1).toUpperCase();
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history: { role: string, content: string }[] = messages.map(msg => ({
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
      const errorMessage: Message = { role: 'model', content: "Lo siento, algo salió mal. Por favor, intenta de nuevo." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-28 right-8 z-50 bg-primary text-primary-foreground p-5 h-auto rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-10 w-10" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] w-full max-w-2xl mx-auto rounded-t-2xl p-0 border-t-4 border-primary">
        <Card className="w-full h-full flex flex-col shadow-2xl rounded-t-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Sparkles />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-primary">Asistente de Arte Nativo</CardTitle>
                <p className="text-sm text-muted-foreground">Pregúntame sobre productos o diseños.</p>
              </div>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Cerrar</span>
              </Button>
            </SheetClose>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-6">
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'model' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Sparkles className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-4 py-3 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <Avatar className="h-8 w-8">
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
          <CardFooter className="border-t pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                placeholder="Escribe tu mensaje..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
