const express = require('express');
// database
const db = require('../connect/connection');
// utils
const utils = require('../utils/utils')
// login router const
const usersRouter = express.Router();

usersRouter.get('/', async(req, res) => {
    try{
        const query = "SELECT * FROM user";
        db.handleQuery(query, (err, data) => {
            if (err) utils.errorReponse(res, 500, "Error en la consulta");
            utils.sucessResponse(res, data, "success");
        })
     
    }catch(e){
        utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
    }
});

module.exports = usersRouter;