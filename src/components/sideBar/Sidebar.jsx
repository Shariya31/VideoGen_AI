import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "./sidebarData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Toggle Button (always visible) */}
      <button
        onClick={toggleSidebar}
        className="p-2 fixed top-4 left-4 bg-gray-800 text-white z-[100] lg:hidden"
      >
        {isOpen ? "❌" : "☰"}
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:hidden lg:block">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          className="w-60 h-screen bg-gray-800 text-white p-4 
          fixed top-0 left-0 overflow-y-auto"
        >
          <h1 className="text-2xl font-bold mb-6">My App</h1>
          <SidebarLinks
            location={location}
            openDropdown={openDropdown}
            handleDropdownToggle={handleDropdownToggle}
          />
        </motion.div>
      </div>

      {/* Sidebar as drawer for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="block md:hidden w-64 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-50 shadow-lg overflow-y-auto"
          >
            <h1 className="text-2xl font-bold mb-6">My App</h1>
            <SidebarLinks
              location={location}
              openDropdown={openDropdown}
              handleDropdownToggle={handleDropdownToggle}
              onNavigate={() => setIsOpen(false)} // close drawer after clicking
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Extracted SidebarLinks into a reusable component
const SidebarLinks = ({ location, openDropdown, handleDropdownToggle, onNavigate = () => { } }) => {
  return (
    <nav className="flex flex-col space-y-2">
      {sidebarLinks.map((link) => {
        const isActive = location.pathname === link.path;
        const hasChildren = link.children?.length > 0;
        const isDropdownOpen = openDropdown === link.name;

        return (
          <div key={link.name}>
            <div
              onClick={() =>
                hasChildren ? handleDropdownToggle(link.name) : onNavigate()
              }
              className={`flex items-center justify-between cursor-pointer gap-2 px-4 py-2 rounded-md transition duration-300 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
            >
              <div className="flex items-center gap-2">
                <span>{link.icon}</span>
                {link.path ? (
                  <Link to={link.path} onClick={onNavigate}>
                    {link.name}
                  </Link>
                ) : (
                  <span>{link.name}</span>
                )}
              </div>
              {hasChildren &&
                (isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </div>

            {/* Dropdown for children */}
            {hasChildren && (
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 mt-1 flex flex-col gap-1"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={onNavigate}
                        className={`px-3 py-1 rounded-md text-sm ${location.pathname === child.path
                            ? "bg-blue-500"
                            : "hover:bg-gray-700"
                          }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Sidebar;
