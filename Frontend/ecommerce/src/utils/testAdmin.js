// Test Admin User Setup
// Add this to your project to quickly test admin functionality

import { useAuthStore } from '../store';

export const setupTestAdmin = () => {
  const { user, isAuthenticated } = useAuthStore.getState();
  
  // If no user is logged in, create a test admin user
  if (!isAuthenticated) {
    useAuthStore.setState({
      user: {
        id: 'test-admin-1',
        name: 'Test Admin',
        email: 'admin@ginasanchez.com',
        role: 'admin',
        isAdmin: true
      },
      token: 'test-admin-token',
      isAuthenticated: true,
      error: null
    });
    
    console.log('✅ Test admin user created!');
    console.log('📧 Email: admin@ginasanchez.com');
    console.log('🔑 Role: admin');
    console.log('🚀 You can now access /admin');
  } else {
    console.log('👤 User already logged in:', user);
  }
};

// Function to make current user an admin (for testing)
export const makeCurrentUserAdmin = () => {
  const { user } = useAuthStore.getState();
  
  if (user) {
    useAuthStore.setState({
      user: {
        ...user,
        role: 'admin',
        isAdmin: true
      }
    });
    console.log('✅ Current user is now an admin!');
  } else {
    console.log('❌ No user logged in');
  }
};

// Use these functions in browser console:
// setupTestAdmin()     - Creates test admin user
// makeCurrentUserAdmin() - Makes current user admin
