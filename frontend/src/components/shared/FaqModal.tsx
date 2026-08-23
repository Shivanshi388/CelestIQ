import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, HelpCircle, BookOpen, Shield, Activity, Target } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUIDE_DATA = [
  {
    id: 1,
    title: "System Overview",
    content: "The Sentinel Command Unit is an advanced orbital operations dashboard designed for real-time monitoring of satellite telemetry, comprehensive risk assessment, and precise maneuver planning across the constellation.",
    icon: Target
  },
  {
    id: 2,
    title: "Interpreting Risk Alerts",
    content: "Risk alerts are categorized by severity levels (Info, Warning, Critical). They are triggered by various environmental and operational factors, including solar flare activity, proximity to orbital debris, and critical fuel reserve thresholds.",
    icon: Activity
  },
  {
    id: 3,
    title: "Maneuver Execution",
    content: "Depending on your assigned clearance level (Operator vs. Guest), you may submit maneuver plans for automated review. Direct execution of orbital adjustments requires Level 4 Command clearance and secondary authorization.",
    icon: Shield
  },
  {
    id: 4,
    title: "3D Visualization Tools",
    content: "The 3D visualization engine provides a highly accurate, interactive physical model of the entire satellite constellation, displaying current orbital trajectories, spatial relationships, and potential collision vectors in real-time.",
    icon: BookOpen
  },
  {
    id: 5,
    title: "Security & Data Protection",
    content: "All incoming and outgoing orbital telemetry data is encrypted end-to-end using military-grade protocols. Access requires strict multi-factor authentication and continuous clearance verification during active sessions.",
    icon: HelpCircle
  }
];

export const FaqModal = ({ isOpen, onClose }: FaqModalProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl bg-background border border-border rounded-2xl shadow-[0_0_50px_rgba(74,91,220,0.15)] flex flex-col max-h-[85vh] animate-[fadeInScale_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] transform-gpu overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border bg-surface/50 backdrop-blur-md z-10 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground tracking-wide">User Guide</h2>
              <p className="text-xs text-muted font-mono uppercase tracking-widest mt-1">System Knowledge Base</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-muted hover:text-foreground p-2 rounded-xl transition-all duration-200 hover:bg-surface-light hover:scale-105 bg-surface border border-transparent hover:border-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body / Accordion List */}
        <div className="p-6 overflow-y-auto flex-1 z-10 custom-scrollbar space-y-4">
          <div className="mb-6">
            <p className="text-sm text-foreground/80 leading-relaxed">
              Welcome to the Sentinel Command Unit User Guide. Below you will find comprehensive instructions and guidelines regarding system operations, security protocols, and operational procedures.
            </p>
          </div>

          <div className="space-y-3">
            {GUIDE_DATA.map((section) => {
              const isExpanded = expandedId === section.id;
              const Icon = section.icon;
              
              return (
                <div 
                  key={section.id}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(74,91,220,0.1)]' 
                      : 'border-border bg-surface/30 hover:border-border/80 hover:bg-surface/50'
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : section.id)}
                    className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${isExpanded ? 'bg-primary text-white' : 'bg-surface-light text-muted'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`font-semibold text-sm transition-colors duration-300 ${isExpanded ? 'text-primary' : 'text-foreground'}`}>
                        {section.title}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 text-muted ${isExpanded ? 'rotate-180 text-primary' : ''}`} 
                    />
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-4 pt-0 pl-[3.25rem] text-sm text-muted leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface/50 backdrop-blur-md flex justify-between items-center text-xs text-muted z-10 relative">
          <span className="font-mono">VER 2.4.1-STABLE</span>
          <span>Property of CelestIQ Orbital Operations</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
