const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://campus-spaces.firebaseio.com"
  });

const db = admin.firestore();

const app = express();
const port =  process.env.PORT || 8080;
app.use(bodyParser.json());

const itemsCollection = db.collection('items');
const locationsCollection = db.collection('locations');
const usersCollection = db.collection('users');

// Get items in a specific locaiton
app.get('/api/items/:location', async (req, res) => {     
    const location = req.params['location'];
    const itemsInLocation = await itemsCollection.where('location', '==', location).get();
    res.status(200).json(itemsInLocation.docs.map(doc => ({userId: doc.userId, ...doc.data()})));
});

// Get list of available locations
app.get('/api/locations', async (req, res) => {     
    const allLocations = await locationsCollection.get();
    res.status(200).json(allLocations.docs.map(doc => ({location: doc.location, ...doc.data()})));
});

// Add an item
app.post('/api/add-item', async (req, res) => {
    const item = req.body;
    await itemsCollection.add(item);
    res.status(200).send("added");
});

// Sign in
app.post('/api/login/sign-in', async (req, res) => {
    const user = req.body;
    const allUsers = await usersCollection.get();
    const allUsersArray = allUsers.docs.map(doc => ({username: doc.username, ...doc.data()}));

   // Check if username and password are correct
    var addStatus = 'SIGNIN_ACCOUNT_NOT_FOUND';
    for (var i = 0; i < allUsersArray.length; i++) {
        if (allUsersArray[i].username === user.username) {
            if (allUsersArray[i].password === user.password) {
                addStatus = 'SIGNIN_SUCCESS';
            } else {
                addStatus = 'SIGNIN_INCORRECT_PASSWORD';
            }
            break;
        }
    }
    res.status(200).send(addStatus);
});

// Sign up
app.post('/api/login/sign-up', async (req, res) => {
    const user = req.body;
    const allUsers = await usersCollection.get();
    const allUsersArray = allUsers.docs.map(doc => ({username: doc.username, ...doc.data()}));

   // Check if username already exists in data
    var addStatus = 'SIGNUP_SUCCESS';
    for (var i = 0; i < allUsersArray.length; i++) {
        if (allUsersArray[i].username === user.username) {
            addStatus = 'SIGNUP_FAILURE';
            break;
        }
    }

    if (addStatus === 'SIGNUP_SUCCESS') {
        await usersCollection.add(user);
    }
    res.status(200).send(addStatus);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
