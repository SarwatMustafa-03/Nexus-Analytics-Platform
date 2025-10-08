import React, { useState } from "react";
import { 
  Settings, User, Shield, Bell, CreditCard, Globe, 
  Database, Moon, Eye, EyeOff, Save, Download, Upload,
  CheckCircle, XCircle, AlertCircle
} from "lucide-react";

const ACCENT_COLOR = "#094D4E";
const LIGHT_BACKGROUND = "bg-white";

const SettingsSection = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'Nexus Analytics',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    language: 'English',
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordRequirements: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    smsAlerts: false,
    weeklyReports: true,
    
    // Appearance Settings
    theme: 'light',
    compactMode: false,
    highContrast: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Moon },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  const SettingCard = ({ title, description, children }) => (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
      )}
      {children}
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        className={`${
          enabled ? 'bg-teal-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
        onClick={() => onChange(!enabled)}
      >
        <span
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );

  const SelectInput = ({ value, onChange, options, label }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const TextInput = ({ value, onChange, label, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and platform settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Save Indicator */}
          {saved && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Settings saved successfully!</span>
            </div>
          )}

          {/* General Settings */}
          {activeTab === 'general' && (
            <div>
              <SettingCard
                title="Company Information"
                description="Basic information about your organization"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="Company Name"
                    value={settings.companyName}
                    onChange={(value) => handleInputChange('general', 'companyName', value)}
                    placeholder="Enter company name"
                  />
                  <SelectInput
                    label="Timezone"
                    value={settings.timezone}
                    onChange={(value) => handleInputChange('general', 'timezone', value)}
                    options={[
                      { value: 'UTC-5', label: 'EST (UTC-5)' },
                      { value: 'UTC-8', label: 'PST (UTC-8)' },
                      { value: 'UTC+0', label: 'GMT (UTC+0)' },
                      { value: 'UTC+1', label: 'CET (UTC+1)' },
                    ]}
                  />
                  <SelectInput
                    label="Date Format"
                    value={settings.dateFormat}
                    onChange={(value) => handleInputChange('general', 'dateFormat', value)}
                    options={[
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                    ]}
                  />
                  <SelectInput
                    label="Language"
                    value={settings.language}
                    onChange={(value) => handleInputChange('general', 'language', value)}
                    options={[
                      { value: 'English', label: 'English' },
                      { value: 'Spanish', label: 'Spanish' },
                      { value: 'French', label: 'French' },
                      { value: 'German', label: 'German' },
                    ]}
                  />
                </div>
              </SettingCard>

              <SettingCard
                title="Data Management"
                description="Control how your data is handled and stored"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Export Data</h4>
                      <p className="text-sm text-gray-600">Download all your data in CSV format</p>
                    </div>
                    <button className="mt-2 sm:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Import Data</h4>
                      <p className="text-sm text-gray-600">Upload data from external sources</p>
                    </div>
                    <button className="mt-2 sm:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </button>
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <SettingCard
                title="Authentication"
                description="Manage your login security and authentication methods"
              >
                <div className="space-y-6">
                  <ToggleSwitch
                    label="Two-Factor Authentication"
                    enabled={settings.twoFactorAuth}
                    onChange={(value) => handleInputChange('security', 'twoFactorAuth', value)}
                  />
                  
                  <ToggleSwitch
                    label="Strong Password Requirements"
                    enabled={settings.passwordRequirements}
                    onChange={(value) => handleInputChange('security', 'passwordRequirements', value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 min</span>
                      <span>{settings.sessionTimeout} min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Password"
                description="Update your account password"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <TextInput
                      label="Current Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <TextInput
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
              </SettingCard>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div>
              <SettingCard
                title="Notification Preferences"
                description="Choose how you want to receive notifications"
              >
                <div className="space-y-6">
                  <ToggleSwitch
                    label="Email Notifications"
                    enabled={settings.emailNotifications}
                    onChange={(value) => handleInputChange('notifications', 'emailNotifications', value)}
                  />
                  
                  <ToggleSwitch
                    label="Push Notifications"
                    enabled={settings.pushNotifications}
                    onChange={(value) => handleInputChange('notifications', 'pushNotifications', value)}
                  />
                  
                  <ToggleSwitch
                    label="SMS Alerts"
                    enabled={settings.smsAlerts}
                    onChange={(value) => handleInputChange('notifications', 'smsAlerts', value)}
                  />
                  
                  <ToggleSwitch
                    label="Weekly Reports"
                    enabled={settings.weeklyReports}
                    onChange={(value) => handleInputChange('notifications', 'weeklyReports', value)}
                  />
                </div>
              </SettingCard>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div>
              <SettingCard
                title="Theme & Display"
                description="Customize the look and feel of the application"
              >
                <div className="space-y-6">
                  <SelectInput
                    label="Theme"
                    value={settings.theme}
                    onChange={(value) => handleInputChange('appearance', 'theme', value)}
                    options={[
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                      { value: 'auto', label: 'Auto (System)' },
                    ]}
                  />

                  <ToggleSwitch
                    label="Compact Mode"
                    enabled={settings.compactMode}
                    onChange={(value) => handleInputChange('appearance', 'compactMode', value)}
                  />
                  
                  <ToggleSwitch
                    label="High Contrast Mode"
                    enabled={settings.highContrast}
                    onChange={(value) => handleInputChange('appearance', 'highContrast', value)}
                  />
                </div>
              </SettingCard>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div>
              <SettingCard
                title="Billing Information"
                description="Manage your subscription and payment methods"
              >
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">Current Plan</h4>
                        <p className="text-blue-700">Enterprise Plan - $99/month</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput
                      label="Card Number"
                      placeholder="**** **** **** 1234"
                    />
                    <TextInput
                      label="Expiry Date"
                      placeholder="MM/YY"
                    />
                  </div>

                  <button className="w-full md:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                    Update Payment Method
                  </button>
                </div>
              </SettingCard>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
            
              onClick={handleSave}
              className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;