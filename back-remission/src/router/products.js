const express = require("express");
// database
const db = require("../connect/connection");
// utils
const utils = require("../utils/utils");
// login router const
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  try {
    const { page = 1, item = 5, filter = "" } = req.query;
    const countQuery = `SELECT COUNT(*) as count FROM product WHERE (name LIKE "%${filter}%" OR code LIKE "${filter}%") AND status=1`;

    db.handleQuery(countQuery, (err, count) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!count[0]) utils.sucessResponse(res, [], "success");

      // if exits count pagination then
      const totalPages = Math.ceil(count[0]?.count / item);

      const offset = (page - 1) * item; // offset

      const queryLimitOffset = `SELECT * FROM product WHERE (name LIKE "%${filter}%" OR code LIKE "${filter}%") AND status=1 ORDER BY id DESC LIMIT ${item} offset ${offset}`;

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
    console.log(e);
  }
});

productsRouter.post("/", (req, res) => {
  try {
    const { name, code, price } = req.body;

    const queryVerify = `SELECT COUNT(*) as count FROM product WHERE code="${code}" and status=1`;

    db.handleQuery(queryVerify, (err, count) => {
      if (err) {
        console.log(err);
        return;
      }
      if (count[0]?.count) {
        res.status(200).json({
          status: "error",
          message: "ya existe un producto con este código",
        });
      } else {
        const queryCreate = `
          INSERT INTO product (name, code, price, created_at, updated_at, status) 
          VALUES ("${name}", "${code}", ${price}, "${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}", "${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}", 1)
        `;
        db.handleQuery(queryCreate, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }

          utils.sucessResponse(res, [], "success");
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

productsRouter.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, price, changeCode } = req.body;

    const queryUpdate = `UPDATE product SET name="${name}", code="${code}", price=${price}, updated_at="${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}" WHERE id=${id}`;

    // change code is true will verify another code

    if (changeCode) {
      const countQuery = `SELECT COUNT(*) as count FROM product WHERE code="${code}"`;
      db.handleQuery(countQuery, (err, count) => {
        if (err) {
          console.log(err);
          return;
        }
        if (count[0]?.count) {
          res.json({
            status: "error",
            data: [],
            message: "El código ya se encuentra en uso",
          });
        } else {
          db.handleQuery(queryUpdate, (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            utils.sucessResponse(res, [], "success");
          });
        }
      });
    } else {
      db.handleQuery(queryUpdate, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        utils.sucessResponse(res, [], "success");
      });
    }
    // change code is false will not verify another code
  } catch (e) {
    console.log(e);
  }
});

productsRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const queryDisable = `UPDATE product SET status=0, updated_at="${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}" WHERE id=${id}`;

    db.handleQuery(queryDisable, (err, _) => {
      if (err) {
        console.log(err);
        return;
      }
      utils.sucessResponse(res, [], "success");
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = productsRouter;
