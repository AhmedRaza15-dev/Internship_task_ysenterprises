export const getPollStatus = (expiresAt) => {
  const now = new Date();
  const expiryDate = new Date(expiresAt);

  if (now > expiryDate) {
    return 'expired';
  }
  
  // Consider polls within last 24 hours as "active"
  const hoursUntilExpiry = (expiryDate - now) / (1000 * 60 * 60);
  return hoursUntilExpiry <= 24 ? 'active' : 'closed';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isPollActive = (expiresAt) => {
  return new Date(expiresAt) > new Date();
};