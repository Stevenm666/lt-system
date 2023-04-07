const express = require("express");
// database
const db = require("../connect/connection");
// multer
const multer = require("multer");
// xlsx
const xlsx = require("xlsx");
// utils
const utils = require("../utils/utils");
// login router const
const uploadRouter = express.Router();
const readXlsxFile = require("read-excel-file/node");

const upload = multer({ dest: "uploads/" });

uploadRouter.post("/users", upload.single("file"), async (req, res) => {
  try {
    readXlsxFile(req.file.path)
      .then((rows) => {
        rows.forEach((item) => {
          const queryIdentifier = `SELECT * FROM user WHERE identy=${item[2]}`;

          db.handleQuery(queryIdentifier, (err, result) => {
            if (err) {
              res.send(err);
              return;
            }
            if (!result.length) {
              const queryCreate = `
                  INSERT INTO user (name, type_identy, identy, addres, city, phone, created_at) 
                  VALUES ("${item[0]}", "${item[1]}", ${item[2]}, "${
                item[6]
              }", "${item[7]}", "${item[8]}", "${new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}")
                `;
              db.handleQuery(queryCreate, (err, result) => {
                if (err) console.log(err);
              });
            }
          });
        });
      })
      .then(() => {
        res.json({
          message: "se ha guardo correctamente",
          data: [],
          status: 200,
        });
      });
  } catch (e) {
    utils.errorReponse(res, 500, e);
  }
});

uploadRouter.post("/products", upload.single("file"), async (req, res) => {
  try {
    readXlsxFile(req.file.path)
      .then((rows) => {
        rows.forEach((item) => {
          const queryIdentifier = `SELECT * FROM product WHERE code="${item[1]}" AND status=1`;

          db.handleQuery(queryIdentifier, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            if (!result.length) {
              const queryCreate = `
                  INSERT INTO product (name, code, price, created_at, updated_at, status) 
                  VALUES ("${item[2]}", "${item[1]}", ${item[11]}, "${new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}", "${new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}", 1)
                `;
              db.handleQuery(queryCreate, (err, result) => {
                if (err) console.log(err);
              });
            }
          });
        });
      })
      .then(() => {
        res.json({
          message: "se ha guardo correctamente",
          data: [],
          status: 200,
        });
      });
  } catch (e) {
    utils.errorReponse(res, 500, e);
  }
});

module.exports = uploadRouter;
