import React, { useState, useRef, useEffect } from 'react';
import './chatbotwidget.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
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

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages(prevMessages => [...prevMessages, { text, sender }]);

    // Speak bot messages
    if (sender === 'bot' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceButtonClick = () => {
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

  const handleSendMessage = () => {
    if (inputText.trim()) {
      processMessage(inputText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInputText(text);
    processMessage(text);
  };

  const processMessage = (message: string) => {
    addMessage(message, 'user');
    setInputText('');

    // Simulate AI thinking
    setTimeout(() => {
      generateResponse(message);
    }, 1500);
  };

  const generateResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let response: string;

    // Simple response logic - replace with your AI API call
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      response = "Hello! How can I assist you today?";
    } else if (lowerCaseMessage.includes('how are you')) {
      response = "I'm just a program, but I'm functioning perfectly! Thanks for asking. How can I help you?";
    } else if (lowerCaseMessage.includes('joke')) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "What do you call a fake noodle? An impasta!"
      ];
      response = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (lowerCaseMessage.includes('help')) {
      response = "I can answer questions, tell jokes, or just chat. You can type or use the microphone to talk to me!";
    } else if (lowerCaseMessage.includes('weather')) {
      response = "I don't have access to real-time weather data, but I can tell you that it's a beautiful day in the digital world!";
    } else if (lowerCaseMessage.includes('thank')) {
      response = "You're welcome! Is there anything else I can help you with?";
    } else if (lowerCaseMessage.includes('what can you do')) {
      response = "I can answer questions, have conversations, tell jokes, and more! Try asking me about anything or use the voice feature for hands-free interaction.";
    } else if (lowerCaseMessage.includes('how does this work')) {
      response = "This chatbot uses speech recognition for voice input and text-to-speech for responses. You can either type or click the microphone button to talk to me!";
    } else if (lowerCaseMessage.includes('tsx') || lowerCaseMessage.includes('typescript')) {
      response = "TypeScript with React (TSX) is a great combination for building robust web applications! This chatbot has been adapted to work seamlessly in your TSX project.";
    } else {
      response = "That's interesting! Could you tell me more?";
    }

    addMessage(response, 'bot');
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
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}-message`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />

        {messages.length === 1 && (
          <div className="suggestions">
            <div
              className="suggestion-chip"
              onClick={() => handleSuggestionClick('What can you do?')}>
              What can you do?
            </div>
            <div
              className="suggestion-chip"
              onClick={() => handleSuggestionClick('Tell me a joke')}>
              Tell me a joke
            </div>
            <div
              className="suggestion-chip"
              onClick={() => handleSuggestionClick('How does this work?')}>
              How does this work?
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={
            recognitionRef.current
              ? "Type your message or use voice..."
              : "Type your message..."
          }
        />
        <button id="sendButton" onClick={handleSendMessage}>
          <i className="fas fa-paper-plane"></i>
        </button>
        {!!recognitionRef.current && (
          <button
            id="voiceButton"
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={handleVoiceButtonClick}
          >
            <i className="fas fa-microphone"></i>
          </button>
        )}
      </div>
    </div>

  );
};

export default AIChatbot;