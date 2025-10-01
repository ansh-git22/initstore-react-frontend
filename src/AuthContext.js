// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage (safe parsing)
  const [user, setUser] = useState(() => {
    try {
      if (typeof window === 'undefined') return null;
      const raw = localStorage.getItem('user');
      if (!raw || raw === 'undefined') return null;
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading user from localStorage', err);
      localStorage.removeItem('user');
      return null;
    }
  });

  // Initialize token from localStorage
  const [token, setToken] = useState(() => {
    try {
      if (typeof window === 'undefined') return null;
      const t = localStorage.getItem('token');
      return t || null;
    } catch (err) {
      console.error('Error reading token from localStorage', err);
      localStorage.removeItem('token');
      return null;
    }
  });

  /**
   * Flexible login handler:
   * - login({ name, id, email, token })           // token inside object
   * - login({ user: {...}, token: "..." })        // token + nested user
   * - login(userObj, tokenString)                 // old signature
   */
  const login = (payload, maybeToken) => {
    try {
      if (!payload) {
        // Clear
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        console.warn('login called with no payload — auth cleared');
        return;
      }

      let userInfo = null;
      let resolvedToken = null;

      // Case: token passed separately
      if (typeof maybeToken === 'string') {
        userInfo = payload;
        resolvedToken = maybeToken;
      } else if (payload && typeof payload === 'object') {
        // payload = { token, ...user } OR { user: {...}, token: '...' } OR plain user object
        if ('token' in payload && payload.token) {
          resolvedToken = payload.token;
          if (payload.user && typeof payload.user === 'object') {
            userInfo = payload.user;
          } else {
            // strip token key from payload to make user object
            const { token: _t, ...rest } = payload;
            userInfo = rest;
          }
        } else if (payload.user && typeof payload.user === 'object') {
          // payload.user exists (maybe token elsewhere)
          userInfo = payload.user;
          if (payload.token) resolvedToken = payload.token;
        } else {
          // fallback: treat payload itself as user
          userInfo = payload;
        }
      } else {
        // fallback
        userInfo = payload;
      }

      // Persist user and token
      if (userInfo) {
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }

      if (resolvedToken) {
        localStorage.setItem('token', resolvedToken);
        setToken(resolvedToken);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }

      // helpful log to debug what was actually stored
      // (remove in production)
      console.log('AuthProvider: saved login', { user: userInfo, token: resolvedToken });
    } catch (err) {
      console.error('AuthProvider.login error:', err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      console.log('AuthProvider: logged out');
    } catch (err) {
      console.error('AuthProvider.logout error:', err);
    }
  };

  // Keep state in sync if another tab changes localStorage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'user') {
        try {
          setUser(e.newValue && e.newValue !== 'undefined' ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
      if (e.key === 'token') {
        setToken(e.newValue || null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
