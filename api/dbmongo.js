
const { default: mongoose } = require('mongoose');
require('dotenv').config()

const { MONGODB_USER, MONGODB_PASS, MONGODB_DATABSE, MONGODB_CLUSTER, MONGODB_CLUSTERNAME } = process.env

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_CLUSTERNAME}.xvu1t.mongodb.net/${MONGODB_DATABSE}?retryWrites=true&w=majority&appName=${MONGODB_CLUSTER}`;

async function run() {
    mongoose 
    .connect(uri, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
    })   
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
}
run().catch(console.dir);
