import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Components/Admin/Sidebar";
import DashboardCards from "../Components/Admin/DashboardCards";
import ComplaintManagement from "../Components/Admin/ComplaintManagement";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("adminUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Add default image if not present
      if (!parsedUser.image) {
        parsedUser.image = "https://randomuser.me/api/portraits/men/32.jpg";
      }
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Mock data for demonstration
      const mockData = {
        total: 156,
        pending: 42,
        inProgress: 23,
        resolved: 91,
      };
      
      // For actual API call, uncomment this:
      // const response = await fetch("/api/dashboard/stats");
      // const data = await response.json();
      
      // Using mock data temporarily
      setDashboardStats(mockData);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const quickStatsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar with animation */}
        <motion.div 
          className="col-md-3 col-lg-2 p-0"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          <Sidebar />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="col-md-9 col-lg-10 p-4 main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* AnimatePresence for loading states */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-5"
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Header */}
                <motion.div 
                  className="d-flex justify-content-between align-items-center mb-4"
                  variants={itemVariants}
                >
                  <div>
                    <motion.h3 
                      className="fw-bold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Dashboard Overview
                    </motion.h3>
                    <motion.p 
                      className="text-muted mb-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Welcome back, {user?.name || "Admin"}
                      {import.meta.env.DEV && (
                        <motion.span 
                          className="badge bg-info ms-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.4 }}
                        >
                          Dev Mode
                        </motion.span>
                      )}
                    </motion.p>
                  </div>
                  
                  {/* User Profile Section */}
                  <div className="d-flex align-items-center gap-3">
                    {/* User Profile Image */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="position-relative"
                    >
                      <img
                        src={user?.image || "https://randomuser.me/api/portraits/men/32.jpg"}
                        alt="Admin"
                        className="rounded-circle border border-primary border-2"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
                        style={{
                          width: "12px",
                          height: "12px"
                        }}
                      ></div>
                    </motion.div>
                    
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">{user?.name || "Admin"}</span>
                      <small className="text-muted">Administrator</small>
                    </div>
                    
                    <div className="vr mx-2"></div>
                    
                    <motion.div 
                      className="d-flex gap-2"
                      variants={itemVariants}
                    >
                      <motion.button 
                        className="btn btn-outline-primary d-flex align-items-center"
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="bi bi-download me-2"></i> Export Report
                      </motion.button>
                      <motion.button 
                        className="btn btn-primary d-flex align-items-center"
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="bi bi-plus-circle me-2"></i> New Announcement
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Dashboard Cards */}
                <motion.div variants={itemVariants}>
                  <DashboardCards stats={dashboardStats} loading={loading} />
                </motion.div>

                {/* Complaint Management */}
                <motion.div 
                  className="mb-4"
                  variants={itemVariants}
                >
                  <ComplaintManagement />
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                  className="row g-4"
                  variants={quickStatsVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    className="col-md-4"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h6 className="text-muted mb-0">Avg. Resolution Time</h6>
                          <i className="bi bi-clock-history text-primary fs-5"></i>
                        </div>
                        <h3 className="fw-bold mb-2">2.5 Days</h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-down me-1"></i> 12% faster than last month
                        </small>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="col-md-4"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h6 className="text-muted mb-0">User Satisfaction</h6>
                          <i className="bi bi-emoji-smile text-success fs-5"></i>
                        </div>
                        <h3 className="fw-bold mb-2">92%</h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up me-1"></i> 5% increase
                        </small>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="col-md-4"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h6 className="text-muted mb-0">Active Staff</h6>
                          <i className="bi bi-people-fill text-info fs-5"></i>
                        </div>
                        <h3 className="fw-bold mb-2">8</h3>
                        <small className="text-muted">Currently handling complaints</small>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;