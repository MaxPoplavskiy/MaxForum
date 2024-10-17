const Client = require('pg').Client;

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'MaxForum',
  user: 'postgres',
  password: process.env.PASSWORD,
});

client.connect((err) => {
  if(err)
  {
    console.log(err);
  }
});

module.exports = client;