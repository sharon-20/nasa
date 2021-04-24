const express = require('express');
const firebase = require('./middlewares/firebase')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require("body-parser");

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(morgan('dev'))

mongoose.connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected!!')
})
const pictureRoutes = require('./routes/picture');
const uploadRoutes = require('./routes/upload');
// app.use(express.json());

// app.use(express.urlencoded({
//     extended: false
// }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    // parameterLimit: 50000
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next()
});
app.use('/picture', pictureRoutes);
app.use('/upload', uploadRoutes);

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.post("/", firebase,(req, res) => {
//     console.log("Connected to React");
//     res.send({ express: 'Hello From Express' });
//     res.redirect("/");
// });

app.get('/', firebase, (req, res) => {
    // console.log(req.currentUser.user_id + " from server.js");
    res.send({ express: 'Hello From Express' });
});


// phonesRouter.get('/', async (req, res) => {
//     const auth = req.currentUser;
//     if (auth) {
//         const phones = await Phone.find({});
//         return res.json(phones.map((phone) => phone.toJSON()));
//     }
//     return res.status(403).send('Not authorized');
// });

// app.post('/api/world', (req, res) => {
//     console.log(req.body);
//     res.send(
//         `I received your POST request. This is what you sent me: ${req.body.post}`,
//     );
// });
app.listen(8080, () => {
    console.log(`listen port 8080`)
});
module.exports = app;


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCwmdYa8X1TxoJXBuvZEmm92MggClI3w6c",
//     authDomain: "nasa-project-9211c.firebaseapp.com",
//     projectId: "nasa-project-9211c",
//     storageBucket: "nasa-project-9211c.appspot.com",
//     messagingSenderId: "360637165061",
//     appId: "1:360637165061:web:9df10199468ff02f42366c",
//     measurementId: "G-N5H5VDB85J"
//   };