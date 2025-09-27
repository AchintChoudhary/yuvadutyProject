import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Phone, Mail, MessageCircle, HelpCircle, Menu, X, ChevronDown } from 'lucide-react';

const SupportChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your CivicConnect support assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: 2,
      type: 'bot',
      content: 'You can ask me about reporting issues, tracking your reports, or connecting with local representatives.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const faqs = [
    {
      question: 'How do I report a new issue?',
      answer: 'Click on the "Report Issue" button in the navigation menu, fill out the form with details about the problem, and submit. You can also upload photos to help illustrate the issue.'
    },
    {
      question: 'How can I track my reported issues?',
      answer: 'Go to your Dashboard to see all your submitted reports and their current status. You\'ll receive notifications when there are updates.'
    },
    {
      question: 'How do I contact local representatives?',
      answer: 'Use the "Connect with Representative" button below to get contact information for your local officials based on your location.'
    },
    {
      question: 'Can I report issues anonymously?',
      answer: 'Yes, you can choose to make your report private when submitting. This will only be visible to relevant authorities.'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: getBotResponse(newMessage),
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('report') || lowerMessage.includes('issue')) {
      return 'To report an issue, click the "Report Issue" button in the navigation menu. You can upload photos, select categories, and track the progress of your report.';
    } else if (lowerMessage.includes('track') || lowerMessage.includes('status')) {
      return 'You can track all your reports in your Dashboard. Each report has a unique ID and status updates that you can monitor.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('representative')) {
      return 'I can help you connect with local representatives. Click the "Connect with Representative" button below to get contact information for your area.';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I\'m here to help! You can ask me about reporting issues, tracking reports, contacting representatives, or any other questions about CivicConnect.';
    } else {
      return 'I\'m here to help with CivicConnect questions. You can ask me about reporting issues, tracking your reports, or connecting with local representatives. Is there something specific you\'d like to know?';
    }
  };

  const handleFAQClick = (faq) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: faq.question,
      timestamp: new Date().toLocaleTimeString()
    };
    
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: faq.answer,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage, botMessage]);
    setShowSidebar(false); // Close sidebar on mobile after clicking FAQ
  };

  return (
   <div className="min-h-screen bg-gray-900">
  <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
    {/* Mobile Sidebar Toggle */}
    <div className="lg:hidden mb-4 flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl font-bold text-white">Support Center</h1>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="flex items-center space-x-2 bg-orange-500 text-black px-4 py-2 rounded-lg"
      >
        {showSidebar ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span className="text-sm">Quick Actions</span>
        <ChevronDown className={`w-4 h-4 transform transition-transform ${showSidebar ? 'rotate-180' : ''}`} />
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {/* Chat Section */}
      <div className="lg:col-span-2">
        <div className="bg-gray-800 rounded-lg shadow-md h-[500px] sm:h-[550px] md:h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Live Support Chat</h2>
            <p className="text-xs sm:text-sm text-gray-400">Get instant help with your CivicConnect questions</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 sm:space-x-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] xs:max-w-xs sm:max-w-md px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-orange-500 text-black'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                </div>
                <div className="bg-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 md:p-6 border-t border-gray-700">
            <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base bg-gray-700 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-3 sm:px-4 md:px-6 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`lg:space-y-6 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Actions</h3>
          <div className="space-y-2 sm:space-y-3">
            <button className="w-full bg-orange-500 text-black px-3 sm:px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 text-sm sm:text-base">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">Connect with Representative</span>
            </button>
            <button className="w-full bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm sm:text-base">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">Email Support</span>
            </button>
            <button className="w-full bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 text-sm sm:text-base">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">Community Forum</span>
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleFAQClick(faq)}
                className="w-full text-left p-2 sm:p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <p className="text-xs sm:text-sm font-medium text-white leading-tight">{faq.question}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contact Information</h3>
          <div className="space-y-2 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">support@civicconnect.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>1-800-CIVIC-HELP</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default SupportChatPage;