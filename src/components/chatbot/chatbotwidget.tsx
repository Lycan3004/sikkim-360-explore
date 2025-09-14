import React, { useState, useRef, useEffect, useCallback } from 'react';
import './chatbotwidget.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm your assistant. How can I help?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = (window.SpeechRecognition || window.webkitSpeechRecognition) as typeof window.SpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        processMessage(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        addMessage("Sorry, I didn't catch that. Could you please repeat?", 'bot');
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Optional: close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, { text, sender }]);
    if (sender === 'bot' && 'speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceClick = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      // Only add "Listening..." if not already last message
      if (
        messages.length === 0 ||
        messages[messages.length - 1].text !== "Listening..." ||
        messages[messages.length - 1].sender !== "bot"
      ) {
        addMessage("Listening...", 'bot');
      }
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      processMessage(inputText.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const processMessage = async (message: string) => {
    addMessage(message, 'user');
    setInputText('');
    setIsTyping(true);

    try {
      const aiResponse = await generateResponseFromAPI(message);
      setIsTyping(false);
      addMessage(aiResponse, 'bot');
    } catch (error) {
      setIsTyping(false);
      addMessage("Sorry, I couldn't process that request right now.", 'bot');
      console.error(error);
    }
  };

  const generateResponseFromAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "Sorry, I don't have a response.";
    } catch (error) {
      console.error('Error fetching from backend:', error);
      return "Sorry, something went wrong.";
    }
  };


  return (
    <>
      {/* Overlay */}
      <div
        className={`chatbot-overlay${open ? " active" : ""}`}
        onClick={() => setOpen(false)}
        style={{ display: open ? "block" : "none" }}
      />
      {/* Popup Button */}
      {!open && (
        <button
          className="chatbot-popup-btn"
          aria-label="Open chatbot"
          onClick={() => setOpen(true)}
        >
          <i className="fas fa-comments"></i>
        </button>
      )}
      {/* Chatbot Container */}
      <div className={`chatbot-container${open ? " active" : ""}`} style={{ display: open ? "flex" : "none" }}>
        {/* Close Button */}
        <button
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "#333", // Use dark color for visibility on light header
            fontSize: 22,
            cursor: "pointer",
            zIndex: 2,
          }}
          aria-label="Close chatbot"
          onClick={() => setOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="chat-header">
          <h2>AI Assistant</h2>
          <div className="chat-status">
            <span className="status-indicator"></span>
            <span>Online - Ready to help</span>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.sender}-message`}>
              {m.text}
            </div>
          ))}
          {isTyping && <div className="message bot-message" style={{ fontStyle: 'italic', opacity: 0.7 }}>AI is typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={recognitionRef.current ? "Type or speak..." : "Type a message"}
            aria-label="Chat input"
          />
          <button
            id="sendButton"
            onClick={handleSend}
            aria-label="Send message"
            type="button"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
          {!!recognitionRef.current && (
            <button
              id="voiceButton"
              className={`voice-btn ${isListening ? 'listening' : ''}`}
              onClick={handleVoiceClick}
              aria-label="Toggle voice input"
              type="button"
            >
              <i className="fas fa-microphone"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
