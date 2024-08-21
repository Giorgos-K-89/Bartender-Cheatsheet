import express from 'express';
import cors from 'cors'
import bcrypt from 'bcrypt';

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
    origin: 'https://giorgos-k-89.github.io',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const USERS = [
    {
        username: 'test',
        email: 'test@test.com',
        password: await bcrypt.hash('123456', 10),
    },
    {
        username: 'Marika',
        email: 'marika@test.com',
        password: await bcrypt.hash('123456', 10),
    },
    {
        username: 'Giorgos',
        email: 'giorgos@test.com',
        password: await bcrypt.hash('123456', 10),
    }
];

app.get('/', (req, res) => {
    res.send('Hello from the Cocktail API Server!');
});

// Sign-Up Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = USERS.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user
    USERS.push({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully!', username: username });
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = USERS.find(user => user.email === email);

    if (user) {
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful!', username: user.username  });
        } else {
            res.status(401).json({ message: 'Email and password don\'t match.' });
        }
    } else {
        res.status(401).json({ message: 'Invalid user.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
