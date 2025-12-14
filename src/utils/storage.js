// LocalStorage utility functions
export const storage = {
  // User management
  getUsers: () => JSON.parse(localStorage.getItem('users') || '[]'),
  
  saveUser: (user) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  findUser: (username) => {
    const users = storage.getUsers();
    return users.find(user => user.username === username);
  },
  
  updateUserScore: (username, score) => {
    const users = storage.getUsers();
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      users[userIndex].highestScore = Math.max(users[userIndex].highestScore || 0, score);
      localStorage.setItem('users', JSON.stringify(users));
    }
  },
  
  // Session management
  setCurrentUser: (username) => localStorage.setItem('currentUser', username),
  getCurrentUser: () => localStorage.getItem('currentUser'),
  logout: () => localStorage.removeItem('currentUser'),
  
  // Game data
  getLeaderboard: () => {
    const users = storage.getUsers();
    return users
      .filter(user => user.highestScore > 0)
      .sort((a, b) => (b.highestScore || 0) - (a.highestScore || 0));
  }
};