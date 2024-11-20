const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/bankingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


.then(async () => {
    console.log('Connected to MongoDB');

    await User.deleteMany({});

    const user1 = new User({
        username: 'chengjie',
        password: 'password',
        balance: 1350,
        transactions: [
            { date: new Date('2024-11-01'), description: 'Grocery', amount: -50, category: 'Food' },
            { date: new Date('2024-11-03'), description: 'Salary', amount: 1500, category: 'Income' },
            { date: new Date('2024-11-05'), description: 'Utilities', amount: -100, category: 'Bills' },
        ],
    });

    const user2 = new User({
        username: 'bob123',
        password: 'password123',
        balance: 1350,
        transactions: [
            { date: new Date('2024-11-02'), description: 'Gas Payment', amount: -200, category: 'Bills' },
            { date: new Date('2024-11-06'), description: 'Freelance work', amount: 1200, category: 'Income' },
            { date: new Date('2024-11-07'), description: 'Dining', amount: -60, category: 'Food' },
        ],
    });

    const user3 = new User({
        username: 'carol456',
        password: 'password456',
        balance: 1350,
        transactions: [
            { date: new Date('2024-11-01'), description: 'Shopping', amount: -100, category: 'Shopping' },
            { date: new Date('2024-11-04'), description: 'Salary', amount: 1300, category: 'Income' },
            { date: new Date('2024-11-06'), description: 'Entertainment', amount: -80, category: 'Entertainment' },
        ],
    });

    await user1.save();
    await user2.save();
    await user3.save();

    console.log('Sample users and transactions added');
    mongoose.disconnect();
})
.catch(err => {
    console.log('Error connecting to MongoDB', err);
});
