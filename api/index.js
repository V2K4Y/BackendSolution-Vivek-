const express = require('express');
const { connectMongo } = require('./services/db');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

connectMongo(process.env.Mongo_URI)
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log('DB error: ', err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const PORT = process.env.PORT || 4001;
console.log("getting to the routes")
app.use('/', require('./routes/request'));
app.use('/service', require('./routes/service'));
app.use('/user', require('./routes/user'));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));