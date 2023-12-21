const express = require("express");
// database
const db = require("../connect/connection.js");
// utils
const utils = require("../utils/utils.js");
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

boxRouter.get("/getValues/:id", async (req, res) => {
  try {
    const { id } = req.params
    const query = `SELECT * FROM box WHERE id = "${id}"`;
    const data = await db.handleQuery(query);
    utils.sucessResponse(res, data, "success");
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

boxRouter.post("/open", async (req, res) => {
  try {
    const { total, efectivo, bancolombia, nequi, daviplata, tarjeta , status, user_creator } = req.body;
    const date = subtractHours(new Date(), 5).toISOString().slice(0, 19).replace("T", " ")
    
    const queryCreateBox = `INSERT INTO box (opening, ending, total_diff, user_creator, user_finished, created_at, updated_at, status, efectivo, bancolombia, nequi, daviplata, tarjeta) VALUES (${total}, NULL, NULL, "${user_creator}", NULL, "${date}", "${date}", ${status}, ${efectivo}, ${bancolombia}, ${nequi}, ${daviplata}, ${tarjeta})`;

    await db.handleQuery(queryCreateBox);
    utils.sucessResponse(res, [], "success");
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

boxRouter.put("/to-close/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ending, total_diff, user_finished } = req.body;
    const date = subtractHours(new Date(), 5).toISOString().slice(0, 19).replace("T", " ")
    const queryUpdated = `UPDATE box SET ending=${ending}, total_diff=${total_diff}, user_finished="${user_finished}", status=0, updated_at="${date}" WHERE id=${id}`;
    const data = await db.handleQuery(queryUpdated);
    utils.sucessResponse(res, data, "success");
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

boxRouter.put("/:id", async (req, res) => {
  try {
    let priceMovement = 0;
    const { id } = req.params;
    const { total, efectivo, bancolombia, nequi, daviplata, tarjeta , status, user_creator } = req.body;

    const queryGetMovement = `SELECT type, price FROM box_movement WHERE id_box=${id}`;
    const dataPriceMovement = await db.handleQuery(queryGetMovement);

    for (let obj of dataPriceMovement) {
      if (obj.type == 1) {
        priceMovement += obj.price;
      } else {
        priceMovement -= obj.price;
      }
    }

    const date = subtractHours(new Date(), 5).toISOString().slice(0, 19).replace("T", " ")
    const queryUpdated = `UPDATE box SET opening=${
      total + priceMovement
    }, efectivo =${efectivo}, bancolombia =${bancolombia}, nequi =${nequi}, daviplata =${daviplata}, tarjeta =${tarjeta}, user_creator="${user_creator}", ending=NULL, total_diff=NULL, user_finished=NULL, status=${status}, updated_at="${date}" WHERE id=${id}`;
    const data = await db.handleQuery(queryUpdated);
    utils.sucessResponse(res, data, "success");
  } catch (e) {
    utils.errorReponse(res, 500, "Error en la conexión a la base de datos");
  }
});

function subtractHours(date, hours) {
  date.setHours(date.getHours() - hours);

  return date;
}

module.exports = boxRouter;
