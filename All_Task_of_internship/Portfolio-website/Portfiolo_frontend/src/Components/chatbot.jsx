import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm your digital assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatboxRef = useRef(null);

  // Quick action buttons
  const quickActions = [
    { id: 1, text: '📁 View Projects', action: 'projects' },
    { id: 2, text: '💼 Our Services', action: 'services' },
    { id: 3, text: '📞 Contact Us', action: 'contact' },
    { id: 4, text: '💡 Get a Quote', action: 'quote' }
  ];

  // Bot responses based on keywords
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return "I'd love to show you our amazing projects! 🎨 We've completed 150+ projects across web development, mobile apps, and digital marketing. Check out our portfolio section to see our best work!";
    } else if (message.includes('service') || message.includes('offer') || message.includes('do')) {
      return "We offer a wide range of services including:\n\n• 🌐 Web Development\n• 📱 Mobile App Development\n• 🎨 UI/UX Design\n• 🚀 Digital Marketing\n• ☁️ Cloud Solutions\n• 🤖 AI Integration\n\nWhich one interests you?";
    } else if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('phone')) {
      return "You can reach us at:\n\n📧 Email: codecelix@gmail.com\n📞 Phone: +924567890\n📍 Location: Nastp Rawalpindi, Pakistan\n\nOr simply fill out our contact form and we'll get back to you within 24 hours!";
    } else if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
      return "Great question! 💰 Our pricing varies based on project scope and requirements. We offer:\n\n• Competitive hourly rates\n• Fixed-price projects\n• Monthly retainers\n\nWould you like to schedule a free consultation to discuss your project?";
    } else if (message.includes('team') || message.includes('who')) {
      return "We're a passionate team of developers, designers, and digital strategists! 👥 Our team has 10+ years of combined experience and we're dedicated to bringing your ideas to life. Want to know more about specific team members?";
    } else if (message.includes('technology') || message.includes('tech') || message.includes('stack')) {
      return "We work with cutting-edge technologies! 💻\n\nFrontend: React, Vue.js, Next.js\nBackend: Node.js, Python, Django\nMobile: React Native, Flutter\nDatabase: MongoDB, PostgreSQL, Redis\nCloud: AWS, Azure, Google Cloud\n\nAny specific tech you're interested in?";
    } else if (message.includes('time') || message.includes('how long') || message.includes('duration')) {
      return "Project timelines vary based on complexity:\n\n⚡ Simple websites: 2-4 weeks\n🌟 Medium projects: 1-3 months\n🚀 Complex systems: 3-6 months\n\nWe always provide a detailed timeline during project planning!";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 Great to meet you! I'm here to help you learn more about our services and how we can help with your project. What would you like to know?";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! 😊 Is there anything else I can help you with today?";
    } else {
      return "That's a great question! 🤔 While I can help with general inquiries, our team would love to give you a personalized answer. Would you like to:\n\n1. Explore our projects\n2. Learn about our services\n3. Contact our team directly\n\nJust let me know!";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatboxRef.current) {
      gsap.fromTo(
        chatboxRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      projects: "Show me your projects",
      services: "What services do you offer?",
      contact: "How can I contact you?",
      quote: "I'd like to get a quote"
    };
    handleSendMessage(actionMessages[action]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-2xl shadow-amber-500/50 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
        aria-label="Open Chat"
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </>
        )}
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className="fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-zinc-900 rounded-2xl shadow-2xl border-2 border-amber-500/30 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-amber-500"></div>
              </div>
              <div>
                <h3 className="font-bold text-black">AI Assistant</h3>
                <p className="text-xs text-black/70">Online - Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-amber-500 text-black rounded-br-none'
                      : 'bg-zinc-800 text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-black/60' : 'text-zinc-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 bg-zinc-900 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.action)}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-lg transition-colors text-left border border-zinc-700 hover:border-amber-500"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-zinc-900 border-t border-zinc-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-zinc-600 mt-2 text-center">
              Powered by AI • <span className="text-amber-500">24/7 Available</span>
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;