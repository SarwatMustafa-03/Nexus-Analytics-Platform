import React from "react";
import { 
  Home, User, Users, 
  DollarSign as DollarIcon, Settings, 
  Database, X
} from "lucide-react";

const ACCENT_COLOR = "#094D4E";
const LIGHT_BACKGROUND = "bg-white";

const Sidebar = ({ isOpen, toggleSidebar, activePage, setPage }) => {
  const navItems = [
    { key: "dashboard", name: "Dashboard", icon: Home },
    { key: "users", name: "User Management", icon: Users },
    { key: "transactions", name: "Transactions", icon: DollarIcon },
    { key: "settings", name: "Settings", icon: Settings },
  ];

  const logoStyle = { color: ACCENT_COLOR };
  const activeLinkStyle = { 
    backgroundColor: ACCENT_COLOR, 
    color: 'white',
    boxShadow: `0 4px 6px -1px rgba(9, 77, 78, 0.5), 0 2px 4px -2px rgba(9, 77, 78, 0.5)`
  };

  const handleNavigation = (key) => {
    setPage(key);
    // Only toggle sidebar on mobile when navigating
    if (window.innerWidth < 1024) { 
      toggleSidebar(); 
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar Structure */}
      <div 
        className={`
          fixed top-0 left-0 h-full w-64 shadow-2xl z-40 p-6 flex flex-col transition-transform duration-300 
          ${LIGHT_BACKGROUND} border-r border-gray-200
          lg:relative lg:translate-x-0 lg:shadow-none lg:h-auto lg:min-h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <Database className="w-6 h-6 mr-2" style={logoStyle} />
            <h2 className="text-xl font-extrabold text-gray-900">Nexus</h2>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1 text-gray-700 hover:text-red-500 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.key}
              href="#"
              onClick={() => handleNavigation(item.key)}
              className={`
                flex items-center p-3 rounded-lg font-medium transition-all duration-200
                ${item.key === activePage 
                  ? 'shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
              style={item.key === activePage ? activeLinkStyle : {}}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="pt-6 border-t border-gray-200 mt-auto">
          <div className="flex items-center p-3">
            <User className="w-8 h-8 rounded-full p-1" style={logoStyle} />
            <div className="ml-3">
              <p className="text-sm font-semibold">User Admin</p>
              <p className="text-xs text-gray-500">nexus@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;