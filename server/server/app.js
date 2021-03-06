const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb://egoradmin:admin12345@cluster0-shard-00-00.22v0o.mongodb.net:27017,cluster0-shard-00-01.22v0o.mongodb.net:27017,cluster0-shard-00-02.22v0o.mongodb.net:27017/CrossDZ?ssl=true&replicaSet=atlas-iacqrb-shard-0&authSource=admin&retryWrites=true&w=majority\n', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
