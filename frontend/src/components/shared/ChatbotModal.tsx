import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Bot, User } from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

const FAQ_QUESTIONS = [
  {
    q: "What is the Sentinel Command Unit?",
    a: "The Sentinel Command Unit is an advanced orbital operations dashboard designed for real-time monitoring of satellite telemetry, comprehensive risk assessment, and precise maneuver planning across the constellation."
  },
  {
    q: "How do I interpret the Risk Alerts?",
    a: "Risk alerts are categorized by severity levels (Info, Warning, Critical). They are triggered by various environmental and operational factors, including solar flare activity, proximity to orbital debris, and critical fuel reserve thresholds."
  },
  {
    q: "Can I execute maneuvers directly from the dashboard?",
    a: "Depending on your assigned clearance level (Operator vs. Guest), you may submit maneuver plans for automated review. Direct execution of orbital adjustments requires Level 4 Command clearance and secondary authorization."
  },
  {
    q: "What information does the 3D Visualization provide?",
    a: "The 3D visualization engine provides a highly accurate, interactive physical model of the entire satellite constellation, displaying current orbital trajectories, spatial relationships, and potential collision vectors in real-time."
  },
  {
    q: "How is the telemetry data secured?",
    a: "All incoming and outgoing orbital telemetry data is encrypted end-to-end using military-grade protocols. Access requires strict multi-factor authentication and continuous clearance verification during active sessions."
  }
];

export const ChatbotModal = ({ isOpen, onClose }: ChatbotModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: "Hello! I am your Intelligent FAQ Assistant. How can I help you today? Please select a question below." }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Reset messages when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessages([{ id: 1, type: 'bot', text: "Hello! I am your Intelligent FAQ Assistant. How can I help you today? Please select a question below." }]);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQuestionClick = (q: string, a: string) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: q }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: a }]);
    }, 500);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-background border border-border rounded-2xl shadow-[0_0_50px_rgba(74,91,220,0.15)] flex flex-col h-[75vh] max-h-[750px] animate-[fadeInScale_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] transform-gpu overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border bg-surface/50 backdrop-blur-md z-10 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 text-primary">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-wide">Intelligent Assistant</h2>
              <p className="text-xs text-muted font-mono uppercase tracking-widest mt-0.5">FAQ Bot</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-muted hover:text-foreground p-2 rounded-xl transition-all duration-200 hover:bg-surface-light hover:scale-105 bg-surface border border-transparent hover:border-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
              {msg.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-[0_0_10px_rgba(74,91,220,0.2)]">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${msg.type === 'user' ? 'bg-primary text-white rounded-tr-sm shadow-[0_0_15px_rgba(74,91,220,0.3)]' : 'bg-surface border border-border text-foreground rounded-tl-sm'}`}>
                {msg.text}
              </div>
              {msg.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center text-foreground shrink-0 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* FAQ Options (Input Area Replacement) */}
        <div className="p-4 border-t border-border bg-surface/30 z-10 relative">
          <p className="text-xs text-muted font-mono uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Suggested Questions
          </p>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[160px] custom-scrollbar pr-2">
            {FAQ_QUESTIONS.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(faq.q, faq.a)}
                className="text-left text-xs bg-surface border border-border hover:border-primary/50 hover:bg-primary/10 text-foreground px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_10px_rgba(74,91,220,0.15)] group"
              >
                <span className="group-hover:text-primary transition-colors">{faq.q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
