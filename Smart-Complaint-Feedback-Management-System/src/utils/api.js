// Mock data for development



export const mockDashboardStats = {
  total: 1250,
  pending: 180,
  inProgress: 45,
  resolved: 1025
};

export const mockComplaints = [
  {
    id: 101,
    userName: "John Doe",
    category: "Technical",
    description: "Unable to access dashboard features...",
    status: "pending",
    assignedTo: "Tech Team",
    createdAt: "2024-01-15"
  }
];

export const mockAnalytics = {
  categories: [
    { name: "Technical", count: 45 },
    { name: "Billing", count: 32 },
    { name: "Service", count: 28 },
    { name: "Network", count: 21 },
    { name: "Other", count: 15 }
  ],
  monthlyTrend: [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 145 },
    { month: "Mar", count: 130 },
    { month: "Apr", count: 160 }
  ],
  frequentIssues: [
    { issue: "Login Problems", count: 45, category: "Technical" },
    { issue: "Payment Failed", count: 32, category: "Billing" },
    { issue: "Slow Response", count: 28, category: "Service" }
  ],
  maxIssueCount: 45
};