import { create } from 'zustand';

export interface User {
  username: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  usersList: any[];
  initDb: () => Promise<void>;
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string, name: string) => { success: boolean; error?: string };
  changePassword: (username: string, newPassword: string) => { success: boolean; error?: string };
  updatePassword: (username: string, oldPassword: string, newPassword: string) => { success: boolean; error?: string };
  loginAsGuest: () => void;
  logout: () => void;
}

// Simple base64 encoding to simulate securely storing password hashes in db.json / localStorage
const hashPassword = (password: string) => btoa(password);

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: !!localStorage.getItem('sentinel_token'),
  user: localStorage.getItem('sentinel_user') ? JSON.parse(localStorage.getItem('sentinel_user')!) : null,
  usersList: [],

  initDb: async () => {
    try {
      // Check if we already have users in localStorage, otherwise load from db.json
      const localUsers = localStorage.getItem('sentinel_db_users');
      if (localUsers) {
        set({ usersList: JSON.parse(localUsers) });
      } else {
        const response = await fetch('/db.json');
        const data = await response.json();
        // Store hashed passwords
        const usersWithHashedPass = data.users.map((u: any) => ({
          ...u,
          password: hashPassword(u.password)
        }));
        set({ usersList: usersWithHashedPass });
        localStorage.setItem('sentinel_db_users', JSON.stringify(usersWithHashedPass));
      }
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  },

  login: (username, password) => {
    const { usersList } = get();
    const cleanUsername = username.toLowerCase().trim();
    const userRecord = usersList.find(u => u.username.toLowerCase() === cleanUsername);

    if (!userRecord) {
      return { success: false, error: 'Invalid username' };
    }

    if (userRecord.password !== hashPassword(password)) {
      return { success: false, error: 'Incorrect password' };
    }

    const sessionUser = {
      username: userRecord.username,
      name: userRecord.name,
      role: userRecord.role
    };

    set({ isAuthenticated: true, user: sessionUser });
    localStorage.setItem('sentinel_token', 'true');
    localStorage.setItem('sentinel_user', JSON.stringify(sessionUser));

    return { success: true };
  },

  signup: (username, password, name) => {
    const { usersList } = get();
    const cleanUsername = username.toLowerCase().trim();

    if (usersList.some(u => u.username.toLowerCase() === cleanUsername)) {
      return { success: false, error: 'Username already exists' };
    }

    const newUser = {
      username: cleanUsername,
      password: hashPassword(password),
      name: name.trim() || 'New User',
      role: 'Operator' // Default signup role
    };

    const updatedUsersList = [...usersList, newUser];
    set({ usersList: updatedUsersList });
    localStorage.setItem('sentinel_db_users', JSON.stringify(updatedUsersList));

    const sessionUser = {
      username: newUser.username,
      name: newUser.name,
      role: newUser.role
    };

    set({ isAuthenticated: true, user: sessionUser });
    localStorage.setItem('sentinel_token', 'true');
    localStorage.setItem('sentinel_user', JSON.stringify(sessionUser));

    return { success: true };
  },

  changePassword: (username, newPassword) => {
    const { usersList } = get();
    const cleanUsername = username.toLowerCase().trim();
    const userIndex = usersList.findIndex(u => u.username.toLowerCase() === cleanUsername);

    if (userIndex === -1) {
      return { success: false, error: 'Username not found' };
    }

    const updatedUsersList = [...usersList];
    updatedUsersList[userIndex] = {
      ...updatedUsersList[userIndex],
      password: hashPassword(newPassword)
    };

    set({ usersList: updatedUsersList });
    localStorage.setItem('sentinel_db_users', JSON.stringify(updatedUsersList));

    return { success: true };
  },

  updatePassword: (username, oldPassword, newPassword) => {
    const { usersList } = get();
    const cleanUsername = username.toLowerCase().trim();
    const userIndex = usersList.findIndex(u => u.username.toLowerCase() === cleanUsername);

    if (userIndex === -1) {
      return { success: false, error: 'Username not found' };
    }

    if (usersList[userIndex].password !== hashPassword(oldPassword)) {
      return { success: false, error: 'Incorrect current password' };
    }

    const updatedUsersList = [...usersList];
    updatedUsersList[userIndex] = {
      ...updatedUsersList[userIndex],
      password: hashPassword(newPassword)
    };

    set({ usersList: updatedUsersList });
    localStorage.setItem('sentinel_db_users', JSON.stringify(updatedUsersList));

    return { success: true };
  },

  loginAsGuest: () => {
    const guestUser = {
      username: 'guest',
      name: 'Guest Explorer',
      role: 'Guest'
    };
    set({ isAuthenticated: true, user: guestUser });
    localStorage.setItem('sentinel_token', 'true');
    localStorage.setItem('sentinel_user', JSON.stringify(guestUser));
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem('sentinel_token');
    localStorage.removeItem('sentinel_user');
  }
}));
