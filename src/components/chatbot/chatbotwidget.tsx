import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, MessageCircle, X, Loader } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatBotProps {
    isOpen: boolean;
    onToggle: () => void;
}

const SikkimChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Namaste! 🏔 Welcome to Sikkim 360 Explore! I'm your AI travel guide. I can help you discover the beautiful monasteries, trekking routes, local cuisine, and hidden gems of Sikkim. How can I assist you today?",
            isUser: false,
            timestamp: new Date()
        }
    ]);

    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [modelProgress, setModelProgress] = useState(0);
    const [engine, setEngine] = useState<any>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Sikkim-specific knowledge base
    const sikkimKnowledge = {
        places: {
            "gangtok": "Capital city with MG Marg, Enchey Monastery, and ropeway",
            "pelling": "Famous for Pemayangtse Monastery and Kanchenjunga views",
            "lachung": "North Sikkim gem with Yumthang Valley nearby",
            "yuksom": "Historic first capital and trekking base",
            "namchi": "Home to 118ft Padmasambhava statue",
            "ravangla": "Buddha Park with stunning mountain views"
        },
        activities: {
            "trekking": "Goecha La, Singalila Ridge, Green Lake treks",
            "monasteries": "Rumtek, Pemayangtse, Enchey, Tashiding",
            "lakes": "Tsomgo Lake, Gurudongmar Lake, Khecheopalri Lake",
            "adventure": "River rafting, paragliding, mountain biking"
        },
        food: ["Momos", "Thukpa", "Gundruk", "Sel Roti", "Chhurpi", "Sinki"],
        festivals: ["Losar", "Saga Dawa", "Bumchu", "Dashain", "Tihar"]
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize WebLLM
    const initializeWebLLM = useCallback(async () => {
        try {
            setIsModelLoading(true);
            setModelProgress(0);

            // Import WebLLM dynamically
            const { CreateMLCEngine } = await import('@mlc-ai/web-llm');

            const initProgressCallback = (report: any) => {
                setModelProgress(Math.round(report.progress * 100));
            };

            const selectedModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

            const engineInstance = await CreateMLCEngine(selectedModel, {
                initProgressCallback: initProgressCallback,
            });

            setEngine(engineInstance);
            setIsModelLoading(false);
        } catch (error) {
            console.error('Failed to initialize WebLLM:', error);
            setIsModelLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen && !engine && !isModelLoading) {
            initializeWebLLM();
        }
    }, [isOpen, engine, isModelLoading, initializeWebLLM]);

    // Generate AI response using local knowledge + WebLLM
    const generateResponse = async (userMessage: string): Promise<string> => {
        const lowerMessage = userMessage.toLowerCase();

        // Check for Sikkim-specific queries first
        let context = "You are a helpful travel guide for Sikkim, India. ";

        if (lowerMessage.includes('place') || lowerMessage.includes('visit')) {
            const places = Object.entries(sikkimKnowledge.places)
                .map(([place, desc]) => `${place}: ${desc}`)
                .join(', ');
            context += `Popular places in Sikkim include: ${places}. `;
        }

        if (lowerMessage.includes('food') || lowerMessage.includes('eat')) {
            context += `Traditional Sikkim foods: ${sikkimKnowledge.food.join(', ')}. `;
        }

        if (lowerMessage.includes('trek') || lowerMessage.includes('adventure')) {
            context += `Trekking options: ${sikkimKnowledge.activities.trekking}. Adventure activities: ${sikkimKnowledge.activities.adventure}. `;
        }

        try {
            if (engine) {
                const messages = [
                    { role: "system", content: context + "Keep responses helpful, concise, and focused on Sikkim tourism." },
                    { role: "user", content: userMessage }
                ];

                const reply = await engine.chat.completions.create({
                    messages,
                    temperature: 0.7,
                    max_tokens: 200,
                });

                return reply.choices[0]?.message?.content || "I'd be happy to help you explore Sikkim! Could you tell me more about what you're interested in?";
            } else {
                // Fallback responses when model isn't loaded
                return generateFallbackResponse(lowerMessage);
            }
        } catch (error) {
            console.error('Error generating response:', error);
            return generateFallbackResponse(lowerMessage);
        }
    };

    const generateFallbackResponse = (lowerMessage: string): string => {
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Namaste! Welcome to Sikkim! I'm here to help you discover this beautiful Himalayan state. What would you like to know?";
        }
        if (lowerMessage.includes('place') || lowerMessage.includes('visit')) {
            return "Sikkim has amazing places like Gangtok (capital), Pelling (mountain views), Lachung (Yumthang Valley), and Yuksom (trekking base). Which interests you most?";
        }
        if (lowerMessage.includes('food')) {
            return "Sikkim's cuisine includes delicious momos, thukpa (noodle soup), gundruk (fermented vegetables), and traditional sel roti. Would you like restaurant recommendations?";
        }
        if (lowerMessage.includes('trek')) {
            return "Popular treks include Goecha La (close to Kanchenjunga), Singalila Ridge, and Green Lake. What's your trekking experience level?";
        }
        if (lowerMessage.includes('monastery')) {
            return "Famous monasteries: Rumtek (largest), Pemayangtse (historic), Enchey (Gangtok), and Tashiding (sacred). Each has unique architecture and significance!";
        }
        return "I'm here to help you explore Sikkim! Ask me about places to visit, food, trekking, monasteries, or anything else about this beautiful state. 🏔";
    };

    // Text-to-Speech
    const speakText = (text: string) => {
        if (!isAudioEnabled || !window.speechSynthesis) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        // Try to use a more natural voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.lang.includes('en') && (voice.name.includes('Google') || voice.name.includes('Microsoft'))
        );
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    };

    // Speech Recognition
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                await processAudioInput(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Microphone access denied. Please enable microphone permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const processAudioInput = async (audioBlob: Blob) => {
        // Using Web Speech API for demo
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = 'en-US';
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                handleSendMessage(transcript);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
            };

            recognition.start();
        } else {
            alert('Speech recognition not supported in this browser');
        }
    };

    const handleSendMessage = async (messageText?: string) => {
        const text = messageText || inputText.trim();
        if (!text) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await generateResponse(text);

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);

            if (isAudioEnabled) {
                speakText(response);
            }
        } catch (error) {
            console.error('Error generating response:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble responding right now. Please try again!",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={onToggle}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50"
                aria-label="Open chat"
            >
                <MessageCircle size={24} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 className="font-semibold">Sikkim AI Guide</h3>
                </div>
                <button
                    onClick={onToggle}
                    className="hover:bg-white/20 p-1 rounded"
                    aria-label="Close chat"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Model Loading Progress */}
            {isModelLoading && (
                <div className="p-4 bg-blue-50 border-b">
                    <div className="flex items-center gap-2 mb-2">
                        <Loader className="animate-spin" size={16} />
                        <span className="text-sm text-blue-700">Loading AI model...</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${modelProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">{modelProgress}% complete</p>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-lg ${message.isUser
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                <div className="flex items-center gap-2 mb-2">
                    <button
                        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                        className={`p-2 rounded ${isAudioEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
                        aria-label="Toggle audio"
                    >
                        {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`p-2 rounded ${isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                        aria-label="Voice input"
                    >
                        {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                </div>

                <div className="flex gap-2">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about Sikkim..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                    />
                    <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputText.trim() || isLoading}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main App Component that includes the chatbot
const App: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Your existing Sikkim tourism website content goes here */}
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Sikkim 360 Explore 🏔
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Discover the beauty of Sikkim with our AI-powered travel guide!
                </p>

                {/* Installation Instructions */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Getting Started</h2>
                    <p className="text-gray-600 mb-4">
                        Click the chat button to start exploring Sikkim with our AI assistant!
                        The chatbot will download a local AI model (about 1-2GB) for completely offline operation.
                    </p>
                    <div className="bg-gray-100 p-4 rounded">
                        <h3 className="font-semibold mb-2">Features:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            <li>🤖 Local AI model (no API keys needed)</li>
                            <li>🎤 Voice input and audio responses</li>
                            <li>🏔 Sikkim-specific travel knowledge</li>
                            <li>🔒 Completely private and offline</li>
                            <li>📱 Mobile-friendly interface</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Chatbot */}
            <SikkimChatBot
                isOpen={isChatOpen}
                onToggle={() => setIsChatOpen(!isChatOpen)}
            />
        </div>
    );
};

export default SikkimChatBot;
