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
    let customer_id = event.cognitoPoolClaims.sub
    let query = `
        SELECT  id,
                BIN_TO_UUID(customer_id) as customer_id,
                full_name,
                address_type_id,
                addr_1,
                addr_2,
                city,
                county,
                country,
                postcode
        FROM customer.address
        WHERE customer_id = UUID_TO_BIN(?)
        AND   active = TRUE;
    `;
    console.log("Running query", query);
    let results = await mysql.query(query, [customer_id])
    await mysql.end()
    return results
}
