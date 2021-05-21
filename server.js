const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const StudentRouter = require('./routes/student');


require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established.");
})

app.use('/student', StudentRouter);

app.listen(port, () => {
    console.log("Server is running at port: " + port);
});