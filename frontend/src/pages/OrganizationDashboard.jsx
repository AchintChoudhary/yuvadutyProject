import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Settings,
} from "lucide-react";

const OrganizationDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const incomingReports = [
    {
      id: 1,
      title: "Broken Street Light on Oak Avenue",
      location: "Oak Avenue, Downtown",
      category: "Street Lighting",
      priority: "high",
      status: "pending",
      reportedBy: "Sarah Johnson",
      createdAt: "2 hours ago",
      description:
        "The street light has been out for over a week, making it dangerous for pedestrians at night.",
    },
    {
      id: 2,
      title: "Graffiti on Community Center Wall",
      location: "Community Center, East Side",
      category: "Public Safety",
      priority: "medium",
      status: "in_progress",
      reportedBy: "Michael Chen",
      createdAt: "1 day ago",
      description:
        "Someone has vandalized the community center wall with graffiti.",
    },
    {
      id: 3,
      title: "Potholes on Main Street",
      location: "Main Street, Downtown",
      category: "Roads & Transportation",
      priority: "high",
      status: "pending",
      reportedBy: "Jennifer Davis",
      createdAt: "3 days ago",
      description: "Multiple potholes making the road dangerous for vehicles.",
    },
  ];

  const monthlyData = [
    { name: "Jan", resolved: 65, pending: 28 },
    { name: "Feb", resolved: 59, pending: 32 },
    { name: "Mar", resolved: 80, pending: 25 },
    { name: "Apr", resolved: 81, pending: 30 },
    { name: "May", resolved: 56, pending: 20 },
    { name: "Jun", resolved: 92, pending: 18 },
  ];

  const categoryData = [
    { name: "Roads & Transportation", value: 35, color: "#3B82F6" },
    { name: "Street Lighting", value: 25, color: "#10B981" },
    { name: "Public Safety", value: 20, color: "#F59E0B" },
    { name: "Waste Management", value: 15, color: "#EF4444" },
    { name: "Other", value: 5, color: "#6B7280" },
  ];

  const stats = [
    {
      label: "Total Reports",
      value: "2,847",
      change: "+12%",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Resolved This Month",
      value: "156",
      change: "+8%",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Pending Reviews",
      value: "23",
      change: "-15%",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "Community Satisfaction",
      value: "94%",
      change: "+2%",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
   <div className="min-h-screen bg-gray-900">
  {/* Header */}
  <div className="bg-gray-800 shadow-sm sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Organization Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Manage reports & track your organization’s impact
        </p>
      </div>
      {/* Tabs */}
      <div className="flex space-x-2 sm:space-x-4 mt-4 sm:mt-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-orange-500 text-black"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <Icon className="w-4 h-4 mr-1" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 py-6">
    {/* Overview */}
    {activeTab === "overview" && (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition"
              >
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-gray-800 rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-white mb-3">
              Monthly Report Trends
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  />
                  <Bar dataKey="resolved" fill="#10B981" />
                  <Bar dataKey="pending" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-800 rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-white mb-3">
              Reports by Category
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-gray-300">{entry.name} - {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Reports */}
    {activeTab === "reports" && (
      <div className="bg-gray-800 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          Incoming Reports
        </h3>
        <div className="divide-y divide-gray-700">
          {incomingReports.map((report) => (
            <div
              key={report.id}
              className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
            >
              <div className="flex-1">
                <h4 className="font-medium text-white">
                  {report.title}
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  {report.description}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span>📍 {report.location}</span>
                  <span>🏷️ {report.category}</span>
                  <span>👤 {report.reportedBy}</span>
                  <span>⏰ {report.createdAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-orange-500 text-black px-3 py-2 rounded-lg text-sm hover:bg-orange-600">
                  Respond
                </button>
                <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700">
                  Mark Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Analytics */}
    {activeTab === "analytics" && (
      <div className="bg-gray-800 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          Detailed Analytics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-400">87%</div>
            <div className="text-sm text-gray-400">Resolution Rate</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-400">2.3 days</div>
            <div className="text-sm text-gray-400">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">4.8/5</div>
            <div className="text-sm text-gray-400">Community Rating</div>
          </div>
        </div>
      </div>
    )}

    {/* Settings */}
    {activeTab === "settings" && (
      <div className="bg-gray-800 rounded-xl shadow-sm p-5 space-y-5">
        <h3 className="text-lg font-semibold text-white">
          Organization Settings
        </h3>
        <div>
          <label className="text-sm font-medium text-gray-300">
            Organization Name
          </label>
          <input
            type="text"
            defaultValue="City Public Works Department"
            className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">
            Contact Email
          </label>
          <input
            type="email"
            defaultValue="contact@publicworks.city.gov"
            className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">
            Response Time Goal (hours)
          </label>
          <input
            type="number"
            defaultValue="24"
            className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 bg-gray-700 text-white"
          />
        </div>
        <button className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm hover:bg-orange-600">
          Save Settings
        </button>
      </div>
    )}
  </div>
</div>
  );
};

export default OrganizationDashboard;
