const express = require("express");
// database
const db = require("../connect/connection");
// utils
const utils = require("../utils/utils");
// login router const
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  try {
    const { page = 1, item = 5, filter = "" } = req.query;
    const countQuery = `SELECT COUNT(*) as count FROM user WHERE name LIKE "${filter}%" OR identy LIKE "${filter}%"`;

    db.handleQuery(countQuery, (err, count) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!count[0]) utils.sucessResponse(res, [], "success");

      // if exits count pagination then
      const totalPages = Math.ceil(count[0]?.count / item);

      const offset = (page - 1) * item; // offset

      const queryLimitOffset = `SELECT * FROM user WHERE name LIKE "${filter}%" OR identy LIKE "${filter}%" ORDER BY id DESC LIMIT ${item} offset ${offset}`;

      db.handleQuery(queryLimitOffset, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        // data from pagination
        const dataPagination = {
          data: data,
          items_per_page: item,
          current_page: page,
          total_pages: totalPages,
        };

        res.json({
          status: "success",
          message: "success",
          data: dataPagination,
        });
      });
    });
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

usersRouter.get('/by_document', (req, res) => {
  try{
    const { type_identy, identy } = req.query;
    if (type_identy && identy){
      const queryByDocument = `SELECT * FROM user WHERE type_identy = "${type_identy}" AND identy = "${identy}"`
      db.handleQuery(queryByDocument, (err, data) => {
        if (err){
          console.log(err)
          return;
        }
        utils.sucessResponse(res, data, "success");
      })
    }
  }catch(e){
    console.log(e);
  }
})

module.exports = usersRouter;
