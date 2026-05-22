import React, { useEffect } from 'react'; // 1. Added useEffect to the import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

const PrivateRoute = function({ children }) {
  const { user, loading } = useAuth();
  if (loading) return React.createElement('div', { style: { color: 'white', padding: 20, textAlign: 'center' } }, 'Loading...');
  return user ? children : React.createElement(Navigate, { to: '/login' });
};

function App() {
  // 2. Moved the useEffect INSIDE the App function
  useEffect(() => {
    const darkMode = localStorage.getItem('cpa_darkmode') !== 'false';
    if (darkMode) {
      document.body.style.background = '#07090f';
      document.body.style.color = '#e8f0fe';
    } else {
      document.body.style.background = '#f0f4f8';
      document.body.style.color = '#1a2235';
    }
  }, []);

  return (
    React.createElement(AuthProvider, null,
      React.createElement(Router, null,
        React.createElement(Routes, null,
          React.createElement(Route, { path: '/login', element: React.createElement(Login, null) }),
          React.createElement(Route, { path: '/dashboard', element:
            React.createElement(PrivateRoute, null,
              React.createElement(Dashboard, null)
            )
          }),
          React.createElement(Route, { path: '/', element: React.createElement(Navigate, { to: '/dashboard' }) })
        )
      )
    )
  );
}

export default App;