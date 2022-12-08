"use strict";
const { MongoClient } = require('mongodb');
const connectionString = process.env.CONNECTION_STRING;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = {
    connection() {
        return new Promise((resolve, reject) => {
            client.connect(function (err, db) {
                if (err || !db) {
                    reject(err);
                }
                resolve(db.db('gestor'));
            });
        });
    },
};
