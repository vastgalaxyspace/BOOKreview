require ('dotenv').config();


const express = require('express');

const connectDB = require('./config/connect');
connectDB();
const app = express();

const userrouter = require('./router/userrouter');
const bookrouter = require('./router/booksrouter');
app.use(express.json())


app.use('/auth', userrouter);
app.use('/books', bookrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});