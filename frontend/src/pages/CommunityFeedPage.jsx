import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Filter, ArrowUp, CheckCircle, AlertCircle, Clock, Badge, Menu, X } from 'lucide-react';

const CommunityFeedPage = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const posts = [
    {
      id: 1,
      type: 'issue',
      title: 'Broken Street Light on Oak Avenue',
      description: 'The street light has been out for over a week, making it dangerous for pedestrians at night.',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: false
      },
      location: 'Oak Avenue, Downtown',
      category: 'Street Lighting',
      status: 'pending',
      createdAt: '2 hours ago',
      media: ['https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800'],
      likes: 12,
      comments: 3,
      upvotes: 8
    },
    {
      id: 2,
      type: 'update',
      title: 'Pothole on Main Street - RESOLVED',
      description: 'Thank you everyone for your support! The pothole has been fixed by the city maintenance crew.',
      author: {
        name: 'City Public Works',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: true
      },
      location: 'Main Street, Downtown',
      category: 'Roads & Transportation',
      status: 'resolved',
      createdAt: '4 hours ago',
      media: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800'],
      likes: 34,
      comments: 12,
      upvotes: 24
    },
    {
      id: 3,
      type: 'issue',
      title: 'Graffiti on Community Center Wall',
      description: 'Someone has vandalized the community center wall with graffiti. It needs to be cleaned up.',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: false
      },
      location: 'Community Center, East Side',
      category: 'Public Safety',
      status: 'in_progress',
      createdAt: '1 day ago',
      media: ['https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800'],
      likes: 8,
      comments: 5,
      upvotes: 15
    },
    {
      id: 4,
      type: 'community',
      title: 'Community Garden Cleanup This Saturday',
      description: 'Join us for a community garden cleanup event! We need volunteers to help maintain our shared green space.',
      author: {
        name: 'Green Community Initiative',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
        verified: true
      },
      location: 'Community Garden, West Side',
      category: 'Environmental',
      status: 'active',
      createdAt: '2 days ago',
      media: ['https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800'],
      likes: 45,
      comments: 18,
      upvotes: 32
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'in_progress': return Clock;
      case 'pending': return AlertCircle;
      case 'active': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return post.status === 'resolved';
    if (filter === 'pending') return post.status === 'pending';
    if (filter === 'in_progress') return post.status === 'in_progress';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Community Feed</h1>
          <p className="text-sm sm:text-base text-gray-600">Stay updated on local issues and community activities</p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 w-full justify-center"
          >
            {showMobileFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            <span className="text-sm font-medium">Filters & Sort</span>
          </button>
        </div>

        {/* Filters */}
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6 ${
          showMobileFilters ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center">
            <div className="w-full sm:w-auto">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 sm:hidden">Filter by Status</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'in_progress', 'resolved'].map(filterOption => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      filter === filterOption
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 sm:hidden block mb-1">
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="upvotes">Most Upvoted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4 sm:space-y-6">
          {filteredPosts.map(post => {
            const StatusIcon = getStatusIcon(post.status);
            return (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                    <div className="flex items-start space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{post.author.name}</span>
                          {post.author.verified && (
                            <Badge className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 flex-wrap">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{post.location}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{post.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 self-start sm:self-auto">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        <span className="hidden xs:inline">{post.status.replace('_', ' ')}</span>
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium hidden sm:inline">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base line-clamp-3">{post.description}</p>
                  </div>

                  {/* Media */}
                  {post.media && post.media.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <img
                        src={post.media[0]}
                        alt="Post media"
                        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Category for mobile */}
                  <div className="sm:hidden mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">{post.upvotes}</span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm hidden xs:inline">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-6 sm:mt-8">
          <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedPage;