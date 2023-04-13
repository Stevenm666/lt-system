const express = require("express");
// database
const db = require("../connect/connection");
// utils
const utils = require("../utils/utils");
// login router const
const remissionRouter = express.Router();

// get
remissionRouter.get("/", (req, res) => {
  try {
    const { page = 1, item = 5, filter = "" } = req.query;
    const countQuery = `SELECT COUNT(*) as count FROM remission WHERE identy_user LIKE "${filter}%" OR code_product LIKE "%${filter}%"`;

    db.handleQuery(countQuery, (err, count) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!count[0]) utils.sucessResponse(res, [], "success");

      // if exits count pagination then
      const totalPages = Math.ceil(count[0]?.count / item);

      const offset = (page - 1) * item; // offset

      const queryLimitOffset = `SELECT * FROM remission WHERE identy_user LIKE "${filter}%" OR code_product LIKE "%${filter}%" ORDER BY id DESC LIMIT ${item} offset ${offset}`;

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

// post
remissionRouter.post("/", (req, res) => {
  try {
    const {
      type_identy,
      identy,
      name,
      phone,
      city,
      addres,
      payment_method,
      is_new,
      products,
      rol,
    } = req.body;

    const date = new Date().toISOString().slice(0, 19).replace("T", " ")

    const queryRemission = `INSERT INTO remission (code_product, identy_user, payment_method, created_at, user_creator, updated_at, user_updated, status) VALUES ("${products.join(',')}", "${identy}", ${payment_method}, "${date}", "${rol}", "${date}", "${rol}", 1)`;

    if (is_new) {
      // the user is new then create
      const queryUser = `INSERT INTO user (name, type_identy, identy, addres, city, phone, created_at, created_by) VALUES ("${name}", "${type_identy}", "${identy}", "${addres}", "${city}", "${phone}", "${date}", "${rol}")`;

      db.handleQuery(queryUser, (err, _) => {
        if (err) {
          console.log(err);
          return;
        }
        // insert the remission
        handleCreateRemission(queryRemission, res);
      });
    } else {
      handleCreateRemission(queryRemission, res);
    }
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

const handleCreateRemission = (queryRemission, res) => {
  db.handleQuery(queryRemission, (err, data) => {
    if (err) {
      console.log(err);
    }
    utils.sucessResponse(res, data, "success");
  });
};

module.exports = remissionRouter;
