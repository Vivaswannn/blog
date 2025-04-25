const env = {
  // API Configuration
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  apiKey: process.env.REACT_APP_API_KEY,

  // Authentication
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  authClientId: process.env.REACT_APP_AUTH_CLIENT_ID,

  // Blog Configuration
  blogTitle: process.env.REACT_APP_BLOG_TITLE || 'Educational Resource Blog',
  blogDescription: process.env.REACT_APP_BLOG_DESCRIPTION || 'A platform for sharing educational resources',
  maxUploadSize: parseInt(process.env.REACT_APP_MAX_UPLOAD_SIZE || '5242880', 10),

  // Environment
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  version: process.env.REACT_APP_VERSION || '1.0.0',

  // Helper method to check if we're in production
  isProduction: () => env.environment === 'production',
  isDevelopment: () => env.environment === 'development',
};

// Freeze the configuration to prevent accidental modifications
export default Object.freeze(env); 