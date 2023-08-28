require('dotenv').config();
const {MongoClient} = require('mongodb');
const Client = new MongoClient(process.env.MONGO_LINK);

const User =async()=>
{
    let connect = await Client.connect();
    let database = await connect.db('Internship');
    return database.collection('kanban1');
}
const Notes =async()=>
{
    let connect = await Client.connect();
    let database = await connect.db('Internship');
    return database.collection('kanban2');
}
module.exports={User,Notes};