import React, { useState } from 'react';
import { User, Mail, MapPin, Bell, Settings, LogOut, Edit3, CheckCircle, Clock, AlertCircle, Trash2, Menu, X } from 'lucide-react';

const ProfilePage = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345'
  });

  const reportedProblems = [
    {
      id: 1,
      title: 'Broken Streetlight',
      category: 'Lighting',
      status: 'resolved',
      date: '2024-01-15',
      location: 'Main St & 5th Ave',
      description: 'Streetlight has been flickering for weeks'
    },
    {
      id: 2,
      title: 'Pothole on Highway',
      category: 'Road',
      status: 'in-progress',
      date: '2024-01-20',
      location: 'Highway 101, Mile 15',
      description: 'Large pothole causing traffic issues'
    },
    {
      id: 3,
      title: 'Overflowing Trash Bin',
      category: 'Waste',
      status: 'open',
      date: '2024-01-22',
      location: 'Central Park Entrance',
      description: 'Trash bin overflowing, attracting pests'
    }
  ];

  const savedLocations = [
    { id: 1, name: 'Home', address: '123 Main St, City, State 12345', type: 'home' },
    { id: 2, name: 'Work', address: '456 Business Ave, City, State 12345', type: 'work' },
    { id: 3, name: 'Mom\'s House', address: '789 Family Rd, City, State 12345', type: 'custom' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'open': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'open': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'reports', label: 'My Reports', icon: Edit3 },

  ];

  return (
<div className="min-h-screen bg-gray-900">
  <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
    {/* Profile Header */}
    <div className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 sm:w-10 sm:h-10 text-black" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{userInfo.name}</h1>
            <p className="text-sm sm:text-base text-gray-400">{userInfo.email}</p>
            <p className="text-xs sm:text-sm text-gray-500">Member since January 2024</p>
          </div>
        </div>
        <div className="mt-3 sm:mt-0 flex space-x-2 sm:space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
          >
            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu Button */}
    <div className="lg:hidden mb-4">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-xl shadow-sm"
      >
        <span className="font-medium text-white">
          {tabs.find(tab => tab.id === activeTab)?.label}
        </span>
        {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
      </button>
    </div>

    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
      {/* Sidebar Navigation - Desktop */}
      <div className="hidden lg:block lg:w-64 flex-shrink-0">
        <div className="bg-gray-800 rounded-2xl shadow-sm">
          <nav className="p-2">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-black border border-orange-400'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 rounded-xl shadow-sm mb-4">
          <nav className="p-2">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-black border border-orange-400'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm">
          {/* Navigation Tabs - Tablet */}
          <div className="hidden sm:block lg:hidden border-b border-gray-700">
            <nav className="flex overflow-x-auto px-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  <div className="bg-gray-700 rounded-lg sm:rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Total Reports</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-500">{reportedProblems.length}</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg sm:rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Resolved</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-green-400">
                      {reportedProblems.filter(p => p.status === 'resolved').length}
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg sm:rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">In Progress</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                      {reportedProblems.filter(p => p.status === 'in-progress').length}
                    </p>
                  </div>
                </div>

                {/* User Information */}
                <div className="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="font-semibold text-white mb-3 sm:mb-4 text-lg sm:text-xl">Personal Information</h3>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                          <input
                            type="text"
                            value={userInfo.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                          <input
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={userInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                          <input
                            type="text"
                            value={userInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base bg-gray-800 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <div className="flex items-center space-x-3 py-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base">{userInfo.name}</span>
                      </div>
                      <div className="flex items-center space-x-3 py-2">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base">{userInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-3 py-2">
                        <span className="text-white text-sm sm:text-base">{userInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3 py-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-white text-sm sm:text-base">{userInfo.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="font-semibold text-white text-lg sm:text-xl">My Reports</h3>
                  <button
                    onClick={() => navigateTo('report')}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>New Report</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {reportedProblems.map(problem => (
                    <div key={problem.id} className="border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-700 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-2 mb-2">
                            <h4 className="font-medium text-white text-sm sm:text-base">{problem.title}</h4>
                            <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(problem.status)} w-fit`}>
                              {getStatusIcon(problem.status)}
                              <span className="capitalize">{problem.status.replace('-', ' ')}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2 line-clamp-2">{problem.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
                            <span>{problem.category}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="truncate">{problem.location}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{problem.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end sm:justify-start space-x-2">
                          <button
                            onClick={() => navigateTo('detail', problem)}
                            className="text-orange-500 hover:text-orange-400 text-sm font-medium px-2 py-1"
                          >
                            View Details
                          </button>
                          <button className="text-red-500 hover:text-red-400 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Locations Tab */}
            {activeTab === 'locations' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="font-semibold text-white text-lg sm:text-xl">Saved Locations</h3>
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base w-full sm:w-auto">
                    <MapPin className="w-4 h-4" />
                    <span>Add Location</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {savedLocations.map(location => (
                    <div key={location.id} className="border border-gray-700 rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-white text-sm sm:text-base truncate">{location.name}</h4>
                            <p className="text-sm text-gray-400 truncate">{location.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end sm:justify-start space-x-2">
                          <button className="text-orange-500 hover:text-orange-400 text-sm font-medium px-2 py-1">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-400 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="font-semibold text-white mb-3 sm:mb-4 text-lg sm:text-xl">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-white text-sm sm:text-base">Email Notifications</h4>
                        <p className="text-xs sm:text-sm text-gray-400">Receive updates about your reports via email</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded bg-gray-800 border-gray-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-white text-sm sm:text-base">Push Notifications</h4>
                        <p className="text-xs sm:text-sm text-gray-400">Get instant notifications on your device</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded bg-gray-800 border-gray-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-white text-sm sm:text-base">SMS Notifications</h4>
                        <p className="text-xs sm:text-sm text-gray-400">Receive text messages for urgent updates</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded bg-gray-800 border-gray-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="font-semibold text-white mb-3 sm:mb-4 text-lg sm:text-xl">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-white text-sm sm:text-base">Public Profile</h4>
                        <p className="text-xs sm:text-sm text-gray-400">Allow others to see your profile and reports</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded bg-gray-800 border-gray-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium text-white text-sm sm:text-base">Location Sharing</h4>
                        <p className="text-xs sm:text-sm text-gray-400">Share your location for better problem reporting</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded bg-gray-800 border-gray-600" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="bg-red-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <h3 className="font-semibold text-red-400 mb-3 sm:mb-4 text-lg sm:text-xl">Danger Zone</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors text-sm sm:text-base">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ProfilePage;