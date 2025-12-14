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
      // Ensure highestScore exists and update it
      if (!users[userIndex].highestScore) {
        users[userIndex].highestScore = 0;
      }
      users[userIndex].highestScore = Math.max(users[userIndex].highestScore, score);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      // If user doesn't exist in users array, create them
      users.push({ username, password: '', highestScore: score });
      localStorage.setItem('users', JSON.stringify(users));
    }
  },
  
  // Session management
  setCurrentUser: (username) => {
    localStorage.setItem('currentUser', username);
    // Ensure user exists in users array
    const users = storage.getUsers();
    if (!users.find(user => user.username === username)) {
      users.push({ username, password: '', highestScore: 0 });
      localStorage.setItem('users', JSON.stringify(users));
    }
  },
  getCurrentUser: () => localStorage.getItem('currentUser'),
  logout: () => localStorage.removeItem('currentUser'),
  
  // Game data
  getLeaderboard: () => {
    const users = storage.getUsers();
    return users
      .filter(user => user.highestScore && user.highestScore > 0)
      .sort((a, b) => (b.highestScore || 0) - (a.highestScore || 0));
  }
};