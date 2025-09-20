import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, Clock, AlertCircle, Users, MessageCircle, TrendingUp, FileText, Settings } from 'lucide-react';

const OrganizationDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const incomingReports = [
    {
      id: 1,
      title: 'Broken Street Light on Oak Avenue',
      location: 'Oak Avenue, Downtown',
      category: 'Street Lighting',
      priority: 'high',
      status: 'pending',
      reportedBy: 'Sarah Johnson',
      createdAt: '2 hours ago',
      description: 'The street light has been out for over a week, making it dangerous for pedestrians at night.'
    },
    {
      id: 2,
      title: 'Graffiti on Community Center Wall',
      location: 'Community Center, East Side',
      category: 'Public Safety',
      priority: 'medium',
      status: 'in_progress',
      reportedBy: 'Michael Chen',
      createdAt: '1 day ago',
      description: 'Someone has vandalized the community center wall with graffiti.'
    },
    {
      id: 3,
      title: 'Potholes on Main Street',
      location: 'Main Street, Downtown',
      category: 'Roads & Transportation',
      priority: 'high',
      status: 'pending',
      reportedBy: 'Jennifer Davis',
      createdAt: '3 days ago',
      description: 'Multiple potholes making the road dangerous for vehicles.'
    }
  ];

  const monthlyData = [
    { name: 'Jan', resolved: 65, pending: 28 },
    { name: 'Feb', resolved: 59, pending: 32 },
    { name: 'Mar', resolved: 80, pending: 25 },
    { name: 'Apr', resolved: 81, pending: 30 },
    { name: 'May', resolved: 56, pending: 20 },
    { name: 'Jun', resolved: 92, pending: 18 }
  ];

  const categoryData = [
    { name: 'Roads & Transportation', value: 35, color: '#3B82F6' },
    { name: 'Street Lighting', value: 25, color: '#10B981' },
    { name: 'Public Safety', value: 20, color: '#F59E0B' },
    { name: 'Waste Management', value: 15, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const stats = [
    { label: 'Total Reports', value: '2,847', change: '+12%', icon: FileText, color: 'bg-blue-500' },
    { label: 'Resolved This Month', value: '156', change: '+8%', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Pending Reviews', value: '23', change: '-15%', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Community Satisfaction', value: '94%', change: '+2%', icon: Users, color: 'bg-purple-500' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Dashboard</h1>
          <p className="text-gray-600">Manage community reports and track your organization's impact</p>
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} from last month</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Report Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="resolved" fill="#10B981" />
                    <Bar dataKey="pending" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-sm text-gray-700">{entry.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Incoming Reports</h3>
                <p className="text-sm text-gray-600">Review and respond to community reports</p>
              </div>
              <div className="divide-y divide-gray-200">
                {incomingReports.map(report => (
                  <div key={report.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                            {report.priority} priority
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📍 {report.location}</span>
                          <span>🏷️ {report.category}</span>
                          <span>👤 {report.reportedBy}</span>
                          <span>⏰ {report.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Respond
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-sm text-gray-600">Resolution Rate</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2.3 days</div>
                  <div className="text-sm text-gray-600">Average Response Time</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                  <div className="text-sm text-gray-600">Community Rating</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                  <input
                    type="text"
                    defaultValue="City Public Works Department"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="contact@publicworks.city.gov"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Response Time Goal (hours)</label>
                  <input
                    type="number"
                    defaultValue="24"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationDashboard;