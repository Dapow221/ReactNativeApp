// mongodb://127.0.0.1:27017
const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://Hasyakyla:znxt2X4c0yYIQqmG@cluster0.t6i0olb.mongodb.net/"

const client = new MongoClient(uri)

let db = {}

async function connect() {
  try {
    await client.connect();

    db = client.db('movies-react-native') 
    console.log('Connected successfully to server');
    return db
  } catch(err) {
    console.log(`Error connect config/mongo.js:`, err)
  }
}

function getDb() {
  return db
}

module.exports = { connect, getDb }