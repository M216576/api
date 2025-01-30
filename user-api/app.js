const express = require('express');
const app = express();
app.use(express.json());

// In-memory storage for users
let users = [];

// GET /api/users - Retrieve all users
app.get('/api/users', (req, res) => {
  res.status(200).json({ success: true, data: users });
});
// POST /api/users - Create a new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
  
    // Request validation
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }
  
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
  });
  app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
  
    // Request validation
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }
  
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
  
    users[userIndex] = { ...users[userIndex], name, email };
  res.status(200).json({ success: true, data: users[userIndex] });
});

// DELETE /api/users/:id - Delete a user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(200).json({ success: true, data: {} });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong on the server' });
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});