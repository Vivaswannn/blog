import React from 'react';
import env from '../config/env.config';

const EnvTest = () => {
  return (
    <div className="env-test" style={{ padding: '20px' }}>
      <h2>Environment Configuration Test</h2>
      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        overflow: 'auto'
      }}>
        {JSON.stringify({
          blogTitle: env.blogTitle,
          blogDescription: env.blogDescription,
          environment: env.environment,
          version: env.version,
          isDevelopment: env.isDevelopment(),
          // Not showing sensitive data like API keys
        }, null, 2)}
      </pre>
    </div>
  );
};

export default EnvTest; 