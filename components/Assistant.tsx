
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Construction, LayoutList } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import { Message } from '../types';

interface Props {
  onOpenPriceList?: () => void;
}

const Assistant: React.FC<Props> = ({ onOpenPriceList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! 🌸 Soy Flori, tu experta en obra. Confirmo que tenemos stock garantizado hoy. ¿Qué materiales necesitas cotizar? 🛠️' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse([...messages, userMsg]);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-28 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[550px] rounded-3xl shadow-2xl flex flex-col border-4 border-[#8CC63F] overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#002D62] p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-[#8CC63F] p-2.5 rounded-2xl shadow-inner">
                <Construction size={24} className="text-[#002D62]" />
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-tighter">Flori - Electro Flor IA</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#8CC63F] rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-bold text-[#8CC63F] uppercase">Experta en Obra</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition">
              <X size={20} className="text-[#8CC63F]" />
            </button>
          </div>

          {/* Quick Actions inside AI */}
          <div className="px-5 py-2 bg-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
             <button 
              onClick={onOpenPriceList}
              className="whitespace-nowrap bg-white text-[9px] font-black text-[#002D62] px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#8CC63F] transition-all flex items-center gap-1.5 uppercase tracking-tighter"
             >
                <LayoutList size={12} className="text-[#8CC63F]" /> Ver Lista de Precios
             </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 custom-scrollbar bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-[#002D62] text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-[#002D62] rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl text-xs flex gap-1.5 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="¿Qué herramienta buscas?"
                className="flex-grow text-xs font-bold border-2 border-gray-50 rounded-2xl px-5 py-3 focus:outline-none focus:border-[#8CC63F] bg-gray-50 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#002D62] text-[#8CC63F] p-3 rounded-2xl hover:bg-blue-900 transition-all disabled:opacity-50 shadow-lg active:scale-90"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#002D62] text-[#8CC63F] p-5 rounded-3xl shadow-2xl hover:scale-110 hover:-rotate-3 transition-all z-50 group border-4 border-[#8CC63F]"
        >
          <Construction size={32} />
          <span className="absolute -top-14 right-0 bg-[#8CC63F] text-[#002D62] text-[10px] font-black px-4 py-2 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            CONSULTAR STOCK 🛠️
          </span>
        </button>
      )}
    </div>
  );
};

export default Assistant;
