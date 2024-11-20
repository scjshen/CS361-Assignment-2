const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bankingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });

      if (user && user.password === password) {
          res.json({
              success: true,
              balance: user.balance,
              transactions: user.transactions,
              message: 'Login successful',
          });
      } else {
          res.json({ success: false, message: 'Invalid username or password' });
      }
  } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get username
app.get('/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            balance: user.balance,
            transactions: user.transactions,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user balance
app.get('/users/:username/balance', async (req, res) => {
  try {
      const user = await User.findOne({ username: req.params.username });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({
          username: user.username,
          balance: user.balance,
      });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
});

//Get user transactions
app.get('/users/:username/transactions', async (req, res) => {
  try {
      const user = await User.findOne({ username: req.params.username });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({
          transactions: user.transactions
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
