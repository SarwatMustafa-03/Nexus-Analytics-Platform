import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import Transactions from "./components/Transactions";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard toggleSidebar={toggleSidebar} />;
      case 'users':
        return <UserManagement />;
      case 'transactions':
        return <Transactions />;
      default:
        return <Dashboard toggleSidebar={toggleSidebar} />;
    }
  };

  return (
    <div className="flex min-h-screen transition-colors duration-300 font-sans w-full bg-white text-gray-900">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activePage={activePage} 
        setPage={setActivePage}
      />
      {renderPage()}
    </div>
  );
};

export default App;