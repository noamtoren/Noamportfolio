import { X, Mail, ArrowUpRight, Copy, Check, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

export type ContactMode = 'email' | 'instagram';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ContactMode;
}

export function ContactModal({ isOpen, onClose, mode }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  
  // Data configuration based on mode
  const config = {
    email: {
      icon: <Mail className="w-6 h-6" />,
      title: "Let's start a conversation",
      description: "Whether you have a project in mind or just want to say hello, I'm always open to new connections.",
      value: "noam.toren12@gmail.com",
      actionLabel: "Open Mail App",
      actionUrl: "mailto:noam.toren12@gmail.com",
      copyLabel: "Copy Email"
    },
    instagram: {
      icon: <Instagram className="w-6 h-6" />,
      title: "Follow my design journey",
      description: "Check out my latest sketches, works in progress, and daily design inspiration.",
      value: "toren.design_",
      actionLabel: "Open Instagram",
      actionUrl: "https://www.instagram.com/toren.design_/",
      copyLabel: "Copy Handle"
    }
  };

  const currentConfig = config[mode];

  // Reset copied state when mode changes or modal opens
  useEffect(() => {
    setCopied(false);
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentConfig.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for environments where Clipboard API is blocked or fails
      try {
        const textArea = document.createElement("textarea");
        textArea.value = currentConfig.value;
        
        // Ensure it's not visible but part of the DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
             console.error("Copy failed", err);
        }
      } catch (fallbackErr) {
        console.error("Copy failed", fallbackErr);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/20 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-neutral-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <h3 className="font-display text-lg font-medium text-neutral-900">Get in Touch</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-900">
              {currentConfig.icon}
            </div>
            <h4 className="text-xl font-medium text-neutral-900">{currentConfig.title}</h4>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
              {currentConfig.description}
            </p>
          </div>

          {/* Copy Box */}
          <div className="relative group">
            <div className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-xl group-hover:border-neutral-300 transition-colors">
              <span className="text-neutral-900 font-medium font-mono text-sm sm:text-base truncate pr-4">
                {currentConfig.value}
              </span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-3">
            <a 
              href={currentConfig.actionUrl}
              target={mode === 'instagram' ? '_blank' : undefined}
              rel={mode === 'instagram' ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors shadow-sm active:scale-[0.98] transform duration-100"
            >
              <span>{currentConfig.actionLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
