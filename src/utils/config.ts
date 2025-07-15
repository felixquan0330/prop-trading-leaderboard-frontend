// Configuration for API endpoints
export const API_CONFIG = {
  // Backend API base URL
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
  
  // Individual endpoints
  ENDPOINTS: {
    FTMO: '/ftmo/leaderboard',
    FUNDED_X: '/funded-x/leaderboard',
    FUNDING_PIPS: '/funding-pips/leaderboard',
    BREAKOUTPROP: '/breakoutprop/leaderboard',
    GLOBAL_LEADERBOARD: '/leaderboard',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`;
}; 