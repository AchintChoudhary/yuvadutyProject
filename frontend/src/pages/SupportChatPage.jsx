import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Phone, Mail, MessageCircle, HelpCircle } from 'lucide-react';

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
  };

  return (
    // <div className="min-h-screen bg-gray-50">
    //   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    //       {/* Chat Section */}
    //       <div className="lg:col-span-2">
    //         <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
    //           {/* Chat Header */}
    //           <div className="px-6 py-4 border-b border-gray-200">
    //             <h2 className="text-xl font-semibold text-gray-900">Live Support Chat</h2>
    //             <p className="text-sm text-gray-600">Get instant help with your CivicConnect questions</p>
    //           </div>

    //           {/* Messages */}
    //           <div className="flex-1 overflow-y-auto p-6 space-y-4">
    //             {messages.map(message => (
    //               <div
    //                 key={message.id}
    //                 className={`flex items-start space-x-3 ${
    //                   message.type === 'user' ? 'justify-end' : 'justify-start'
    //                 }`}
    //               >
    //                 {message.type === 'bot' && (
    //                   <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
    //                     <Bot className="w-4 h-4 text-white" />
    //                   </div>
    //                 )}
    //                 <div
    //                   className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
    //                     message.type === 'user'
    //                       ? 'bg-blue-600 text-white'
    //                       : 'bg-gray-100 text-gray-900'
    //                   }`}
    //                 >
    //                   <p className="text-sm">{message.content}</p>
    //                   <p className={`text-xs mt-1 ${
    //                     message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
    //                   }`}>
    //                     {message.timestamp}
    //                   </p>
    //                 </div>
    //                 {message.type === 'user' && (
    //                   <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
    //                     <User className="w-4 h-4 text-white" />
    //                   </div>
    //                 )}
    //               </div>
    //             ))}
    //             {isTyping && (
    //               <div className="flex items-start space-x-3">
    //                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
    //                   <Bot className="w-4 h-4 text-white" />
    //                 </div>
    //                 <div className="bg-gray-100 px-4 py-2 rounded-lg">
    //                   <div className="flex space-x-1">
    //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
    //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    //                   </div>
    //                 </div>
    //               </div>
    //             )}
    //             <div ref={messagesEndRef} />
    //           </div>

    //           {/* Message Input */}
    //           <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200">
    //             <div className="flex space-x-4">
    //               <input
    //                 type="text"
    //                 value={newMessage}
    //                 onChange={(e) => setNewMessage(e.target.value)}
    //                 placeholder="Type your message..."
    //                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //               />
    //               <button
    //                 type="submit"
    //                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
    //               >
    //                 <Send className="w-4 h-4" />
    //                 <span>Send</span>
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>

    //       {/* Sidebar */}
    //       <div className="space-y-6">
    //         {/* Quick Actions */}
    //         <div className="bg-white rounded-lg shadow-md p-6">
    //           <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    //           <div className="space-y-3">
    //             <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
    //               <Phone className="w-4 h-4" />
    //               <span>Connect with Representative</span>
    //             </button>
    //             <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
    //               <Mail className="w-4 h-4" />
    //               <span>Email Support</span>
    //             </button>
    //             <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
    //               <MessageCircle className="w-4 h-4" />
    //               <span>Community Forum</span>
    //             </button>
    //           </div>
    //         </div>

    //         {/* FAQ */}
    //         <div className="bg-white rounded-lg shadow-md p-6">
    //           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
    //             <HelpCircle className="w-5 h-5 mr-2" />
    //             Frequently Asked Questions
    //           </h3>
    //           <div className="space-y-3">
    //             {faqs.map((faq, index) => (
    //               <button
    //                 key={index}
    //                 onClick={() => handleFAQClick(faq)}
    //                 className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    //               >
    //                 <p className="text-sm font-medium text-gray-900">{faq.question}</p>
    //               </button>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Contact Information */}
    //         <div className="bg-white rounded-lg shadow-md p-6">
    //           <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
    //           <div className="space-y-3 text-sm text-gray-600">
    //             <div className="flex items-center space-x-2">
    //               <Mail className="w-4 h-4" />
    //               <span>support@civicconnect.com</span>
    //             </div>
    //             <div className="flex items-center space-x-2">
    //               <Phone className="w-4 h-4" />
    //               <span>1-800-CIVIC-HELP</span>
    //             </div>
    //             <div className="flex items-center space-x-2">
    //               <MessageCircle className="w-4 h-4" />
    //               <span>Available 24/7</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SupportChatPage;