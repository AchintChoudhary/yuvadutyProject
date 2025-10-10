// FILE: frontend/src/pages/CommunityFeedPage.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Filter,
  ArrowUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Badge,
  Menu,
  X,
  Send,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const CommunityFeedPage = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [visibleCommentCount, setVisibleCommentCount] = useState({}); // Track visible comments per post
  const { token, user } = useContext(UserDataContext);
  const commentSectionRefs = useRef({});

  useEffect(() => {
    fetchPosts();
  }, [filter, sortBy]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
        params: {
          status: filter === 'all' ? '' : filter,
          sort: sortBy
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data.posts);
      
      // Initialize visible comment count for each post
      const initialCounts = {};
      response.data.posts.forEach(post => {
        initialCounts[post._id] = Math.min(3, post.comments.length);
      });
      setVisibleCommentCount(initialCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUpvote = async (postId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/upvote`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchPosts();
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const handleAddComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`, {
        content: commentText[postId]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setCommentText(prev => ({ ...prev, [postId]: '' }));
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const loadMoreComments = (postId) => {
    const post = posts.find(p => p._id === postId);
    if (!post) return;

    const currentVisible = visibleCommentCount[postId] || 3;
    const nextVisible = Math.min(currentVisible + 5, post.comments.length);
    
    setVisibleCommentCount(prev => ({
      ...prev,
      [postId]: nextVisible
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-red-100 text-red-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "pending":
        return AlertCircle;
      case "closed":
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Community Feed
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            Stay updated on local issues and community activities
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-700 w-full justify-center"
          >
            {showMobileFilters ? (
              <X className="w-4 h-4 text-gray-300" />
            ) : (
              <Filter className="w-4 h-4 text-gray-300" />
            )}
            <span className="text-sm font-medium text-gray-300">
              Filters & Sort
            </span>
          </button>
        </div>

        {/* Filters */}
        <div
          className={`bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-3 sm:p-4 mb-4 sm:mb-6 ${
            showMobileFilters ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center">
            <div className="w-full sm:w-auto">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <span className="text-sm font-medium text-gray-300 sm:hidden">
                  Filter by Status
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["all", "pending", "in_progress", "resolved"].map(
                  (filterOption) => (
                    <button
                      key={filterOption}
                      onClick={() => setFilter(filterOption)}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                        filter === filterOption
                          ? "bg-orange-500 text-black"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {filterOption.charAt(0).toUpperCase() +
                        filterOption.slice(1).replace("_", " ")}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <label
                htmlFor="sort-select"
                className="text-sm font-medium text-gray-300 sm:hidden block mb-1"
              >
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-1 border border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-700 text-gray-300"
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
          {posts.map((post) => {
            const StatusIcon = getStatusIcon(post.status);
            const isLiked = post.likes.includes(user?._id);
            const isUpvoted = post.upvotes.includes(user?._id);
            const isCommentsExpanded = expandedComments[post._id];
            const visibleCommentsCount = visibleCommentCount[post._id] || 3;
            const displayedComments = post.comments.slice(0, visibleCommentsCount);
            const hasMoreComments = visibleCommentsCount < post.comments.length;

            return (
              <div
                key={post._id}
                className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-semibold text-sm">
                          {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white text-sm sm:text-base truncate">
                            {post.author.firstName} {post.author.lastName}
                          </span>
                          {post.author.verified && (
                            <Badge className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400 flex-wrap">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{post.location}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 self-start sm:self-auto">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          post.status
                        )}`}
                      >
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        <span className="hidden xs:inline">
                          {post.status.replace("_", " ")}
                        </span>
                      </span>
                      <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium hidden sm:inline">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  {/* Media */}
                  {post.images && post.images.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <img
                        src={post.images[0].url}
                        alt="Post media"
                        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Category for mobile */}
                  <div className="sm:hidden mb-3">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <button 
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center space-x-1 sm:space-x-2 transition-colors ${
                          isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs sm:text-sm">{post.likes.length}</span>
                      </button>
                      <button 
                        onClick={() => toggleComments(post._id)}
                        className={`flex items-center space-x-1 sm:space-x-2 transition-colors ${
                          isCommentsExpanded ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">
                          {post.comments.length}
                        </span>
                      </button>
                      <button 
                        onClick={() => handleUpvote(post._id)}
                        className={`flex items-center space-x-1 sm:space-x-2 transition-colors ${
                          isUpvoted ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                        }`}
                      >
                        <ArrowUp className={`w-4 h-4 sm:w-5 sm:h-5 ${isUpvoted ? 'fill-current' : ''}`} />
                        <span className="text-xs sm:text-sm">
                          {post.upvotes.length}
                        </span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-1 sm:space-x-2 text-gray-400 hover:text-orange-500 transition-colors">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm hidden xs:inline">
                        Share
                      </span>
                    </button>
                  </div>

                  {/* Comments Section - Collapsible with Instagram-like scrolling */}
                  {isCommentsExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      {/* Add Comment */}
                      <div className="flex space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-semibold">
                            {user?.firstName?.[0]}
                          </span>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText[post._id] || ''}
                            onChange={(e) => setCommentText(prev => ({
                              ...prev,
                              [post._id]: e.target.value
                            }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(post._id);
                              }
                            }}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <button
                          onClick={() => handleAddComment(post._id)}
                          className="bg-orange-500 text-black px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Comments List with Scrollable Area */}
                      {post.comments.length > 0 ? (
                        <div className="space-y-3">
                          {/* Scrollable comments container */}
                          <div 
                            ref={el => commentSectionRefs.current[post._id] = el}
                            className="max-h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                          >
                            {displayedComments.map((comment) => (
                              <div key={comment._id} className="flex space-x-3">
                                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-semibold">
                                    {comment.user.firstName?.[0]}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="bg-gray-700 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="text-sm font-medium text-white truncate">
                                        {comment.user.firstName} {comment.user.lastName}
                                      </span>
                                      <span className="text-xs text-gray-400 flex-shrink-0">
                                        {formatDate(comment.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-300 break-words">{comment.content}</p>
                                  </div>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-300">
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{comment.likes.length}</span>
                                    </button>
                                    <button className="text-xs text-gray-400 hover:text-gray-300">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Load More Comments Button */}
                          {hasMoreComments && (
                            <div className="flex justify-center pt-2">
                              <button
                                onClick={() => loadMoreComments(post._id)}
                                className="flex items-center space-x-1 text-orange-500 hover:text-orange-400 text-sm font-medium"
                              >
                                <ChevronDown className="w-4 h-4" />
                                <span>Load more comments ({post.comments.length - visibleCommentsCount} remaining)</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {posts.length > 0 && (
          <div className="text-center mt-6 sm:mt-8">
            <button 
              onClick={fetchPosts}
              className="bg-orange-500 text-black px-4 sm:px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
            >
              Load More Posts
            </button>
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No posts found</div>
            <p className="text-gray-500 mt-2">Be the first to report an issue in your community!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeedPage;