const mysql = require('mysql')
const utils = require('../utils/utils')

const handleQuery = (sqlQuery, fn) => {
    try {
        const connection = mysql.createConnection(utils.connectionDB);
        connection.connect();
        connection.query(sqlQuery, (err, rows) => {
            fn(err, rows ? JSON.parse(JSON.stringify(rows)) : []); // use callback to get results
        })
        connection.end();
    }catch(e){
        comsole.error(e)
    }
}
  
module.exports = {
    handleQuery,
};