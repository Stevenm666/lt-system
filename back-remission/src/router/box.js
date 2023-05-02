const express = require("express");
// database
const db = require("../connect/connection");
// utils
const utils = require("../utils/utils");
// login router const
const boxRouter = express.Router();

boxRouter.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const query = `SELECT * FROM box WHERE DATE(created_at) = "${date}"`;
    const data = await db.handleQuery(query);
    utils.sucessResponse(res, data, "success");
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

boxRouter.post("/open", async (req, res) => {
  try {
    const { opening, status, user_creator } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const queryCreateBox = `INSERT INTO box (opening, ending, total_diff, user_creator, user_finished, created_at, updated_at, status) VALUES (${opening}, NULL, NULL, "${user_creator}", NULL, "${date}", "${date}", ${status})`;

    await db.handleQuery(queryCreateBox);
    utils.sucessResponse(res, [], "success");
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

module.exports = boxRouter;
