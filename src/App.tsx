import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { MoodProvider } from './contexts/MoodContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import MoodTracker from './pages/MoodTracker';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EmergencyResources from './pages/EmergencyResources';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <MoodProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="chat" element={
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  } />
                  <Route path="mood-tracker" element={
                    <PrivateRoute>
                      <MoodTracker />
                    </PrivateRoute>
                  } />
                  <Route path="dashboard" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path="resources" element={<Resources />} />
                  <Route path="emergency" element={<EmergencyResources />} />
                  <Route path="profile" element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } />
                </Route>
              </Routes>
            </Router>
          </MoodProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;