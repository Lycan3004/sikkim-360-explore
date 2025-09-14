import React, { useState, useRef, useEffect } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, { text, sender }]);
    if (sender === 'bot' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
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
      addMessage("Listening...", 'bot');
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
    const apiKey = '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';

    const requestBody = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 150,
      temperature: 0.7,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiText = data.choices && data.choices[0]?.message?.content;
    return aiText || "I'm sorry, I don't have a response for that.";
  };

  return (
    <div className="chatbot-container">
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
  );
};

export default AIChatbot;
