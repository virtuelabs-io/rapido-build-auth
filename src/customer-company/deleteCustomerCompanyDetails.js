'use strict';

const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOST,
        user: process.env.USERNAME,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
})

module.exports.fun = async (event, context, callback) => {
    global.fetch = require('node-fetch');
    console.log(event)
    let customer_id = "887d0da4-5af3-11e9-8647-d663bd873d93" // to be replaced with user id
    let query = `
        DELETE FROM customer.company WHERE customer_id = UUID_TO_BIN(?);
    `;
    console.log("Running query", query);
    let results = await mysql.query(query, [customer_id])
    await mysql.end()
    return results
}