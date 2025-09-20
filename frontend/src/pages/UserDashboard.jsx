import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, MapPin, MessageCircle, Star, Trophy, Award, Bell, Settings } from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('reports');

  const userReports = [
    {
      id: 1,
      title: 'Broken Street Light on Oak Avenue',
      status: 'in_progress',
      category: 'Street Lighting',
      location: 'Oak Avenue, Downtown',
      createdAt: '2 days ago',
      lastUpdate: '1 day ago',
      likes: 12,
      comments: 3,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Pothole on Main Street',
      status: 'resolved',
      category: 'Roads & Transportation',
      location: 'Main Street, Downtown',
      createdAt: '1 week ago',
      lastUpdate: '2 days ago',
      likes: 24,
      comments: 8,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Graffiti on Community Center',
      status: 'pending',
      category: 'Public Safety',
      location: 'Community Center, East Side',
      createdAt: '3 days ago',
      lastUpdate: '3 days ago',
      likes: 8,
      comments: 2,
      priority: 'low'
    }
  ];

  const userBadges = [
    {
      id: 1,
      name: 'Community Hero',
      description: 'Reported 10+ issues',
      icon: Trophy,
      color: 'bg-yellow-500',
      earned: true
    },
    {
      id: 2,
      name: 'Problem Solver',
      description: 'Had 5+ issues resolved',
      icon: CheckCircle,
      color: 'bg-green-500',
      earned: true
    },
    {
      id: 3,
      name: 'Neighborhood Watch',
      description: 'Active for 30+ days',
      icon: Award,
      color: 'bg-blue-500',
      earned: true
    },
    {
      id: 4,
      name: 'Community Leader',
      description: 'Received 100+ likes',
      icon: Star,
      color: 'bg-purple-500',
      earned: false
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'status_update',
      title: 'Street Light Issue Updated',
      message: 'Your report about the broken street light has been assigned to the Public Works team.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment on Your Report',
      message: 'Sarah Johnson commented on your pothole report.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'resolved',
      title: 'Issue Resolved',
      message: 'Your pothole report has been marked as resolved!',
      time: '2 days ago',
      read: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'in_progress': return Clock;
      case 'pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Reports Submitted', value: '15', color: 'text-blue-600' },
    { label: 'Issues Resolved', value: '8', color: 'text-green-600' },
    { label: 'Community Impact', value: '87%', color: 'text-purple-600' },
    { label: 'Reputation Score', value: '4.8', color: 'text-yellow-600' }
  ];

  const tabs = [
    { id: 'reports', label: 'My Reports', icon: AlertCircle },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Track your community contributions and impact</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'notifications' && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      2
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">My Reports</h3>
                <p className="text-sm text-gray-600">Track the status of your submitted reports</p>
              </div>
              <div className="divide-y divide-gray-200">
                {userReports.map(report => {
                  const StatusIcon = getStatusIcon(report.status);
                  return (
                    <div key={report.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                              <StatusIcon className="w-3 h-3 inline mr-1" />
                              {report.status.replace('_', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                              {report.priority} priority
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {report.location}
                            </span>
                            <span>🏷️ {report.category}</span>
                            <span>📅 {report.createdAt}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1" />
                              {report.likes} likes
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {report.comments} comments
                            </span>
                            <span>Last updated: {report.lastUpdate}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Badges</h3>
              <p className="text-gray-600 mb-6">Earn badges by actively participating in your community</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userBadges.map(badge => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      className={`p-6 rounded-lg border-2 text-center ${
                        badge.earned
                          ? 'bg-white border-blue-200 shadow-sm'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4 ${
                        !badge.earned && 'grayscale'
                      }`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                      {badge.earned && (
                        <div className="mt-3">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Earned
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Stay updated on your reports and community activity</p>
              </div>
              <div className="divide-y divide-gray-200">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-6 ${!notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <span className="text-sm text-gray-500">{notification.time}</span>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Mark as read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue="Downtown District"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Email notifications for report updates</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Push notifications for comments</span>
                  </label>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;