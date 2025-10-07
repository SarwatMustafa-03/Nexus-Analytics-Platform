import React, { useState, useMemo } from "react";
import { 
  User, Users, Mail, BriefcaseBusiness, Phone, MapPin, 
  Clock, Calendar, Edit, Trash2, PlusCircle, Search, 
  Globe, XOctagon, TrendingUp, TrendingDown 
} from "lucide-react";

const ACCENT_COLOR = "#094D4E";
const LIGHT_BACKGROUND = "bg-white";

// Enhanced User Data
const userManagementData = [
  { 
    id: 101, 
    name: 'Alice Johnson', 
    email: 'alice.johnson@techcorp.com', 
    role: 'Administrator', 
    status: 'Active', 
    lastLogin: '1 hour ago', 
    created: 'Jan 15, 2024',
    department: 'Engineering',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'AJ',
    permissions: ['Full Access', 'User Management', 'Billing']
  },
  { 
    id: 102, 
    name: 'Robert Williams', 
    email: 'bob.williams@techcorp.com', 
    role: 'Editor', 
    status: 'Inactive', 
    lastLogin: '3 days ago', 
    created: 'Feb 20, 2024',
    department: 'Marketing',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    avatar: 'RW',
    permissions: ['Content Edit', 'Analytics']
  },
  { 
    id: 103, 
    name: 'Charles Davis', 
    email: 'charlie.davis@techcorp.com', 
    role: 'Viewer', 
    status: 'Active', 
    lastLogin: '5 minutes ago', 
    created: 'Mar 10, 2024',
    department: 'Sales',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    avatar: 'CD',
    permissions: ['Read Only']
  },
  { 
    id: 104, 
    name: 'Diana Chen', 
    email: 'diana.chen@techcorp.com', 
    role: 'Administrator', 
    status: 'Active', 
    lastLogin: '1 day ago', 
    created: 'Apr 01, 2024',
    department: 'Product',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    avatar: 'DC',
    permissions: ['Full Access', 'User Management']
  },
  { 
    id: 105, 
    name: 'Evan Rodriguez', 
    email: 'evan.rodriguez@techcorp.com', 
    role: 'Editor', 
    status: 'Suspended', 
    lastLogin: '2 weeks ago', 
    created: 'May 05, 2024',
    department: 'Support',
    phone: '+1 (555) 567-8901',
    location: 'Miami, FL',
    avatar: 'ER',
    permissions: ['Content Edit', 'Support Access']
  },
  { 
    id: 106, 
    name: 'Fiona Zhang', 
    email: 'fiona.zhang@techcorp.com', 
    role: 'Viewer', 
    status: 'Active', 
    lastLogin: '1 minute ago', 
    created: 'Jun 12, 2024',
    department: 'HR',
    phone: '+1 (555) 678-9012',
    location: 'Seattle, WA',
    avatar: 'FZ',
    permissions: ['Read Only', 'HR Data']
  },
];

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, trend = null }) => {
  const isPositive = trend && (trend.startsWith('+') || trend.endsWith('s') || trend.endsWith('pts'));
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`
      rounded-xl p-6 shadow-md border border-gray-100 flex flex-col items-start transition-all 
      ${LIGHT_BACKGROUND} text-gray-900 hover:shadow-lg transform hover:scale-[1.01]
    `}>
      <div className="text-3xl p-3 rounded-full mb-3 text-white" style={{ backgroundColor: ACCENT_COLOR }}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {trend && (
        <div className="flex items-center text-sm mt-2">
          <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
          <span className={`font-semibold ${trendColor}`}>{trend}</span>
          <span className="text-gray-500 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
};

// Status Pill Component
const StatusPill = ({ status }) => {
  let colorClasses = "";
  switch (status) {
    case 'Active':
      colorClasses = "bg-green-100 text-green-800";
      break;
    case 'Inactive':
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case 'Suspended':
      colorClasses = "bg-red-100 text-red-800";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
  }
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
      {status}
    </span>
  );
};

// User Card Component
const UserCard = ({ user, onEdit, onDelete }) => {
  const getRoleColor = (role) => {
    const colors = {
      'Administrator': 'bg-purple-100 text-purple-800',
      'Editor': 'bg-blue-100 text-blue-800',
      'Viewer': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`
      rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col 
      ${LIGHT_BACKGROUND} text-gray-900 transition-shadow hover:shadow-xl
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-4" 
               style={{ backgroundColor: ACCENT_COLOR }}>
            {user.avatar}
          </div>
          <div>
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        </div>
        <StatusPill status={user.status} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          {user.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BriefcaseBusiness className="w-4 h-4 mr-2 text-gray-400" />
          <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
          <span className="mx-2">•</span>
          {user.department}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          {user.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          {user.location}
        </div>
      </div>

      {/* Permissions */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Permissions:</p>
        <div className="flex flex-wrap gap-1">
          {user.permissions.map((permission, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {permission}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Last login: {user.lastLogin}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          Joined: {user.created}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
        <button 
          onClick={() => onEdit(user)}
          className="flex items-center text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Edit className="w-4 h-4 mr-1" /> Edit
        </button>
        <button 
          onClick={() => onDelete(user.id)}
          className="flex items-center text-sm font-semibold px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

// User Management Main Component
const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    return userManagementData.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      const matchesDepartment = departmentFilter === 'All' || user.department === departmentFilter;
      
      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });
  }, [searchTerm, roleFilter, statusFilter, departmentFilter]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      console.log('Deleting user:', userId);
      // Implement actual delete logic here
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const userStats = [
    { icon: User, label: "Total Users", value: "9,540", trend: "+1.2%" },
    { icon: Globe, label: "New Users (30d)", value: "580", trend: "+8.9%" },
    { icon: XOctagon, label: "Suspended Accounts", value: "66", trend: "-5.0%" },
    { icon: Clock, label: "Avg. Session Time", value: "12:35 min", trend: "+0.5s" },
  ];

  const roles = ['All', 'Administrator', 'Editor', 'Viewer'];
  const statuses = ['All', 'Active', 'Inactive', 'Suspended'];
  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'Product', 'Support', 'HR'];

  return (
    <div className="p-4 grid grid-cols-1 gap-6 lg:p-8 lg:pt-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage platform users, roles, and permissions across your organization</p>
        </div>
        <button 
          onClick={handleAddUser}
          className="flex items-center text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90 shadow-md"
          style={{ backgroundColor: ACCENT_COLOR }}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, i) => (
          <StatCard key={i} icon={stat.icon} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </div>

      {/* Filters and Search */}
      <div className={`
        rounded-xl p-6 shadow-lg border border-gray-100 
        ${LIGHT_BACKGROUND} text-gray-900
      `}>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard 
            key={user.id} 
            user={user}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No users found matching your criteria</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* User Modal (Simplified) */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl p-6 max-w-md w-full ${LIGHT_BACKGROUND}`}>
            <h3 className="text-xl font-bold mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedUser ? `Editing ${selectedUser.name}` : 'Create a new user account'}
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                {selectedUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;