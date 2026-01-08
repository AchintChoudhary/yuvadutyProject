import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, CheckCircle, MessageCircle, Search, Star, Camera, AlertCircle, TrendingUp, Award, Shield } from 'lucide-react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredFixes = [
    {
      id: 1,
      title: 'Pothole on Main Street Fixed',
      description: 'Community reported pothole was repaired within 48 hours',
      location: 'Main Street, Downtown',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'completed',
      likes: 24,
      comments: 8,
      reportedDate: '2 days ago',
      resolvedDate: '1 day ago'
    },
    {
      id: 2,
      title: 'New Street Lights Installed',
      description: 'Community safety improved with new LED street lighting on Park Avenue',
      location: 'Park Avenue, East Side',
      image: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'completed',
      likes: 31,
      comments: 12,
      reportedDate: '1 week ago',
      resolvedDate: '3 days ago'
    },
    {
      id: 3,
      title: 'Community Garden Cleanup',
      description: 'Volunteers organized successful cleanup of abandoned lot, now a beautiful garden',
      location: 'Sunset Boulevard, West Side',
      image: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'completed',
      likes: 45,
      comments: 18,
      reportedDate: '2 weeks ago',
      resolvedDate: '1 week ago'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Community Member',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'CivicConnect helped us get our neighborhood playground fixed in just 3 days. The platform made it so easy to report and track the issue.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Local Business Owner',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'As a business owner, I love how this platform connects us directly with city officials. Our street lighting issue was resolved quickly.',
      rating: 5
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      role: 'City Council Member',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'CivicConnect has revolutionized how we engage with our community. We can now respond to issues more efficiently and transparently.',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Issues Reported', value: '2,847', icon: AlertCircle },
    { label: 'Issues Resolved', value: '2,203', icon: CheckCircle },
    { label: 'Active Members', value: '15,432', icon: Users },
    { label: 'Success Rate', value: '87%', icon: TrendingUp }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real MERN app, this would make an API call to search for issues
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-900">
  {/* Hero Section */}
  <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Building Better Communities
          <span className="block text-orange-500">One Report at a Time</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Connect with your local government and neighbors to report issues, track progress, and create positive change in your community.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city"
              className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border-1 border-gray-500 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/report"
            className="bg-orange-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Camera className="w-5 h-5" />
            <span>Report an Issue</span>
          </Link>
          <Link
            to="/community"
            className="border-2 border-gray-300 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 hover:text-gray-900 transition-colors flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Join Community</span>
          </Link>
        </div>
      </div>
    </div>
  </section>

  {/* Stats Section */}
  <section className="py-16 bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
                <Icon className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* Featured Success Stories */}
  <section className="py-16 bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Recent Success Stories</h2>
        <p className="text-xl text-gray-300">See how communities are making a difference</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredFixes.map((fix) => (
          <div key={fix.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={fix.image} 
              alt={fix.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Resolved
                </span>
                <span className="text-sm text-gray-400">{fix.resolvedDate}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{fix.title}</h3>
              <p className="text-gray-300 mb-3">{fix.description}</p>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {fix.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-sm text-gray-400">
                    <Star className="w-4 h-4 mr-1" />
                    {fix.likes}
                  </span>
                  <span className="flex items-center text-sm text-gray-400">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {fix.comments}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Reported {fix.reportedDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link
          to="/community"
          className="bg-orange-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center space-x-2"
        >
          <span>View All Success Stories</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>

  {/* Testimonials */}
  <section className="py-16 bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">What Our Community Says</h2>
        <p className="text-xl text-gray-300">Real stories from real people making a difference</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-700 rounded-lg p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-200 mb-6 text-lg italic">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-gray-300 text-sm">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* How It Works */}
  <section className="py-16 bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">How yuvaduty Works</h2>
        <p className="text-xl text-gray-300">Making civic engagement simple and effective</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
          <h3 className="text-xl font-semibold text-white mb-2">Report Issue</h3>
          <p className="text-gray-300">Take a photo and describe the problem in your neighborhood</p>
        </div>
        <div className="text-center">
          <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
          <h3 className="text-xl font-semibold text-white mb-2">Community Votes</h3>
          <p className="text-gray-300">Others can upvote and comment to prioritize important issues</p>
        </div>
        <div className="text-center">
          <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
          <h3 className="text-xl font-semibold text-white mb-2">Official Response</h3>
          <p className="text-gray-300">Local authorities and organizations respond and take action</p>
        </div>
        <div className="text-center">
          <div className="bg-orange-500 text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
          <h3 className="text-xl font-semibold text-white mb-2">Problem Solved</h3>
          <p className="text-gray-300">Track progress and celebrate when issues are resolved</p>
        </div>
      </div>
    </div>
  </section>

  {/* Final CTA */}
  <section className="py-16 bg-black text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
      <p className="text-xl text-gray-300 mb-8">
        Join thousands of community members who are already creating positive change
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/report"
          className="bg-orange-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Camera className="w-5 h-5" />
          <span>Report Your First Issue</span>
        </Link>
        <Link
          to="/about"
          className="border-2 border-gray-400 text-gray-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-400 hover:text-black transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  </section>
</div>
  );
};

export default HomePage;