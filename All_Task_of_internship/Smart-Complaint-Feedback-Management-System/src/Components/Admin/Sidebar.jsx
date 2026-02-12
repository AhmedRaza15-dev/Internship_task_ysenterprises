import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: "bi-grid", path: "/admin/dashboard" },
    { name: "Complaints", icon: "bi-exclamation-circle", path: "/admin/complaints" },
    { name: "Users", icon: "bi-people", path: "/admin/users" },
    { name: "Settings", icon: "bi-gear", path: "/admin/settings" },
  ];

  const sidebarVariants = {
    expanded: {
      width: "250px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    collapsed: {
      width: "70px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const menuItemVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1
      }
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    expanded: {
      marginRight: "10px",
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    collapsed: {
      marginRight: "0px",
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button - Fixed Position */}
      <motion.button
        className="sidebar-toggle btn btn-light border shadow-sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'fixed',
          left: isCollapsed ? '70px' : '235px',
          top: '16px',
          zIndex: 1001,
          transition: 'left 0.3s ease, all 0.2s ease',
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.i
          className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        ></motion.i>
      </motion.button>

      {/* Sidebar */}
      <motion.div
        className="sidebar bg-white vh-100 border-end position-fixed"
        style={{
          width: isCollapsed ? "70px" : "250px",
          left: 0,
          top: 0,
          zIndex: 1000,
          overflow: "hidden"
        }}
        variants={sidebarVariants}
        animate={isCollapsed ? "collapsed" : "expanded"}
        initial={false}
      >
        {/* Sidebar Header - FIXED VERSION */}
        <div className="sidebar-header p-4 border-bottom">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {/* Logo Icon - ALWAYS VISIBLE in both states */}
              <motion.div 
                className="logo-icon rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  cursor: 'pointer',
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                animate={{ 
                  rotate: isCollapsed ? 180 : 0
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeInOut" 
                }}
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                <span className="text-white fw-bold fs-5">A</span>
              </motion.div>

              {/* Logo Text - Only shown when EXPANDED */}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div 
                    className="ms-3"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ 
                      opacity: 1, 
                      width: 'auto',
                      transition: { 
                        opacity: { duration: 0.2 },
                        width: { duration: 0.3 }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      width: 0,
                      transition: { 
                        opacity: { duration: 0.1 },
                        width: { duration: 0.2 }
                      }
                    }}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}
                  >
                    <h5 className="fw-bold mb-0">Admin Panel</h5>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Optional close button for expanded state only */}
            {/* <AnimatePresence>
              {!isCollapsed && (
                <motion.button
                  className="btn btn-sm btn-link text-muted p-0"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="bi bi-chevron-left"></i>
                </motion.button>
              )}
            </AnimatePresence> */}
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="sidebar-menu p-2">
          {menuItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.path}
              className={`d-flex align-items-center text-decoration-none py-3 px-3 rounded mb-2 ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-dark hover-bg'
              }`}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.i
                className={`bi ${item.icon} fs-5`}
                variants={iconVariants}
                animate={isCollapsed ? "collapsed" : "expanded"}
              ></motion.i>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fw-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {location.pathname === item.path && (
                <motion.div
                  className="position-absolute end-0 me-3"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.2 }}
                  transition={{ type: "spring" }}
                >
                  <i className="bi bi-circle-fill" style={{ fontSize: "8px" }}></i>
                </motion.div>
              )}
            </motion.a>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer position-absolute bottom-0 w-100 p-3 border-top">
          <motion.div
            className="d-flex align-items-center"
            animate={isCollapsed ? "collapsed" : "expanded"}
            variants={menuItemVariants}
          >
            <div className={`avatar ${isCollapsed ? 'mx-auto' : 'me-3'}`}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Admin"
                className="rounded-circle border border-primary"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover"
                }}
              />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-grow-1"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 fw-semibold">John Doe</h6>
                      <small className="text-muted">Administrator</small>
                    </div>
                    <a href="/logout" className="text-decoration-none">
                      <i className="bi bi-box-arrow-right"></i>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Padding Adjustment */}
      <style>
        {`
          .main-content {
            margin-left: ${isCollapsed ? '70px' : '250px'};
            transition: margin-left 0.3s ease;
          }
          
          .sidebar-toggle {
            width: 35px;
            height: 35px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background: white;
          }
          
          .sidebar-toggle i {
            font-size: 1rem;
          }
          
          .hover-bg:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          
          .logo-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
          }
          
          .logo-icon:active {
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }

          .logo-icon:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
          
          /* Mobile responsive */
          @media (max-width: 768px) {
            .sidebar-toggle {
              display: none !important;
            }
            
            .sidebar {
              width: 100% !important;
              position: fixed;
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }
            
            .sidebar.open {
              transform: translateX(0);
            }
            
            .main-content {
              margin-left: 0 !important;
            }
            
            /* Mobile menu button */
            .mobile-menu-btn {
              display: block !important;
              position: fixed;
              top: 16px;
              left: 16px;
              z-index: 1002;
            }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;